// Imports rocket and display classes
import { Rocket } from './Rocket.js';
import { Display } from './Display.js';
import { Resources } from './Resources.js';
import { Buttons } from './Buttons.js';

export class Player {
    /**
     * Initializes the Player class
     */
    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.camera.maxZ = 1200000000000;
        this.camera.minZ = 5; // Prevents jittering of layers when adjusted for distance

        // Make zoom 10x faster for mouse wheel (PC)
        this.camera.wheelDeltaPercentage = 0.01; // Default is 0.001, so this is 10x faster
        // Adjust zoom speed for pinch gestures (mobile)
        this.camera.pinchDeltaPercentage = 0.001; // Default is 0.0001, so this is 10x faster on mobile

        // Initialize velocity and previous velocity
        this.velocity = new BABYLON.Vector3(0, 0, 0);
        this.previousVelocity = this.velocity.clone();
        this.acceleration = 0.0392; // Adjust acceleration as needed
        this.accelerationFactor = 50; // Scale of acceleration
        
        // Calls function to initialize player controls
        this.buttons = new Buttons();
        this.currentButton = "none";
        this.setControls();
        
        // Creates rocket class object
        this.rocketLocation = this.camera.target;
        this.rocket = new Rocket(this.rocketLocation, scene, camera);
        
        // Creates performance parameters and resource display
        this.display = new Display(scene, camera);
        
        // Tracks current planet
        this.currentPlanet = null;
        this.resources = new Resources(scene, camera);
        this.planetDistance = 0;
        this.planetList = null;
        
        // Tracks current player money and tech tier
        this.money = 0.0;
        this.techTier = "chemical";
        this.display.displayMoney(this.money);
        this.display.displayTier(this.techTier);
        
        // Tracks current player state
        this.playerState = "flying";
    }
    
    
    // Sets the keyboard and button controls to move player
    setControls() {
        this.clickCount = 0; // Tracks the number of clicks
        this.lastClickTime = 0; // Tracks the last click time
        this.clickRateCap = 10; // Max clicks per second allowed
        this.lastKeyPressed = "none"; // Tracks the last key pressed
        this.currentButton = "none"; // Tracks the last button pressed
        const keyState = {}; // Tracks the state of pressed keys
    
        // Listen for keydown events
        window.addEventListener("keydown", (event) => {
            keyState[event.key] = true; // Mark the key as pressed
            this.lastKeyPressed = event.key; // Update the last key pressed
    
            // Reset click count every second
            const currentTime = performance.now() / 1000; // Current time in seconds
            if (currentTime - this.lastClickTime >= 1) {
                this.clickCount = 0;
                this.lastClickTime = currentTime;
            }
    
            // Limit click rate
            if (this.clickCount < this.clickRateCap) {
                this.clickCount++; // Count the click
            }
        });
    
        // Listen for keyup events
        window.addEventListener("keyup", (event) => {
            keyState[event.key] = false; // Mark the key as released
    
            if (event.key === " ") { // Handle boost release
                if (this.isBoosting) {
                    this.velocity = this.originalVelocity.clone(); // Revert to original velocity
                    this.isBoosting = false;
                    this.acceleration = 0.0392;
                }
                // Resets velocity to zero
                this.zeroVelocity();
            }
    
            if (event.key === "m" || event.key === "M") { // Handle mining button release
                this.rocket.deactivateLaser(); // Deactivate laser
            }
    
            this.lastKeyPressed = "none"; // Reset the key state
        });
    
        // Update button and key states on every frame
        this.scene.onBeforeRenderObservable.add(() => {
            const buttonInput = this.buttons.getButton() || "none"; // Get the current button
            const activeKey = this.lastKeyPressed || "none"; // Get the current key
    
            // Combine inputs: prioritize button input over keyboard
            this.currentButton = buttonInput !== "none" ? buttonInput : activeKey;
    
            // Reset click count every second
            const currentTime = performance.now() / 1000; // Current time in seconds
            if (currentTime - this.lastClickTime >= 1) {
                this.clickCount = 0;
                this.lastClickTime = currentTime;
            }
    
            // Limit click rate
            if ((this.clickCount < this.clickRateCap)) {
                this.clickCount++; // Count the click
    
                // Calculate movement vectors
                const forward = this.camera.getFrontPosition(1).subtract(this.camera.position).normalize();
                const right = BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up()).normalize();
                const up = BABYLON.Vector3.Up(); // Y-axis direction for up and down movement
                
                // If player runs out of fuel
                if (this.rocket.getDeltaV() == 0) {
                    this.acceleration = 0.0;
                }
                if (this.rocket.getDeltaV() > 0){
                    this.acceleration = 0.0392;
                }
    
                // Handle movement and actions based on combined inputs
                switch (this.currentButton) {
                    case "w":
                    case "W":
                    case "^": // Accelerate forward
                        this.velocity.addInPlace(forward.scale(this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        console.log(this.clickCount);
                        break;
                    case "s":
                    case "S":
                    case "v": // Accelerate backward
                        this.velocity.addInPlace(forward.scale(-this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                    case "a":
                    case "A":
                    case "<": // Accelerate left
                        this.velocity.addInPlace(right.scale(this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                    case "d":
                    case "D":
                    case ">": // Accelerate right
                        this.velocity.addInPlace(right.scale(-this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                    case "r":
                    case "R":
                    case "up": // Move up
                        this.velocity.addInPlace(up.scale(this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                    case "f":
                    case "F":
                    case "down": // Move down
                        this.velocity.addInPlace(up.scale(-this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                        
                    case "m":
                    case "M":
                    case "drill": // Mine resources
                        if (this.resources.getMass() < this.rocket.getOreCapacity()) {
                            this.resources.mineResources(); // Mine resources
                            this.rocket.activateLaser(); // Activate laser
                        }
                        break;
                    case "o":
                    case "O":
                    case "sell ore": // Sell ore
                        this.money += this.resources.getValue();
                        this.display.displayMoney(this.money);
                        this.resources.resetResources(); // Reset resources
                        break;
                    case "u":
                    case "U":
                    case "upgrade": // Upgrade tech tier
                        this.techTier = this.rocket.upgrade(this.techTier, this.money);
                        this.money = this.rocket.upgradeCost();
                        this.display.displayTier(this.techTier);
                        this.display.displayMoney(this.money);
                        this.buttons.determineColor(this.techTier);
                        break;
                        
                    case " ":
                    case "warp": // Boost
                        if (!this.isBoosting) {
                            this.isBoosting = true;
                            this.originalVelocity = this.velocity.clone();
                            this.velocity.scaleInPlace(100); // Boost velocity
                            this.acceleration = 200;
                        }
                        break;
                        
                    case "none":
                        this.rocket.deactivateLaser(); // Deactivate laser
                        break;
                }
            }
        });


        // Update camera position and calculate acceleration in each render loop
        this.scene.onBeforeRenderObservable.add(() => {
            const deltaTime = this.scene.getEngine().getDeltaTime() / 1000; // Time in seconds
            
            // Determines resources based on current planet
            this.resources.setPlanet(this.currentPlanet);
            this.resources.getResources();
            
            // Get camera forward vector
            const forward = this.camera.getFrontPosition(1).subtract(this.camera.position).normalize();
            const yaw = Math.atan2(forward.x, forward.z);
            this.rocket.setRotation(yaw);

            // Update camera position based on velocity
            this.camera.target.addInPlace(this.velocity);
            this.camera.position.addInPlace(this.velocity);
            // Sync camera with velocity
            this.rocket.setLocation(this.camera.target);

            // Display current speed and deltaV
            this.display.displayVelocity(this.velocity, this.accelerationFactor);
            this.display.displayDeltaV(this.rocket);
            // Accumulate velocity change and calculate acceleration every second
            this.display.accumulateAcceleration(deltaTime, this.velocity, this.accelerationFactor, this.previousVelocity);
            
            // Update previous velocity for the next frame
            this.previousVelocity.copyFrom(this.velocity);
            
            // Gets distance from current planet
            let name = "";
            if (this.currentPlanet != null) {
                this.planetDistance = (this.rocket.getLocation().subtract(this.currentPlanet.getLocation())).length();
                this.planetDistance = this.planetDistance - this.currentPlanet.getRadius(); // subtracts planet radius
                name = this.currentPlanet.getName();
            }
            
            // Displays distance and name
            this.display.displayDistance(this.planetDistance);
            this.display.displayName(name);
            
            // Updates resource displays
            this.display.displayResources(this.resources.getResources());
            this.display.displayOreMass(this.resources.getMass());
            this.display.displayValue(this.resources.getValue());
        });
    }
    
    
    // Functions to get and update velocity and current planet
    getVelocity() {
    	return this.velocity;
    }
    
    setVelocity(newVelocity) {
    	this.velocity = newVelocity;
    }
    
    setPlanet(planet) {
        this.currentPlanet = planet;
    }
    
    getResourceInventory() {
        let inventory = this.resources.getInventory();
        return inventory;
    }
    
    gravityControl(planetList) {
        this.planetList = planetList;
    }
    
    zeroVelocity() {
        // Resets velocity if planet list is not null
        if (this.planetList != null) {
            this.planetList.resetVelocity();
        }
    }
    
    
    // Functions to update location of player
    setLocation(newLocation) {
        this.camera.setTarget(newLocation);
        this.camera.alpha = 1.95;  // Horizontal rotation (45 degrees)
        this.camera.beta = 1.6;   // Vertical rotation (90 degrees)
        this.camera.radius = 50; // adjusts default camera distance
        
        this.rocket.setLocation(this.camera.target); // Sets Rocket Location
    }
    
    getLocation() {
        return this.camera.target;
    }
    
    objectCollision(spawnLocation) {
        // Respawns player if collision with object
        if (this.planetDistance < 0) {
            this.setState("dead");
            this.setLocation(spawnLocation);
        }
        else {
            this.setState("flying");
        }
    }
    
    setState(newState) {
        this.playerState = newState;
    }
    
    getState() {
        return this.playerState;
    }
}
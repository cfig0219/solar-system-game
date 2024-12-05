// Imports rocket and display classes
import { Rocket } from './Rocket.js';
import { Display } from './Display.js';
import { Resources } from './Resources.js';

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
        this.setButtons();
        this.setControls();
        
        // Creates rocket class object
        this.rocketLocation = this.camera.target;
        this.rocket = new Rocket(this.rocketLocation, scene, camera);
        
        // Creates performance parameters and resource display
        this.display = new Display(scene, camera);
        
        // Tracks current planet
        this.currentPlanet = null;
        this.resources = new Resources(scene, camera);
        
        // Tracks current player money and tech tier
        this.money = 0.0;
        this.techTier = "chemical";
        this.display.displayMoney(this.money);
        this.display.displayTier(this.techTier);
    }
    
    
    // Initializes buttons
    setButtons() {
        // Left side buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.style.position = "absolute";
        buttonContainer.style.bottom = "20%";
        buttonContainer.style.left = "10%";
        buttonContainer.style.display = "flex";
        buttonContainer.style.flexDirection = "column";
        document.body.appendChild(buttonContainer);
        
        // X and Y offsets for positioning buttons
        const buttonOffsets = [
            { x: 0, y: 0 },  // Top button
            { x: 0, y: 80 },  // Bottom button
            { x: -70, y: -50 }, // Left button
            { x: 70, y: -110 },  // Right button
        ];
        
        // Button displays
        const buttonTexts = ["^", "v", "<", ">"];
    
        for (let i = 0; i < 4; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts[i];
            button.style.width = "60px";
            button.style.height = "60px";
            button.style.backgroundColor = "#008000";
            button.style.transform = `translate(${buttonOffsets[i].x}px, ${buttonOffsets[i].y}px)`;
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            button.style.zIndex = "1";
            buttonContainer.appendChild(button);
        }
        
        // Right side buttons
        const buttonContainer2 = document.createElement("div");
        buttonContainer2.style.position = "absolute";
        buttonContainer2.style.bottom = "25%";
        buttonContainer2.style.right = "5%";
        buttonContainer2.style.display = "flex";
        buttonContainer2.style.gap = "10px";
        buttonContainer2.style.flexDirection = "column";
        document.body.appendChild(buttonContainer2);
        
        const buttonTexts2 = ["^", "rcs", "v"];
        
        for (let i = 0; i < 3; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts2[i];
            button.style.width = "60px";
            button.style.height = "60px";
            button.style.backgroundColor = "#008000";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            button.style.zIndex = "1";
            buttonContainer2.appendChild(button);
        }
        
        // Bottom buttons
        const buttonContainer3 = document.createElement("div");
        buttonContainer3.style.position = "absolute";
        buttonContainer3.style.bottom = "5%";
        buttonContainer3.style.left = "35%";
        buttonContainer3.style.display = "flex";
        buttonContainer3.style.gap = "30px";
        document.body.appendChild(buttonContainer3);
        
        const buttonTexts3 = ["drill", "warp"];
        
        for (let i = 0; i < 2; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts3[i];
            button.style.width = "200px";
            button.style.height = "60px";
            button.style.backgroundColor = "#008000";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            button.style.zIndex = "1";
            buttonContainer3.appendChild(button);
        }
        
        // Top buttons
        const buttonContainer4 = document.createElement("div");
        buttonContainer4.style.position = "absolute";
        buttonContainer4.style.top = "5%";
        buttonContainer4.style.left = "35%";
        buttonContainer4.style.display = "flex";
        buttonContainer4.style.gap = "30px";
        document.body.appendChild(buttonContainer4);
        
        const buttonTexts4 = ["upgrade", "sell ore"];
        
        for (let i = 0; i < 2; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts4[i];
            button.style.width = "200px";
            button.style.height = "60px";
            button.style.backgroundColor = "#008000";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            button.style.zIndex = "1";
            buttonContainer4.appendChild(button);
        }
    }

    
    // Sets the keyboard and button controls to move player
    setControls() {        
        // Initialize variables for click rate capping
        this.clickCount = 0;
        this.lastClickTime = 0;
        this.clickRateCap = 10; // Max clicks per second allowed

        // Function to handle key down events and adjust velocity
        window.addEventListener("keydown", (event) => {
            const currentTime = performance.now() / 1000; // Current time in seconds

            // Reset click count every second
            if (currentTime - this.lastClickTime >= 1) {
                this.clickCount = 0;
                this.lastClickTime = currentTime;
            }

            // If clicks this second are under the cap, proceed
            if (this.clickCount < this.clickRateCap) {
                this.clickCount++; // Count the key press

                // Calculate forward and right vectors relative to the camera's current orientation
                const forward = this.camera.getFrontPosition(1).subtract(this.camera.position).normalize();
                const right = BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up()).normalize();
                const up = BABYLON.Vector3.Up(); // Y-axis direction for up and down movement

                switch (event.key) {
                    case "w":
                    case "W": // Accelerate forward
                        this.velocity.addInPlace(forward.scale(this.acceleration));
                        // Sets the change in delta V
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                    case "s":
                    case "S": // Accelerate backward
                        this.velocity.addInPlace(forward.scale(-this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                    case "a":
                    case "A": // Accelerate left
                        this.velocity.addInPlace(right.scale(this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                    case "d":
                    case "D": // Accelerate right
                        this.velocity.addInPlace(right.scale(-this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                    case "r":
                    case "R": // Move up
                        this.velocity.addInPlace(up.scale(this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                    case "f":
                    case "F": // Move down
                        this.velocity.addInPlace(up.scale(-this.acceleration));
                        this.rocket.setDeltaV(this.acceleration * this.accelerationFactor);
                        break;
                        
                    case "m":
                    case "M": // Mine resources
                        if (this.resources.getMass() < this.rocket.getOreCapacity()) {
                            // if less than ore capacity
                            this.resources.mineResources();
                            this.rocket.activateLaser();
                        }
                        break;
                    case "o":
                    case "O": // Sell ore
                        this.money = this.money + this.resources.getValue();
                        this.display.displayMoney(this.money);
                        this.resources.resetResources();
                        break;
                    case "u":
                    case "U": // Upgrade tech tier
                        this.techTier = this.rocket.upgrade(this.techTier, this.money);
                        this.money = this.rocket.upgradeCost();
                        // Updates money and tech displays
                        this.display.displayTier(this.techTier);
                        this.display.displayMoney(this.money);
                        break;
                        
                    case " ": // Space bar pressed
                        if (!this.isBoosting) {
                            this.isBoosting = true;
                            this.originalVelocity = this.velocity.clone(); // Store the original velocity
                            this.velocity.scaleInPlace(100); // Boost velocity by 100x
                            this.acceleration = 200;
                        }
                        break;
                }
            }
            
        });
        
        // Check for key release
        window.addEventListener("keyup", (event) => {
            if (event.key === " " && this.isBoosting) { // Space bar released
                this.velocity = this.originalVelocity.clone(); // Revert to original velocity
                this.isBoosting = false;
                this.acceleration = 0.0392;
            }
            
            if (event.key === "m" || event.key === "M") { // mining button released
                this.rocket.deactivateLaser(); // deactivates laser
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
            let distance = 0;
            let name = "";
            if (this.currentPlanet != null) {
                distance = (this.rocket.getLocation().subtract(this.currentPlanet.getLocation())).length();
                distance = distance - this.currentPlanet.getRadius(); // subtracts planet radius
                name = this.currentPlanet.getName();
            }
            
            // Displays distance and name
            this.display.displayDistance(distance);
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
}
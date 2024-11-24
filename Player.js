export class Player {
    /**
     * Initializes the Player class
     */
    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.camera.maxZ = 1200000000000;
        this.camera.minZ = 50; // Prevents jittering of layers when adjusted for distance

        // Make zoom 10x faster for mouse wheel (PC)
        this.camera.wheelDeltaPercentage = 0.01; // Default is 0.001, so this is 10x faster
        // Adjust zoom speed for pinch gestures (mobile)
        this.camera.pinchDeltaPercentage = 0.001; // Default is 0.0001, so this is 10x faster on mobile

        // Initialize velocity and previous velocity
        this.velocity = new BABYLON.Vector3(0, 0, 0);
        this.previousVelocity = this.velocity.clone();
        this.acceleration = 0.196; // Adjust acceleration as needed
        
        // Calls function to initialize player controls
        this.setButtons();
        this.setControls();
    }
    
    // Initializes buttons
    setButtons() {
        // Left side buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.style.position = "absolute";
        buttonContainer.style.bottom = "20%";
        buttonContainer.style.left = "120px";
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
        const buttonTexts = ["forward", "back", "left", "right"];
    
        for (let i = 0; i < 4; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts[i];
            button.style.width = "60px";
            button.style.height = "60px";
            button.style.backgroundColor = "#006666";
            button.style.transform = `translate(${buttonOffsets[i].x}px, ${buttonOffsets[i].y}px)`;
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            buttonContainer.appendChild(button);
        }
        
        // Right side buttons
        const buttonContainer2 = document.createElement("div");
        buttonContainer2.style.position = "absolute";
        buttonContainer2.style.bottom = "25%";
        buttonContainer2.style.right = "100px";
        buttonContainer2.style.display = "flex";
        buttonContainer2.style.gap = "10px";
        buttonContainer2.style.flexDirection = "column";
        document.body.appendChild(buttonContainer2);
        
        const buttonTexts2 = ["up", "rcs", "down"];
        
        for (let i = 0; i < 3; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts2[i];
            button.style.width = "60px";
            button.style.height = "60px";
            button.style.backgroundColor = "#006666";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
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
            button.style.backgroundColor = "#006666";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            buttonContainer3.appendChild(button);
        }
    }

    
    // Sets the keyboard and button controls to move player
    setControls() {
        // Initialize accumulation variables for acceleration
        this.velocityChangeAccumulator = new BABYLON.Vector3(0, 0, 0);
        this.accumulatedTime = 0;
        
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
                        break;
                    case "s":
                    case "S": // Accelerate backward
                        this.velocity.addInPlace(forward.scale(-this.acceleration));
                        break;
                    case "a":
                    case "A": // Accelerate left
                        this.velocity.addInPlace(right.scale(this.acceleration));
                        break;
                    case "d":
                    case "D": // Accelerate right
                        this.velocity.addInPlace(right.scale(-this.acceleration));
                        break;
                    case "r":
                    case "R": // Move up
                        this.velocity.addInPlace(up.scale(this.acceleration));
                        break;
                    case "f":
                    case "F": // Move down
                        this.velocity.addInPlace(up.scale(-this.acceleration));
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
                this.acceleration = 0.196;
            }
        });


        // Create displays for speed and acceleration
        this.createVelocityDisplay();
        this.createAccelerationDisplay();

        // Update camera position and calculate acceleration in each render loop
        this.scene.onBeforeRenderObservable.add(() => {
            const deltaTime = this.scene.getEngine().getDeltaTime() / 1000; // Time in seconds

            // Update camera position based on velocity
            this.camera.target.addInPlace(this.velocity);
            this.camera.position.addInPlace(this.velocity);

            // Display current speed
            this.displayVelocity();

            // Accumulate velocity change and calculate acceleration every second
            this.accumulateAcceleration(deltaTime);
            
            // Update previous velocity for the next frame
            this.previousVelocity.copyFrom(this.velocity);
        });
    }
    
    
    // Functions to get and update velocity
    getVelocity() {
    	return this.velocity;
    }
    
    setVelocity(newVelocity) {
    	this.velocity = newVelocity;
    }
	
    // Function to create a DOM element to display the velocity
    createVelocityDisplay() {
        this.velocityDisplay = document.createElement("div");
        this.velocityDisplay.style.position = "absolute";
        this.velocityDisplay.style.bottom = "40px";
        this.velocityDisplay.style.left = "10px";
        this.velocityDisplay.style.color = "white";
        this.velocityDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.velocityDisplay.style.padding = "5px";
        this.velocityDisplay.style.borderRadius = "5px";
        this.velocityDisplay.style.fontFamily = "Arial, sans-serif";
        this.velocityDisplay.style.fontSize = "14px";
        document.body.appendChild(this.velocityDisplay);
    }

    // Function to create a DOM element to display the acceleration
    createAccelerationDisplay() {
        this.accelerationDisplay = document.createElement("div");
        this.accelerationDisplay.style.position = "absolute";
        this.accelerationDisplay.style.bottom = "10px";
        this.accelerationDisplay.style.left = "10px";
        this.accelerationDisplay.style.color = "white";
        this.accelerationDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.accelerationDisplay.style.padding = "5px";
        this.accelerationDisplay.style.borderRadius = "5px";
        this.accelerationDisplay.style.fontFamily = "Arial, sans-serif";
        this.accelerationDisplay.style.fontSize = "14px";
        document.body.appendChild(this.accelerationDisplay);
    }

    // Function to calculate and display the current speed in meters per second
    displayVelocity() {
        const speed = (this.velocity.length()) * 10; // Magnitude of the velocity vector
        this.velocityDisplay.innerText = `Speed: ${speed.toFixed(2)} m/s`;
    }
    
    // Function to accumulate velocity changes and display average acceleration per second
    accumulateAcceleration(deltaTime) {
        // Calculate the change in velocity for this frame
        const velocityChange = this.velocity.subtract(this.previousVelocity);
        
        // Accumulate the change in velocity
        this.velocityChangeAccumulator.addInPlace(velocityChange);
        this.accumulatedTime += deltaTime;

        // If one second has passed, calculate and display acceleration
        if (this.accumulatedTime >= 1) {
            const acceleration = this.velocityChangeAccumulator.length() * 10; // Magnitude of accumulated change
            this.accelerationDisplay.innerText = `Acceleration: ${acceleration.toFixed(2)} m/s²`;

            // Reset accumulator and time
            this.velocityChangeAccumulator.set(0, 0, 0);
            this.accumulatedTime = 0;
        }
    }
}
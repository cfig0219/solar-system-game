export class Display {
    /**
     * Initializes the Base class
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(scene, camera) {
        this.scene = scene;
        
        // Initialize accumulation variables for acceleration
        this.velocityChangeAccumulator = new BABYLON.Vector3(0, 0, 0);
        this.accumulatedTime = 0;
        
        // Create displays for speed and acceleration
        this.createVelocityDisplay();
        this.createAccelerationDisplay();
        this.createDeltaVDisplay();
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
        this.velocityDisplay.style.zIndex = "1";
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
        this.accelerationDisplay.style.zIndex = "1";
        document.body.appendChild(this.accelerationDisplay);
    }
    
    // Creates delta V display
    createDeltaVDisplay() {
        this.deltaVDisplay = document.createElement("div");
        this.deltaVDisplay.style.position = "absolute";
        this.deltaVDisplay.style.bottom = "70px";
        this.deltaVDisplay.style.left = "10px";
        this.deltaVDisplay.style.color = "white";
        this.deltaVDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.deltaVDisplay.style.padding = "5px";
        this.deltaVDisplay.style.borderRadius = "5px";
        this.deltaVDisplay.style.fontFamily = "Arial, sans-serif";
        this.deltaVDisplay.style.fontSize = "14px";
        this.deltaVDisplay.style.zIndex = "1";
        document.body.appendChild(this.deltaVDisplay);
    }
    

    // Function to calculate and display the current speed in meters per second
    displayVelocity(velocity, accelerationFactor) {
        const speed = (velocity.length()) * accelerationFactor; // Magnitude of the velocity vector
        this.velocityDisplay.innerText = `Speed: ${speed.toFixed(2)} m/s`;
    }
    
    // Displays delta V
    displayDeltaV(rocket) {
        const deltaV = rocket.getDeltaV();
        this.deltaVDisplay.innerText = `Delta-V: ${deltaV.toFixed(2)} m/s`;
    }
    
    // Function to accumulate velocity changes and display average acceleration per second
    accumulateAcceleration(deltaTime, velocity, accelerationFactor, previousVelocity) {
        // Calculate the change in velocity for this frame
        const velocityChange = velocity.subtract(previousVelocity);
        
        // Accumulate the change in velocity
        this.velocityChangeAccumulator.addInPlace(velocityChange);
        this.accumulatedTime += deltaTime;

        // If one second has passed, calculate and display acceleration
        if (this.accumulatedTime >= 1) {
            const acceleration = this.velocityChangeAccumulator.length() * accelerationFactor; // Magnitude of accumulated change
            this.accelerationDisplay.innerText = `Acceleration: ${acceleration.toFixed(2)} m/s²`;

            // Reset accumulator and time
            this.velocityChangeAccumulator.set(0, 0, 0);
            this.accumulatedTime = 0;
        }
    }
}

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
        
        // Create displays for resources
        this.createResourcesDisplay();
        this.createMassDisplay();
        this.createValueDisplay();
        
        // Create displays for money and tier
        this.createMoneyDisplay();
        this.createTierDisplay();
        
        // Displays for planet distance and name
        this.createDistanceDisplay();
        this.createNameDisplay();
    }
	
    
    // Function to create a DOM element to display the velocity
    createVelocityDisplay() {
        this.velocityDisplay = document.createElement("div");
        this.velocityDisplay.style.position = "absolute";
        this.velocityDisplay.style.bottom = "30px";
        this.velocityDisplay.style.left = "10px";
        this.velocityDisplay.style.color = "white";
        this.velocityDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.velocityDisplay.style.padding = "5px";
        this.velocityDisplay.style.borderRadius = "5px";
        this.velocityDisplay.style.fontFamily = "Arial, sans-serif";
        this.velocityDisplay.style.fontSize = "12px";
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
        this.accelerationDisplay.style.fontSize = "12px";
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
        this.deltaVDisplay.style.fontSize = "12px";
        this.deltaVDisplay.style.zIndex = "1";
        document.body.appendChild(this.deltaVDisplay);
    }
    
    // Creates distance display
    createDistanceDisplay() {
        this.distanceDisplay = document.createElement("div");
        this.distanceDisplay.style.position = "absolute";
        this.distanceDisplay.style.bottom = "50px";
        this.distanceDisplay.style.left = "10px";
        this.distanceDisplay.style.color = "white";
        this.distanceDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.distanceDisplay.style.padding = "5px";
        this.distanceDisplay.style.borderRadius = "5px";
        this.distanceDisplay.style.fontFamily = "Arial, sans-serif";
        this.distanceDisplay.style.fontSize = "12px";
        this.distanceDisplay.style.zIndex = "1";
        document.body.appendChild(this.distanceDisplay);
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
    
    // Displays current planet distance
    displayDistance(distance) {
        this.distanceDisplay.innerText = `Distance: ${distance.toFixed(2)} m`;
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
    
    
    // Display for current planet name
    createNameDisplay() {
        this.nameDisplay = document.createElement("div");
        this.nameDisplay.style.position = "absolute";
        this.nameDisplay.style.bottom = "50px";
        this.nameDisplay.style.right = "10px";
        this.nameDisplay.style.color = "white";
        this.nameDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.nameDisplay.style.padding = "5px";
        this.nameDisplay.style.borderRadius = "5px";
        this.nameDisplay.style.fontFamily = "Arial, sans-serif";
        this.nameDisplay.style.fontSize = "12px";
        this.nameDisplay.style.zIndex = "1";
        document.body.appendChild(this.nameDisplay);
    }
    
    // Display for current planet resources
    createResourcesDisplay() {
        this.resourcesDisplay = document.createElement("div");
        this.resourcesDisplay.style.position = "absolute";
        this.resourcesDisplay.style.bottom = "70px";
        this.resourcesDisplay.style.right = "10px";
        this.resourcesDisplay.style.color = "white";
        this.resourcesDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.resourcesDisplay.style.padding = "5px";
        this.resourcesDisplay.style.borderRadius = "5px";
        this.resourcesDisplay.style.fontFamily = "Arial, sans-serif";
        this.resourcesDisplay.style.fontSize = "12px";
        this.resourcesDisplay.style.zIndex = "1";
        document.body.appendChild(this.resourcesDisplay);
    }

    // Display for ore mass
    createMassDisplay() {
        this.massDisplay = document.createElement("div");
        this.massDisplay.style.position = "absolute";
        this.massDisplay.style.bottom = "30px";
        this.massDisplay.style.right = "10px";
        this.massDisplay.style.color = "white";
        this.massDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.massDisplay.style.padding = "5px";
        this.massDisplay.style.borderRadius = "5px";
        this.massDisplay.style.fontFamily = "Arial, sans-serif";
        this.massDisplay.style.fontSize = "12px";
        this.massDisplay.style.zIndex = "1";
        document.body.appendChild(this.massDisplay);
    }
    
    // Display for ore value
    createValueDisplay() {
        this.valueDisplay = document.createElement("div");
        this.valueDisplay.style.position = "absolute";
        this.valueDisplay.style.bottom = "10px";
        this.valueDisplay.style.right = "10px";
        this.valueDisplay.style.color = "white";
        this.valueDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.valueDisplay.style.padding = "5px";
        this.valueDisplay.style.borderRadius = "5px";
        this.valueDisplay.style.fontFamily = "Arial, sans-serif";
        this.valueDisplay.style.fontSize = "12px";
        this.valueDisplay.style.zIndex = "1";
        document.body.appendChild(this.valueDisplay);
    }
    
    // Functions to update resource display functions
    displayResources(resources) {
        const resourceString = resources.join(', '); // Convert array to a comma-separated string
        this.resourcesDisplay.innerText = `Resources: ${resourceString}`;
    }
    
    displayOreMass(mass) {
        this.massDisplay.innerText = `Ore Mass: ${mass.toFixed(2)} kg`;
    }
    
    displayValue(value) {
        this.valueDisplay.innerText = `Ore Value: ${value.toFixed(2)} $`;
    }
    
    // Function to display name
    displayName(name) {
        this.nameDisplay.innerText = `Current Planet: ${name}`;
    }
    
    
    // Display for total money
    createMoneyDisplay() {
        this.moneyDisplay = document.createElement("div");
        this.moneyDisplay.style.position = "absolute";
        this.moneyDisplay.style.top = "10px";
        this.moneyDisplay.style.right = "10px";
        this.moneyDisplay.style.color = "white";
        this.moneyDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.moneyDisplay.style.padding = "5px";
        this.moneyDisplay.style.borderRadius = "5px";
        this.moneyDisplay.style.fontFamily = "Arial, sans-serif";
        this.moneyDisplay.style.fontSize = "12px";
        this.moneyDisplay.style.zIndex = "1";
        document.body.appendChild(this.moneyDisplay);
    }
    
    // Display for tech tier
    createTierDisplay() {
        this.tierDisplay = document.createElement("div");
        this.tierDisplay.style.position = "absolute";
        this.tierDisplay.style.top = "30px";
        this.tierDisplay.style.right = "10px";
        this.tierDisplay.style.color = "white";
        this.tierDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.tierDisplay.style.padding = "5px";
        this.tierDisplay.style.borderRadius = "5px";
        this.tierDisplay.style.fontFamily = "Arial, sans-serif";
        this.tierDisplay.style.fontSize = "12px";
        this.tierDisplay.style.zIndex = "1";
        document.body.appendChild(this.tierDisplay);
    }
    
    // Functions to update resource display functions
    displayMoney(money) {
        this.moneyDisplay.innerText = `Total Money: ${money.toFixed(2)} $`;
    }
    
    displayTier(tier) {
        this.tierDisplay.innerText = `Current Tier: ${tier}`;
    }
}

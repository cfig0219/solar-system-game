export class Gravity {
    /**
     * Takes no initial arguments, loops through planet list
     */
    constructor(camera, scene) {
        // Gravity Variables
        this.planetList = [];
        this.scene = scene;
        this.camera = camera;
        this.playerPosition = camera.position;
        
        this.planetDistance = 1000;
        this.planetMass = 1000000000;
        this.gravityCenter = new BABYLON.Vector3(0, 0, 0);
        this.currentPlanet = null;
        this.gravityForce = 0.045;
        this.frameRate = 20;
        
        // Initialize velocity and previous velocity
        this.velocity = new BABYLON.Vector3(0, 0, 0);
        this.previousVelocity = this.velocity.clone();
        
        // Calls to apply gravity function
        this.applyGravity();
    }
	
	
    // Functions to add planets and get player position
    addPlanet(planet) {
        this.planetList.push(planet);
    }

    currentPosition() {
        return this.playerPosition;
    }
    
    // Functions to get and update velocity
    getVelocity() {
    	return this.velocity;
    }
    
    setVelocity(newVelocity) {
    	this.velocity = newVelocity;
    }
    
    resetVelocity() {
    	this.velocity = new BABYLON.Vector3(0, 0, 0);
    }
    
    // Calculates gravitational pull based on distance from planet
    calculateGravity(distance, mass) {
        const gConstant = 0.000000000067; // Gravitational constant in N·m²/kg²
        
        // Prevent division by zero for very close distances
        if (distance <= 0) {
            return 0;
        }
    
        // Calculate acceleration due to gravity, divides by frame rate x 10
        const acceleration = (gConstant * mass / (distance * distance)) / (this.frameRate * 10); 
        return acceleration; // Acceleration in m/s²
    }
    
	
    // Loops through list of planets to obtain gravity center
    updateGravity() {
        if (this.planetList.length > 0) {
            let closestDistance = Infinity; // Initialize with a very large value
            let closestPlanet = null;

            this.planetList.forEach((currentPlanet) => {
                const planetLocation = currentPlanet.getLocation();
                const distance = BABYLON.Vector3.Distance(this.playerPosition, planetLocation);

                // Update closest planet if this one is closer
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestPlanet = planetLocation;
                    
                    // Saves current planet variable and closest distance
                    this.currentPlanet = currentPlanet;
                    this.planetDistance = distance;
                }
            });

            // Update gravityCenter to the closest planet's location
            if (closestPlanet) {
                this.gravityCenter = closestPlanet;
            }
        }
    }
    
    // Applies gravity
    applyGravity() {
        // calculates frame rate
        let frames = 0;
        let lastUpdateTime = 0;
    
        this.scene.onBeforeRenderObservable.add(() => {
            // Update the gravity center
            this.updateGravity();
    
            // Calculate the gravitational force
            let forward = this.gravityCenter.subtract(this.camera.position).normalize();
            this.velocity.addInPlace(forward.scale(this.gravityForce));
    
            // Update camera position based on velocity
            this.camera.target.addInPlace(this.velocity);
            this.camera.position.addInPlace(this.velocity);
            
            // Update previous velocity for the next frame
            this.previousVelocity.copyFrom(this.velocity);
            
            // Calculates the gravitational pull of the planet
            this.gravityForce = this.calculateGravity(this.planetDistance, this.currentPlanet.getMass());
            
            frames = frames + 1;
            
            const currentTime = performance.now() / 1000; // Current time in seconds
            const timeElapsed = currentTime - lastUpdateTime;
            
            if (timeElapsed >= 1) {
                // Saves current frame rate value
                this.frameRate = frames;
                frames = 0;
                lastUpdateTime = currentTime;
            }
        });
    }
}
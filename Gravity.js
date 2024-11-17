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
        this.gravityCenter = new BABYLON.Vector3(0, 0, 0);
        
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
        const acceleration = 0.45; // Adjust acceleration as needed
    
        this.scene.onBeforeRenderObservable.add(() => {
            // Update the gravity center
            this.updateGravity();
    
            // Calculate the gravitational force
            let forward = this.gravityCenter.subtract(this.camera.position).normalize();
            this.velocity.addInPlace(forward.scale(acceleration));
    
            // Update camera position based on velocity
            this.camera.target.addInPlace(this.velocity);
            this.camera.position.addInPlace(this.velocity);
            
            // Update previous velocity for the next frame
            this.previousVelocity.copyFrom(this.velocity);
        });
    }
}
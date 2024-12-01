export class Rocket {
    /**
     * Initializes the Base class
     * @param {BABYLON.Vector3} rocketLocation - Position in 3D space
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(rocketLocation, scene, camera) {
        this.rocketSize = 15;
        this.rocketLocation = rocketLocation;
        this.rocketMass = 20;
        this.rocketTexture = new BABYLON.Texture('Textures/Base/borg.jpg', scene);
        this.scene = scene;
        this.camera = camera;
        
        // Resource parameters
        this.deltaV = 676; // m/s of delta v
        this.oreCapacity = 10000; // kg of ore
        this.money = 0.0;

        // Create a cube (box)
        this.cube = BABYLON.MeshBuilder.CreateBox("cube", { size: this.rocketSize * 2 }, this.scene);
        
        // Create a gray material
        const cubeMaterial = new BABYLON.StandardMaterial("cubeMaterial", this.scene);
        cubeMaterial.diffuseTexture = this.rocketTexture;
        cubeMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // Remove highlights
        cubeMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0); // No self-illumination
        
        // Apply material to cube
        this.cube.material = cubeMaterial;

        // Set cube position
        this.cube.position = this.rocketLocation;
        this.cube.renderingGroupId = 3;
        
        // Creates laser
        this.createLaser();
    }
    
    
    // Creates and toggles laser visibility
    createLaser() {
        // Create a cylinder to represent the laser
        this.laser = BABYLON.MeshBuilder.CreateCylinder("laser", {
            height: 5000,  // Length of the laser
            diameter: 2 // Thin laser beam
        }, this.scene);
    
        // Create a material for the laser
        const laserMaterial = new BABYLON.StandardMaterial("laserMaterial", this.scene);
        laserMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // Remove highlights
        laserMaterial.emissiveColor = new BABYLON.Color3(0, 1, 0); // Glowing green laser
    
        // Apply the material to the laser
        this.laser.material = laserMaterial;
        this.laser.renderingGroupId = 3;
        
        // Makes laser child of rocket model
        this.laser.parent = this.cube;
        this.laser.position = new BABYLON.Vector3(0, 0, 2500);
    
        // Make the laser initially invisible
        this.laser.visibility = 0;
    }
    
    // Method to toggle laser visibility
    toggleLaser() {
        if (this.laser) {
            this.laser.visibility = this.laser.visibility === 0 ? 1 : 0;
            console.log("toggle");
        }
    }
	
    
    // Physics related functions
    setMass(newMass) {
		this.mass = newMass;
    }
    
    getMass() {
    	return this.rocketMass;
    }
    
    getLocation() {
    	return this.rocketLocation;
    }
    
    setLocation(newLocation) {
        this.rocketLocation = newLocation;
        this.cube.position = this.rocketLocation;
    }
    
    setRotation(yRotation) {
        this.rotation = yRotation;
        this.cube.rotation.y = yRotation;
        
        // Set laser horizontal
        this.laser.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    }
    
    
    // Resource related functions
    setDeltaV(change) {
        this.deltaV = this.deltaV - change;
        
        // if delta V is less than zero
        let currentDeltaV = this.deltaV;
        if (currentDeltaV < 0) {
            this.deltaV = 0;
        }
    }
    
    getDeltaV() {
        return this.deltaV;
    }
    
    getOreCapacity() {
        return this.oreCapacity;
    }
    
    
    // Functions to upgrade rocket
    upgrade(tier, money) {
        let newTier = "";
        const nuclearCost = 100000;
        const fusionCost = 500000;
        const antimatterCost = 2500000;
        const warpCost = 12500000;
        this.money = money;
        
        // if not warp tier
        if (tier != "warp") {
            // Determines if upgrade cost is reached
            if (tier == "chemical" && money > nuclearCost) {
                newTier = "nuclear";
                this.money = this.money - nuclearCost; // Updates money
                this.deltaV = 1352; // Updates delta v
            }
            else if (tier == "nuclear" && money > fusionCost) {
                newTier = "fusion";
                this.money = this.money - fusionCost;
                this.deltaV = 5050;
            }
            else if (tier == "fusion" && money > antimatterCost) {
                newTier = "antimatter";
                this.money = this.money - antimatterCost;
                this.deltaV = 17675;
            }
            else if (tier == "antimatter" && money > warpCost) {
                newTier = "warp";
                this.money = this.money - warpCost;
                this.deltaV = 70701;
            }
            // If upgrade cost has not been reached yet
            else {
                newTier = tier;
            }
        }
        // Cap upgrades once warp tier is reached
        else if (tier == "warp") {
            newTier = "warp";
        }
        
        return newTier
    }
    
    // Returns new money balance after rocket upgrade
    upgradeCost() {
        return this.money;
    }
}

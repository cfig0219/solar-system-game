export class Rocket {
    /**
     * Initializes the Base class
     * @param {BABYLON.Vector3} rocketLocation - Position in 3D space
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(rocketLocation, scene, camera) {
        this.rocketSize = 10;
        this.rocketLocation = rocketLocation;
        this.rocketMass = 20;
        this.rocketTexture = new BABYLON.Texture('Textures/Base/borg.jpg', scene);
        this.scene = scene;
        this.camera = camera;
        
        // Resource parameters
        this.deltaV = 676; // m/s of delta v
        this.oreCapacity = 10000; // kg of ore
        this.money = 0.0;

        // Creates the rocket
        this.createRocket();
        
        // Creates laser
        this.createLaser();
    }
    
    
    createRocket() {
        // Create a cube (box)
        this.cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, this.scene);
    
        // Create a gray material
        const cubeMaterial = new BABYLON.StandardMaterial("cubeMaterial", this.scene);
        cubeMaterial.diffuseTexture = this.rocketTexture;
        cubeMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // Remove highlights
        cubeMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0); // No self-illumination
    
        // Apply material to cube
        this.cube.material = cubeMaterial;
        this.cube.position = this.rocketLocation;
        this.cube.renderingGroupId = -1;
    
        // Create a body
        this.body = BABYLON.MeshBuilder.CreateCylinder("rocketCylinder", {
            diameterTop: 0,                     // Top diameter (point of the cone)
            diameterBottom: this.rocketSize * 2, // Bottom diameter (base of the cone)
            height: this.rocketSize * 3,       // Height of the body
            tessellation: 3               // Smoothness
        }, this.scene);
    
        // Apply the same material as the cube to the body
        this.body.material = cubeMaterial;
        // Position the body 15 units below the cube
        this.body.position = new BABYLON.Vector3(0, -10, 0);
    
        // Make the body a child of the cube
        this.body.parent = this.cube;
        this.body.renderingGroupId = 3;
        
        // Set body horizontal
        this.body.rotation = new BABYLON.Vector3(
            0,  // X-axis rotation 
            (90 * Math.PI) / 180,  // Y-axis rotation (300 degrees)
            (90 * Math.PI) / 180   // Z-axis rotation (90 degrees)
        );
        
        // Sets vertical scale of body
        this.body.scaling.x = 0.3;
        
        // Add glow layer to the scene
        if (!this.scene.glowLayer) {
            this.scene.glowLayer = new BABYLON.GlowLayer("glowLayer", this.scene);
        }
        // Set the body to not glow
        this.scene.glowLayer.addIncludedOnlyMesh(this.body);
        this.body.material.emissiveColor = new BABYLON.Color3(0, 0, 0); // No emission
    }
    
    
    // Creates and toggles laser visibility
    createLaser() {
        // Create a body to represent the laser
        this.laser = BABYLON.MeshBuilder.CreateCylinder("laser", {
            height: 25000,  // Length of the laser
            diameter: 1 // Thin laser beam
        }, this.scene);
    
        // Create a material for the laser
        const laserMaterial = new BABYLON.StandardMaterial("laserMaterial", this.scene);
        laserMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // Remove highlights
        laserMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0); // Glowing green laser
    
        // Apply the material to the laser
        this.laser.material = laserMaterial;
        this.laser.renderingGroupId = 1;
        
        // Makes laser child of rocket model
        this.laser.parent = this.cube;
        this.laser.position = new BABYLON.Vector3(0, -10, 12500);
    
        // Make the laser initially invisible
        this.laser.visibility = 0;
        
        // Set the glow intensity for the laser
        this.scene.glowLayer.addIncludedOnlyMesh(this.laser);
        this.scene.glowLayer.intensity = 0.5;
                
        // Set laser horizontal
        this.laser.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    }
    
    // Method to toggle laser visibility
    activateLaser() {
        if (this.laser) {
            this.laser.visibility = 1;
        }
    }
    
    deactivateLaser() {
        if (this.laser) {
            this.laser.visibility = 0;
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
    
    
    // Determines color based on tier
    determineColor(tier) {
        if (tier == "chemical") { this.setColor("#ffb400"); }
        else if (tier == "nuclear") { this.setColor("#ff1a1a"); }
        else if (tier == "fusion") { this.setColor("#cc33ff"); }
        else if (tier == "antimatter") { this.setColor("#3366ff"); }
        else if (tier == "warp") { this.setColor("#4ddbff"); }
    }
    
    // Updates engine color
}

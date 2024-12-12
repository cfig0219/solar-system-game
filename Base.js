export class Base {
    /**
     * Initializes the Base class
     * @param {BABYLON.Vector3} baseLocation - Position in 3D space
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(baseLocation, scene, camera) {
        this.baseRadius = 10; // This will control the radius of the cylinder
        this.baseHeight = 50; // Height of the cylinder
        this.baseLocation = baseLocation;
        this.baseMass = 100;
        this.baseTexture = new BABYLON.Texture('Textures/Base/borg.jpg', scene);
        this.scene = scene;
        this.baseName = "";
        
        this.createBase();
    
        // Resource and player parameters
        this.playerDistance = 0;
        this.resources = null;
    }
    
    
    createBase() {
        // Create the central cylinder
        this.cylinder = BABYLON.MeshBuilder.CreateCylinder("baseCylinder", {
            diameter: this.baseRadius * 2, // Diameter of the cylinder
            height: this.baseHeight,      // Height of the cylinder
            tessellation: 32              // Number of subdivisions for smoothness
        }, this.scene);
    
        // Create a gray material
        const cylinderMaterial = new BABYLON.StandardMaterial("cylinderMaterial", this.scene);
        cylinderMaterial.diffuseTexture = this.baseTexture;
        cylinderMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // Remove highlights
        cylinderMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0); // No self-illumination
    
        // Apply material to the central cylinder
        this.cylinder.material = cylinderMaterial;
        this.cylinder.position = this.baseLocation;
        this.cylinder.renderingGroupId = 1;
    
        // Create the first intersecting cylinder (horizontal)
        this.crossCylinder1 = BABYLON.MeshBuilder.CreateCylinder("crossCylinder1", {
            diameter: this.baseRadius * 2, // Same diameter as the central cylinder
            height: this.baseHeight * 2,  // Twice the height of the central cylinder
            tessellation: 32
        }, this.scene);
        
        // Apply the same material and make it a child of the central cylinder
        this.crossCylinder1.material = cylinderMaterial;
        this.crossCylinder1.parent = this.cylinder;
        this.crossCylinder1.position = new BABYLON.Vector3(0, 0, 0); // Relative to the parent
        this.crossCylinder1.rotation = new BABYLON.Vector3(0, 0, Math.PI / 2); // Rotate to lie horizontally
        this.crossCylinder1.renderingGroupId = 1;
    
        // Create the second intersecting cylinder (vertical, perpendicular to the first)
        this.crossCylinder2 = BABYLON.MeshBuilder.CreateCylinder("crossCylinder2", {
            diameter: this.baseRadius * 2, // Same diameter as the central cylinder
            height: this.baseHeight * 2,  // Twice the height of the central cylinder
            tessellation: 32
        }, this.scene);
        
        // Apply the same material and make it a child of the central cylinder
        this.crossCylinder2.material = cylinderMaterial;
        this.crossCylinder2.parent = this.cylinder;
        this.crossCylinder2.position = new BABYLON.Vector3(0, 0, 0); // Relative to the parent
        this.crossCylinder2.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0); // Rotate perpendicular to both the central and first cylinder
        this.crossCylinder2.renderingGroupId = 1;
    
        // Create the torus
        this.torus = BABYLON.MeshBuilder.CreateTorus("baseTorus", {
            diameter: this.baseHeight * 2,     // Outer diameter
            thickness: this.baseRadius * 2.4, // Thickness
            tessellation: 64                  // Smoothness of the torus
        }, this.scene);
    
        // Apply the same material and make it a child of the central cylinder
        this.torus.material = cylinderMaterial;
        this.torus.parent = this.cylinder;
        this.torus.position = new BABYLON.Vector3(0, 0, 0); // Relative to the parent
        this.torus.renderingGroupId = 1;
        
        // Rotate the main cylinder 90 degrees along the X-axis
        this.cylinder.rotation.x = Math.PI / 2;
    }
	
    
    // Physics related functions
    setMass(newMass) {
		this.mass = newMass;
    }
    
    getMass() {
    	return this.baseMass;
    }
    
    getLocation() {
    	return this.baseLocation;
    }
    
    setLocation(newLocation) {
        this.baseLocation = newLocation;
        this.cube.position = this.baseLocation;
    }
    
    setName(name) {
    	this.baseName = name;
    }
    
    getName() {
    	return this.baseName;
    }
    
    
    // Functions to update location of player
    getDistance(playerLocation) {
        this.playerDistance = (this.baseLocation.subtract(playerLocation)).length();
        return this.playerDistance;
    }
    
    setPlayerLocation(player, newLocation) {
        player.setLocation(newLocation);
    }
    
    setResources(resources) {
        this.resources = resources;
    }
    
    getResources() {
        return this.resources;
    }
    
    // Functions to reset location while near base
    nearBase(player, spawnLocation) {
    
        // places player back in spawn if close to base
        if (this.playerDistance < 100) {
            player.setState("docked");
            player.setLocation(spawnLocation);
        }
    }
}

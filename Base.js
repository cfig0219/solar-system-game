export class Base {
    /**
     * Initializes the Base class
     * @param {BABYLON.Vector3} baseLocation - Position in 3D space
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(baseLocation, scene, camera) {
        this.baseRadius = 100;
        this.baseLocation = baseLocation;
        this.baseMass = 1000;
        this.baseTexture = new BABYLON.Texture('Textures/Base/borg.jpg', scene);
        this.scene = scene;
        this.baseName = "";

        // Create a cube (box)
        this.cube = BABYLON.MeshBuilder.CreateBox("cube", { size: this.baseRadius * 2 }, this.scene);
        
        // Create a gray material
        const cubeMaterial = new BABYLON.StandardMaterial("cubeMaterial", this.scene);
        cubeMaterial.diffuseTexture = this.baseTexture;
        cubeMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // Remove highlights
        cubeMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0); // No self-illumination
        
        // Apply material to cube
        this.cube.material = cubeMaterial;

        // Set cube position
        this.cube.position = this.baseLocation;
        this.cube.renderingGroupId = 1;
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
}

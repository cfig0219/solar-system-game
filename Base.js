export class Base {
    /**
     * Initializes the Base class
     * @param {BABYLON.Vector3} planetLocation - Position in 3D space
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(planetLocation, scene, camera) {
        this.planetRadius = 100;
        this.planetLocation = planetLocation;
        this.planetTexture = new BABYLON.Texture('Textures/Base/borg.jpg', scene);
        this.scene = scene;
        this.planetName = "";

        // Create a cube (box)
        this.cube = BABYLON.MeshBuilder.CreateBox("cube", { size: this.planetRadius * 2 }, this.scene);
        
        // Create a gray material
        const cubeMaterial = new BABYLON.StandardMaterial("cubeMaterial", this.scene);
        cubeMaterial.diffuseTexture = this.planetTexture;
        cubeMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // Remove highlights
        cubeMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0); // No self-illumination
        
        // Apply material to cube
        this.cube.material = cubeMaterial;

        // Set cube position
        this.cube.position = this.planetLocation;
        this.cube.renderingGroupId = 1;
    }
	
    
    // Physics related functions
    setMass(newMass) {
		this.mass = newMass;
    }
    
    getMass() {
    	return this.planetMass;
    }
    
    getLocation() {
    	return this.planetLocation;
    }
    
    setName(name) {
    	this.planetName = name;
    }
    
    getName() {
    	return this.planetName;
    }
}

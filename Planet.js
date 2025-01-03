// Planet.js

export class Planet {
    /**
     * Initializes the Planet class
     * @param {number} planetRadius - The radius of the planet
     * @param {BABYLON.Vector3} planetLocation - Position in 3D space
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(planetRadius, planetLocation, scene, camera) {
        this.planetRadius = planetRadius;
        this.planetLocation = planetLocation;
        this.planetTexture = new BABYLON.Texture('Textures/Eden/EdenMap.png', scene);
        this.landTexture = new BABYLON.Texture('Textures/Eden/EdenLand.png', scene);
        this.cloudTexture = new BABYLON.Texture('Textures/Clouds/EarthClouds.png', scene);
        
        this.atmosphereOpacity = 0.27;
        this.atmosphereColor = new BABYLON.Color3(0.5, 0.7, 1);
        this.cloudColor = new BABYLON.Color3(1, 1, 1);
        this.scene = scene;
        this.planetName = "";

        // Initialize planet layers
        this.createBaseLayer();

        // Initializes rotation rates
        this.planetRotationSpeed = 0.001;
        this.landRotationSpeed = 0.001;
        this.cloudRotationSpeed = 0.0008;
    }

    createBaseLayer() {
        this.planetTexture.vScale = -1;
        this.planetTexture.uScale = -1;

        this.sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: this.planetRadius * 2 }, this.scene);
        const sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", this.scene);

        sphereMaterial.diffuseTexture = this.planetTexture;
        sphereMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        sphereMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
        sphereMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1).scale(1 - this.atmosphereOpacity);
        this.sphere.material = sphereMaterial;
        this.sphere.position = this.planetLocation;
        this.sphere.renderingGroupId = 1;
        
        // Rotates base layer
        this.scene.registerBeforeRender(() => {
            this.sphere.rotation.y -= this.planetRotationSpeed;
        });
    }

    createLandLayer() {
        this.landTexture.vScale = -1;
        this.landTexture.uScale = -1;
        this.landTexture.hasAlpha = true;

        this.landLayer = BABYLON.MeshBuilder.CreateSphere("landLayer", { diameter: this.planetRadius * 2 }, this.scene);
        const landMaterial = new BABYLON.StandardMaterial("landMaterial", this.scene);

        landMaterial.diffuseTexture = this.landTexture;
        landMaterial.useAlphaFromDiffuseTexture = true;
        landMaterial.backFaceCulling = true;
        landMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        landMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1).scale(1 - this.atmosphereOpacity);
        landMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
        this.landLayer.material = landMaterial;
        this.landLayer.position = this.planetLocation;
        this.landLayer.renderingGroupId = 1;
        
        // Rotates land layer
        this.scene.registerBeforeRender(() => {
            this.landLayer.rotation.y -= this.landRotationSpeed;
        });
    }

    createCloudLayer() {
        this.cloudTexture.vScale = -1;
        this.cloudTexture.uScale = -1;
        this.cloudTexture.hasAlpha = true;

        this.cloudLayer = BABYLON.MeshBuilder.CreateSphere("cloudLayer", { diameter: this.planetRadius * 2.005 }, this.scene);
        const cloudMaterial = new BABYLON.StandardMaterial("cloudMaterial", this.scene);

        cloudMaterial.diffuseTexture = this.cloudTexture;
        cloudMaterial.useAlphaFromDiffuseTexture = true;
        cloudMaterial.backFaceCulling = true;
        cloudMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        cloudMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9)
        this.cloudLayer.material = cloudMaterial;
        this.cloudLayer.position = this.planetLocation;
        this.cloudLayer.renderingGroupId = 1;
        
        // Rotates cloud layer
        this.scene.registerBeforeRender(() => {
            this.cloudLayer.rotation.y -= this.cloudRotationSpeed;
        });
    }

    createAtmosphere() {
        const atmosphereMaterial = new BABYLON.StandardMaterial("atmosphereMaterial", this.scene);
        atmosphereMaterial.diffuseColor = this.atmosphereColor;
        atmosphereMaterial.alpha = this.atmosphereOpacity;
        atmosphereMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

        const opacityFresnel = new BABYLON.FresnelParameters();
        opacityFresnel.bias = 0.6;
        opacityFresnel.power = (this.atmosphereOpacity * 2.34) + this.atmosphereOpacity;
        opacityFresnel.leftColor = new BABYLON.Color3(1, 1, 1);
        opacityFresnel.rightColor = new BABYLON.Color3(0.0, 0.0, 0.0);
        atmosphereMaterial.opacityFresnelParameters = opacityFresnel;

        this.atmosphere = BABYLON.MeshBuilder.CreateSphere("atmosphere", { diameter: this.planetRadius * 2.007 }, this.scene);
        this.atmosphere.material = atmosphereMaterial;
        this.atmosphere.position = this.planetLocation;
        this.atmosphere.renderingGroupId = 1;
    }
    
    
    // Functions to set the planet surface and cloud textures
    setTexture(newPlanetTexture) {
    	this.planetTexture = newPlanetTexture;
        this.planetTexture.vScale = -1; // Apply vertical flip
        this.planetTexture.uScale = -1; // Apply horizontal flip
    	this.sphere.material.diffuseTexture = this.planetTexture;
    }
    
    setLand(newLandTexture) {
    	this.landTexture = newLandTexture;
    	this.landTexture.hasAlpha = true;
        this.landTexture.vScale = -1;
        this.landTexture.uScale = -1;
    	this.landLayer.material.diffuseTexture = this.landTexture;
    }
    
    setClouds(newCloudTexture) {
    	this.cloudTexture = newCloudTexture;
    	this.cloudTexture.hasAlpha = true;
        this.cloudTexture.vScale = -1;
        this.cloudTexture.uScale = -1;
    	this.cloudLayer.material.diffuseTexture = this.cloudTexture;
    }
    
    // Functions to planet's visuals
    setAtmosphereColor(newAtmosphereColor) {
    	this.atmosphereColor = newAtmosphereColor;
    	this.atmosphere.material.diffuseColor = this.atmosphereColor;
    }
    
    setCloudColor(newCloudColor) {
    	this.cloudColor = newCloudColor;
    	this.cloudLayer.material.diffuseColor = this.cloudColor;
    }
    
    setAtmosphereOpacity(newOpacity) {
    	this.atmosphereOpacity = newOpacity;
    	this.atmosphere.material.alpha = newOpacity;
    	
    	// Update Fresnel parameters to reflect the new opacity
    	const opacityFresnel = this.atmosphere.material.opacityFresnelParameters;
    	if (opacityFresnel) {
    	    opacityFresnel.power = (this.atmosphereOpacity * 2.34) + this.atmosphereOpacity;
    	}
    }
    
    setReflection(newSpecularColor) {
    	this.sphere.material.specularColor = newSpecularColor;
    }
    
    setEmissiveness(newEmissiveColor) {
    	this.sphere.material.emissiveColor = newEmissiveColor;
    }
    
    setPlanetRotation(newRotation) {
        this.planetRotationSpeed = newRotation;
    }
    
    setLandRotation(newRotation) {
        this.landRotationSpeed = newRotation;
    }
    
    setCloudRotation(newRotation) {
        this.cloudRotationSpeed = newRotation;
    }
    
    
    // Physics related functions
    setMass(planetRadius, surfaceGravity) {
    	// Gravity Variables
		const gConstant = 0.000000000067
		this.planetMass = (surfaceGravity * Math.pow(planetRadius,2)) / gConstant;
    }
    
    getMass() {
    	return this.planetMass;
    }
    
    getRadius() {
    	return this.planetRadius;
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

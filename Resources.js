export class Resources {
    /**
     * Initializes the Base class
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(scene, camera) {
        this.scene = scene;
        
        // Initializes default resources
        this.resources = ["water", "oxygen", "iron", "aluminum"];
        this.currentPlanet = "planet";
        this.value = 0.0;
        this.mass = 0.0;
    }
    
    // Obtain's the current planet's name
    setPlanet(planet) {
        if (planet != null) {
            this.currentPlanet = planet.getName();
        }
    }
    
    
    // Determines what resources current planet has
    getResources() {
        const planetName = this.currentPlanet;
        
        if (planetName == "luna") { this.resources = ["water", "iron", "aluminum", "copper", "gold"]; }
        else if (planetName == "earth") { this.resources = ["water", "coal", "iron", "petroleum", "oxygen", "lead", "uranium", "diamonds"]; }
        else if (planetName == "sol") { this.resources = ["antimatter"]; }
        else if (planetName == "mercury") { this.resources = ["iron", "aluminum", "lead", "uranium", "gold", "tungsten"]; }
        else if (planetName == "venus") { this.resources = ["coal", "methane", "iron", "sulfur", "uranium", "diamonds"]; }
        else if (planetName == "mars") { this.resources = ["water", "iron", "aluminum", "lithium", "titanium"]; }
        else if (planetName == "jupiter") { this.resources = ["hydrogen", "deuterium", "tritium", "antimatter"]; }
        else if (planetName == "saturn") { this.resources = ["hydrogen", "deuterium", "tritium", "antimatter"]; }
        else if (planetName == "uranus") { this.resources = ["hydrogen", "methane", "deuterium"]; }
        else if (planetName == "neptune") { this.resources = ["hydrogen", "methane", "deuterium"]; }
        else if (planetName == "canaan") { this.resources = ["antimatter"]; }
        else if (planetName == "muspelheim") { this.resources = ["coal", "petroleum", "iron", "sulfur", "aluminum", "lithium", "uranium", "diamonds", "plutonium"]; }
        else if (planetName == "diyu") { this.resources = ["iron", "titanium", "lead", "sulfur"]; }
        else if (planetName == "eden") { this.resources = ["water", "iron", "aluminum", "copper", "gold"]; }
        else if (planetName == "nysa") { this.resources = ["water", "iron", "sulfur", "petroleum", "oxygen", "lead", "uranium", "diamonds"]; }
        else if (planetName == "ararat") { this.resources = ["water", "methane", "iron", "lithium", "aluminum", "copper", "gold"]; }
        else if (planetName == "zerzura") { this.resources = ["hydrogen", "deuterium", "tritium"]; }
        else if (planetName == "thule") { this.resources = ["water", "deuterium", "ice7", "iron", "sulfur"]; }
        else if (planetName == "sinai") { this.resources = ["antimatter"]; }
        else if (planetName == "hel") { this.resources = ["coal", "iron", "copper", "sulfur", "tungsten", "antimatter"]; }
        else if (planetName == "meropis") { this.resources = ["water", "ice7", "methane", "oxygen", "lithium", "gold"]; }
        else if (planetName == "babylon") { this.resources = ["water", "iron", "copper", "titanium", "lead", "uranium", "diamonds"]; }
        else if (planetName == "gomorrah") { this.resources = ["water", "aluminum", "titanium", "deuterium"]; }
        else if (planetName == "dorado") { this.resources = ["uranium", "sulfur", "neodymium", "osmium"]; }
        else if (planetName == "mizraim") { this.resources = ["antimatter"]; }
        else if (planetName == "agartha") { this.resources = ["petroleum", "coal", "methane", "sulfur", "copper", "diamonds"]; }
        else if (planetName == "lalotai") { this.resources = ["water", "oxygen", "ice7", "iron", "copper", "titanium", "diamonds"]; }
        else if (planetName == "irkalla") { this.resources = ["water", "iron", "aluminum", "lead", "uranium", "tungsten", "osmium", "rhodium"]; }
        else if (planetName == "gula") { this.resources = ["hydrogen", "oxygen", "methane", "deuterium"]; }
        else if (planetName == "poliahu") { this.resources = ["water", "ice7", "sulfur", "iron", "lead", "neodymium"]; }
        else if (planetName == "pohjola") { this.resources = ["water", "copper", "deuterium"]; }
        
        // Default resources if planet name is not found
        else { this.resources = ["water", "oxygen", "iron", "aluminum"]; }
        
        return this.resources;
    }
    
    
    // Determines the abundance of resources mined
    determineResource() {
    
        // Define resources with raw probabilities
        const resourceChances = [
            { resource: "water", probability: 0.1 },
            { resource: "sulfur", probability: 0.071 },
            { resource: "petroleum", probability: 0.048 },
            { resource: "coal", probability: 0.04 },
            { resource: "methane", probability: 0.033 },
            { resource: "oxygen", probability: 0.026 },
            { resource: "iron", probability: 0.021 },
            { resource: "aluminum", probability: 0.015 },
            { resource: "copper", probability: 0.0097 },
            { resource: "lead", probability: 0.0069 },
            { resource: "hydrogen", probability: 0.0055 },
            { resource: "lithium", probability: 0.0042 },
            { resource: "titanium", probability: 0.0033 },
            { resource: "gold", probability: 0.0022 },
            { resource: "uranium", probability: 0.0014 },
            { resource: "diamonds", probability: 0.0011 },
            { resource: "ice7", probability: 0.00083 },
            { resource: "deuterium", probability: 0.000066},
            { resource: "tungsten", probability: 0.00048 },
            { resource: "neodymium", probability: 0.00027 },
            { resource: "osmium", probability: 0.00014 },
            { resource: "rhodium", probability: 0.000069 },
            { resource: "plutonium", probability: 0.000035 },
            { resource: "tritium", probability: 0.000011 },
            { resource: "antimatter", probability: 0.0000012 }
        ];
    
        // Calculate the total probability
        const totalProbability = resourceChances.reduce(
            (sum, { probability }) => sum + probability,
            0
        );
    
        // Normalize probabilities if the total isn't 1
        const normalizedChances = resourceChances.map(({ resource, probability }) => ({
            resource,
            probability: probability / totalProbability
        }));
    
        // Calculate cumulative probabilities
        let cumulative = 0;
        const cumulativeChances = normalizedChances.map(({ resource, probability }) => {
            cumulative += probability;
            return { resource, cumulative };
        });
    
        // Generate a random number between 0 and 1
        const randomNumber = Math.random();
    
        // Find the resource that matches the random number
        const minedResource = cumulativeChances.find(({ cumulative }) =>
            randomNumber <= cumulative
        ).resource;
    
        return minedResource;
    }
    
    
    // Mines and gathers value of resources mined
    calculateValue() {
        const gatheredResource = this.determineResource();
        
        // If resource is present on current planet
        if (this.resources.includes(gatheredResource)) {
            
            if (gatheredResource == "water") { this.value = this.value + 0.1; }
            else if (gatheredResource == "sulfur") { this.value = this.value + 0.15; }
            else if (gatheredResource == "petroleum") { this.value = this.value + 0.3; }
            else if (gatheredResource == "coal") { this.value = this.value + 0.45; }
            else if (gatheredResource == "methane") { this.value = this.value + 0.8; }
            else if (gatheredResource == "oxygen") { this.value = this.value + 1.3; }
            else if (gatheredResource == "iron") { this.value = this.value + 2; }
            else if (gatheredResource == "aluminum") { this.value = this.value + 4; }
            else if (gatheredResource == "copper") { this.value = this.value + 8; }
            else if (gatheredResource == "lead") { this.value = this.value + 15; }
            else if (gatheredResource == "hydrogen") { this.value = this.value + 25; }
            else if (gatheredResource == "lithium") { this.value = this.value + 45; }
            else if (gatheredResource == "titanium") { this.value = this.value +70; }
            else if (gatheredResource == "gold") { this.value = this.value + 100; }
            else if (gatheredResource == "uranium") { this.value = this.value + 180; }
            else if (gatheredResource == "diamonds") { this.value = this.value + 270; }
            else if (gatheredResource == "ice7") { this.value = this.value + 400; }
            else if (gatheredResource == "deuterium") { this.value = this.value + 750; }
            else if (gatheredResource == "tungsten") { this.value = this.value + 1200; }
            else if (gatheredResource == "neodymium") { this.value = this.value + 2100; }
            else if (gatheredResource == "osmium") { this.value = this.value + 4500; }
            else if (gatheredResource == "rhodium") { this.value = this.value + 18000; }
            else if (gatheredResource == "plutonium") { this.value = this.value + 54000; }
            else if (gatheredResource == "tritium") { this.value = this.value + 324000; }
            else if (gatheredResource == "antimatter") { this.value = this.value + 2700000; }
            
            // Calculates mass of current ore mine batch
            this.mass = this.mass + 1;
        }
    }
    
    mineResources() {
        for (let i = 0; i < 100; i++) {
            this.calculateValue();
        }
    }
    
    // Gets current ore batch value and mass
    getMass() {
        return this.mass;
    }
    
    getValue() {
        return this.value;
    }
    
    resetResources() {
        this.mass = 0.0;
        this.value = 0.0;
    }

}
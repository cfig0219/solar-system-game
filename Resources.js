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
    }
    
    // Obtain's the current planet's name
    setPlanet(planet) {
        if (planet != null) {
            this.currentPlanet = planet.getName();
        }
    }
    
    
    // Determines what resources current planet has
    getResources(){
        const planetName = this.currentPlanet;
        
        if (planetName == "luna") { this.resources = ["iron", "aluminum", "copper", "gold"]; }
        else if (planetName == "earth") { this.resources = ["water", "coal", "iron", "petroleum", "oxygen", "lead", "uranium", "diamonds"]; }
        else if (planetName == "sol") { this.resources = ["antimatter"]; }
        
        // Default resources if planet name is not found
        else { this.resources = ["water", "oxygen", "iron", "aluminum"]; }
        console.log(this.resources);
    }
}

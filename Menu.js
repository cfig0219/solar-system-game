export class Menu {
    /**
     * Initializes the Base class
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(scene, camera) {
        this.scene = scene;
        
        // Tracks current player state
        this.playerState = "flying";
    }
    
    // Function determines the current state of the player
    determineMenu(player) {
        this.playerState = player.getState();
        console.log(this.playerState);
    }
}
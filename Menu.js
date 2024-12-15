export class Menu {
    /**
     * Initializes the Menu class
     */
    constructor() {
        // Tracks current player state
        this.playerState = "flying";
    }

    // Function determines the current state of the player
    determineMenu(player) {
        this.playerState = player.getState();

        if (this.playerState == "docked") {
            this.dockMenu(player);
        } else if (this.playerState == "dead") {
            this.deathMenu(player);
        } else {
            //console.log("flying");
        }
    }

    // Menu that appears when player is near base
    dockMenu(player) {
        // Create a semi-transparent overlay for the dock menu
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.2)"; // Dark transparent background
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "1000";
    
        // Create the "Dock" button
        const dockButton = document.createElement("button");
        dockButton.textContent = "Dock";
        dockButton.style.margin = "10px";
        dockButton.style.padding = "10px 20px";
        dockButton.style.fontSize = "18px";
        dockButton.style.fontFamily = "Arial, sans-serif";
        dockButton.onclick = () => {
            // Logic to dock the player
            console.log("Docking player...");
            document.body.removeChild(overlay);
            clearInterval(velocityLock);
        };
    
        // Create the "Main Menu" button
        const mainMenuButton = document.createElement("button");
        mainMenuButton.textContent = "Main Menu";
        mainMenuButton.style.margin = "10px";
        mainMenuButton.style.padding = "10px 20px";
        mainMenuButton.style.fontSize = "18px";
        mainMenuButton.style.fontFamily = "Arial, sans-serif";
        mainMenuButton.onclick = () => {
            // Logic to return to the main menu
            console.log("Returning to main menu...");
            document.body.removeChild(overlay);
            clearInterval(velocityLock);
        };
    
        // Append buttons to the overlay
        overlay.appendChild(dockButton);
        overlay.appendChild(mainMenuButton);
    
        // Append overlay to the body
        document.body.appendChild(overlay);
    
        // Continuously lock the player's velocity
        const velocityLock = setInterval(() => {
            if (player && typeof player.setVelocity === "function") {
                player.zeroVelocity();
            }
        }, 100); // Reapply every 100ms
    }


    // Menu that appears when player dies
    deathMenu(player) {
        // Create a semi-transparent red overlay
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "1000";
    
        // Create the message
        const message = document.createElement("p");
        message.textContent = "Spacecraft has collided with a celestial body!";
        message.style.color = "white";
        message.style.fontSize = "24px";
        message.style.marginBottom = "20px";
        message.style.fontFamily = "Arial, sans-serif";
    
        // Create the "Respawn" button
        const respawnButton = document.createElement("button");
        respawnButton.textContent = "Respawn";
        respawnButton.style.margin = "10px";
        respawnButton.style.padding = "10px 20px";
        respawnButton.style.fontSize = "18px";
        respawnButton.style.fontFamily = "Arial, sans-serif";
        respawnButton.onclick = () => {
            // Logic to respawn the player
            console.log("Respawning player...");
            document.body.removeChild(overlay);
            clearInterval(velocityLock);
        };
    
        // Create the "Main Menu" button
        const mainMenuButton = document.createElement("button");
        mainMenuButton.textContent = "Main Menu";
        mainMenuButton.style.margin = "10px";
        mainMenuButton.style.padding = "10px 20px";
        mainMenuButton.style.fontSize = "18px";
        mainMenuButton.style.fontFamily = "Arial, sans-serif";
        mainMenuButton.onclick = () => {
            // Logic to return to the main menu
            console.log("Returning to main menu...");
            document.body.removeChild(overlay);
            clearInterval(velocityLock);
        };
    
        // Append elements to the overlay
        overlay.appendChild(message);
        overlay.appendChild(respawnButton);
        overlay.appendChild(mainMenuButton);
    
        // Append overlay to the body
        document.body.appendChild(overlay);
    
        // Continuously lock the player's velocity
        const velocityLock = setInterval(() => {
            if (player && typeof player.setVelocity === "function") {
                player.zeroVelocity();
            }
        }, 100); // Reapply every 100ms
    }

    // Menu that allows save of current game
    saveMenu() {
        //console.log("save menu");
    }
    
}
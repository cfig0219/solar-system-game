export class Buttons {
    /**
     * Initializes the Base class
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(scene, camera) {
        this.scene = scene;
        this.setButtons();
        
        // Variable to determine the current button pressed
        this.buttonPressed = "none";
    }
    
    
    // Initializes buttons
    setButtons() {
        // Left side buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.style.position = "absolute";
        buttonContainer.style.bottom = "20%";
        buttonContainer.style.left = "10%";
        buttonContainer.style.display = "flex";
        buttonContainer.style.flexDirection = "column";
        document.body.appendChild(buttonContainer);
        
        // X and Y offsets for positioning buttons
        const buttonOffsets = [
            { x: 0, y: 0 },  // Top button
            { x: 0, y: 80 },  // Bottom button
            { x: -70, y: -50 }, // Left button
            { x: 70, y: -110 },  // Right button
        ];
        
        // Button displays
        const buttonTexts = ["^", "v", "<", ">"]; // Unique button identifiers
    
        for (let i = 0; i < 4; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts[i];
            button.style.width = "60px";
            button.style.height = "60px";
            button.style.backgroundColor = "#008000";
            button.style.transform = `translate(${buttonOffsets[i].x}px, ${buttonOffsets[i].y}px)`;
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            button.style.zIndex = "1";
            
            // Set buttonPressed on mouse down and reset on mouse up
            button.addEventListener("mousedown", () => {
                this.buttonPressed = button.innerText; // Set the pressed button's name
            });
            button.addEventListener("mouseup", () => {
                this.buttonPressed = "none"; // Reset to "none" when released
            });

            // Handle mouse leaving the button while pressed
            button.addEventListener("mouseleave", () => {
                this.buttonPressed = "none"; // Reset to "none" if mouse leaves
            });
            
            // Add touch support
            button.addEventListener("touchstart", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = button.innerText; // Set the pressed button's name
            });
            button.addEventListener("touchend", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = "none"; // Reset to "none" when released
            });
            button.addEventListener("touchcancel", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = "none"; // Reset to "none" if touch is canceled
            });
            
            buttonContainer.appendChild(button);
        }
        
        // Right side buttons
        const buttonContainer2 = document.createElement("div");
        buttonContainer2.style.position = "absolute";
        buttonContainer2.style.bottom = "25%";
        buttonContainer2.style.right = "5%";
        buttonContainer2.style.display = "flex";
        buttonContainer2.style.gap = "10px";
        buttonContainer2.style.flexDirection = "column";
        document.body.appendChild(buttonContainer2);
        
        const buttonTexts2 = ["up", "rcs", "down"];
        
        for (let i = 0; i < 3; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts2[i];
            button.style.width = "60px";
            button.style.height = "60px";
            button.style.backgroundColor = "#008000";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            button.style.zIndex = "1";
            
            // Set buttonPressed on mouse down and reset on mouse up
            button.addEventListener("mousedown", () => {
                this.buttonPressed = button.innerText; // Set the pressed button's name
            });
            button.addEventListener("mouseup", () => {
                this.buttonPressed = "none"; // Reset to "none" when released
            });

            // Handle mouse leaving the button while pressed
            button.addEventListener("mouseleave", () => {
                this.buttonPressed = "none"; // Reset to "none" if mouse leaves
            });
            
            // Add touch support
            button.addEventListener("touchstart", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = button.innerText; // Set the pressed button's name
            });
            button.addEventListener("touchend", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = "none"; // Reset to "none" when released
            });
            button.addEventListener("touchcancel", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = "none"; // Reset to "none" if touch is canceled
            });
            
            buttonContainer2.appendChild(button);
        }
        
        // Bottom buttons
        const buttonContainer3 = document.createElement("div");
        buttonContainer3.style.position = "absolute";
        buttonContainer3.style.bottom = "5%";
        buttonContainer3.style.left = "35%";
        buttonContainer3.style.display = "flex";
        buttonContainer3.style.gap = "30px";
        document.body.appendChild(buttonContainer3);
        
        const buttonTexts3 = ["drill", "warp"];
        
        for (let i = 0; i < 2; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts3[i];
            button.style.width = "120px";
            button.style.height = "60px";
            button.style.backgroundColor = "#008000";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            button.style.zIndex = "1";
            
            // Set buttonPressed on mouse down and reset on mouse up
            button.addEventListener("mousedown", () => {
                this.buttonPressed = button.innerText; // Set the pressed button's name
            });
            button.addEventListener("mouseup", () => {
                this.buttonPressed = "none"; // Reset to "none" when released
            });

            // Handle mouse leaving the button while pressed
            button.addEventListener("mouseleave", () => {
                this.buttonPressed = "none"; // Reset to "none" if mouse leaves
            });
            
            // Add touch support
            button.addEventListener("touchstart", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = button.innerText; // Set the pressed button's name
            });
            button.addEventListener("touchend", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = "none"; // Reset to "none" when released
            });
            button.addEventListener("touchcancel", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = "none"; // Reset to "none" if touch is canceled
            });
            
            buttonContainer3.appendChild(button);
        }
        
        // Top buttons
        const buttonContainer4 = document.createElement("div");
        buttonContainer4.style.position = "absolute";
        buttonContainer4.style.top = "5%";
        buttonContainer4.style.left = "35%";
        buttonContainer4.style.display = "flex";
        buttonContainer4.style.gap = "30px";
        document.body.appendChild(buttonContainer4);
        
        const buttonTexts4 = ["upgrade", "sell ore"];
        
        for (let i = 0; i < 2; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts4[i];
            button.style.width = "120px";
            button.style.height = "60px";
            button.style.backgroundColor = "#008000";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "14px";
            button.style.zIndex = "1";
            
            // Set buttonPressed on mouse down and reset on mouse up
            button.addEventListener("mousedown", () => {
                this.buttonPressed = button.innerText; // Set the pressed button's name
            });
            button.addEventListener("mouseup", () => {
                this.buttonPressed = "none"; // Reset to "none" when released
            });

            // Handle mouse leaving the button while pressed
            button.addEventListener("mouseleave", () => {
                this.buttonPressed = "none"; // Reset to "none" if mouse leaves
            });
            
            // Add touch support
            button.addEventListener("touchstart", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = button.innerText; // Set the pressed button's name
            });
            button.addEventListener("touchend", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = "none"; // Reset to "none" when released
            });
            button.addEventListener("touchcancel", (event) => {
                event.preventDefault(); // Prevent mouse event emulation
                this.buttonPressed = "none"; // Reset to "none" if touch is canceled
            });
            
            buttonContainer4.appendChild(button);
        }
    }
    
    
    // Gets current button pressed
    getButton() {
        return this.buttonPressed;
    }
	
}

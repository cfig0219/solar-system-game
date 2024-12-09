export class Buttons {
    /**
     * Initializes the Base class
     * @param {BABYLON.Scene} scene - The Babylon scene
     * @param {BABYLON.camera} camera - The camera to adjust render distance
     */
    constructor(scene, camera) {
        this.scene = scene;
        
        // Arrays to store all buttons
        this.buttons = [];
        this.buttons2 = [];
        this.buttons3 = [];
        this.buttons4 = [];
        
        // Variable to determine the current button pressed
        this.buttonPressed = "none";
        
        // Create buttons with a default color
        this.setButtons("#e67300");
    }
    
    
    // Initializes buttons
    setButtons(buttonColor) {
        // Left side buttons
        this.buttonContainer = document.createElement("div");
        this.buttonContainer.style.position = "absolute";
        this.buttonContainer.style.bottom = "20%";
        this.buttonContainer.style.left = "10%";
        this.buttonContainer.style.display = "flex";
        this.buttonContainer.style.flexDirection = "column";
        document.body.appendChild(this.buttonContainer);
        
        // X and Y offsets for positioning buttons
        const buttonOffsets = [
            { x: 0, y: 0 },  // Top button
            { x: 0, y: 57 },  // Bottom button
            { x: -45, y: -30 }, // Left button
            { x: 45, y: -70 },  // Right button
        ];
        
        // Button displays
        const buttonTexts = ["^", "v", "<", ">"]; // Unique button identifiers
    
        for (let i = 0; i < 4; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts[i];
            button.style.width = "40px";
            button.style.height = "40px";
            button.style.backgroundColor = buttonColor;
            button.style.transform = `translate(${buttonOffsets[i].x}px, ${buttonOffsets[i].y}px)`;
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "12px";
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
            
            this.buttonContainer.appendChild(button);
            this.buttons.push(button); // Store reference to the button
        }
        
        // Right side buttons
        this.buttonContainer2 = document.createElement("div");
        this.buttonContainer2.style.position = "absolute";
        this.buttonContainer2.style.bottom = "25%";
        this.buttonContainer2.style.right = "5%";
        this.buttonContainer2.style.display = "flex";
        this.buttonContainer2.style.gap = "15px";
        this.buttonContainer2.style.flexDirection = "column";
        document.body.appendChild(this.buttonContainer2);
        
        const buttonTexts2 = ["up", "rcs", "down"];
        
        for (let i = 0; i < 3; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts2[i];
            button.style.width = "40px";
            button.style.height = "40px";
            button.style.backgroundColor = buttonColor;
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "12px";
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
            
            this.buttonContainer2.appendChild(button);
            this.buttons2.push(button); // Store reference to the button
        }
        
        // Bottom buttons
        this.buttonContainer3 = document.createElement("div");
        this.buttonContainer3.style.position = "absolute";
        this.buttonContainer3.style.bottom = "5%";
        this.buttonContainer3.style.left = "40%";
        this.buttonContainer3.style.display = "flex";
        this.buttonContainer3.style.gap = "30px";
        document.body.appendChild(this.buttonContainer3);
        
        const buttonTexts3 = ["drill", "warp"];
        
        for (let i = 0; i < 2; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts3[i];
            button.style.width = "80px";
            button.style.height = "40px";
            button.style.backgroundColor = buttonColor;
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "12px";
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
            
            this.buttonContainer3.appendChild(button);
            this.buttons3.push(button); // Store reference to the button
        }
        
        // Top buttons
        this.buttonContainer4 = document.createElement("div");
        this.buttonContainer4.style.position = "absolute";
        this.buttonContainer4.style.top = "5%";
        this.buttonContainer4.style.left = "40%";
        this.buttonContainer4.style.display = "flex";
        this.buttonContainer4.style.gap = "30px";
        document.body.appendChild(this.buttonContainer4);
        
        const buttonTexts4 = ["upgrade", "sell ore"];
        
        for (let i = 0; i < 2; i++) {
            const button = document.createElement("button");
            button.innerText = buttonTexts4[i];
            button.style.width = "80px";
            button.style.height = "40px";
            button.style.backgroundColor = buttonColor;
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "Arial, sans-serif";
            button.style.fontSize = "12px";
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
            
            this.buttonContainer4.appendChild(button);
            this.buttons4.push(button); // Store reference to the button
        }
    }
    
    
    // Gets current button pressed
    getButton() {
        return this.buttonPressed;
    }
    
    // Changes button color
    setColor(newColor) {
        // Update colors for all buttons in each array
        this.buttons.forEach((button) => (button.style.backgroundColor = newColor));
        this.buttons2.forEach((button) => (button.style.backgroundColor = newColor));
        this.buttons3.forEach((button) => (button.style.backgroundColor = newColor));
        this.buttons4.forEach((button) => (button.style.backgroundColor = newColor));
    }
    
    // Determines color based on tier
    determineColor(tier) {
        if (tier == "chemical") { this.setColor("#e67300"); }
        else if (tier == "nuclear") { this.setColor("#ff3385"); }
        else if (tier == "fusion") { this.setColor("#1a75ff"); }
        else if (tier == "antimatter") { this.setColor("#33ccff"); }
        else if (tier == "warp") { this.setColor("#9999ff"); }
    }
	
}

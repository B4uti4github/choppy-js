// ChoppyJS - A simple JavaScript game abstraction script for 2D games

// Disclaimer: This is a basic framework for building 2D games using JavaScript and HTML5 Canvas.
// It provides scene management and layer drawing capabilities.
// You can extend it further based on your game requirements.
// But, This is an simple script for game making; consider security implications of using eval() and remember to be careful when copying scripts from untrusted sites; they could install malware without your knowledge.

// Tips: 
//  1. Use eval() to run scene scripts and layer drawing code.
//  2. Each scene can have multiple layers (1, 2, 3) for drawing order.
//  3. Use setScene(index) to switch between scenes, and use sceneCreate(evalScene, name) for creating scenes.
//  4. Use deltaTime for frame-independent movement.
//  5. Access the current scene with 'escenaActual' in eval scripts.
//  6. Each layers of the current scene is a string to be evaled and runnned in order.
//  7. This is a basic framework, extend it as needed for your game with "this." + some var name for states.
//  8. Remember to handle user input and game states within the eval scripts.
//  9. Enjoy building your 2D games with ChoppyJS!

class Choppy {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.scenes = [];
        this.currentScene = 0;
        this.lastTime = 0;
    }

    sceneCreate(evalScene, name) {
        // Save the scene like an object
        this.scenes.push({ script: evalScene, name: name, layers: {
            1: "",
            2: "",
            3: "",
        } });
    }

    // Método para cambiar de escena (interrumpir la actual)
    setScene(index) {
        if (index >= 0 && index < this.scenes.length) {
            this.currentScene = index;
        }
    }

    play() {
        const loop = (timestamp) => {
            this.deltaTime = timestamp - this.lastTime;
            this.lastTime = timestamp;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Use this in the eval scripts to access the current scene
            const escenaActual = this.scenes[this.currentScene];

            // 1. Run Logic from the current scene
            eval(escenaActual.script);

            // 2. Draw Layers in order
            Object.keys(escenaActual.layers).sort().forEach(z => {
                eval(escenaActual.layers[z]);
            });

            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

}

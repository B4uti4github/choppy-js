// ChoppyJS - A simple JavaScript game abstraction script for 2D games

// Disclaimer: This is a basic framework for building 2D games using JavaScript and HTML5 Canvas.
// It provides scene management and layer drawing capabilities.
// You can extend it further based on your game requirements.
// But, This is an simple script for game making.

// Tips: 

//  1. Use setScene(index) to switch between scenes, and use sceneCreate(evalScene, name) for creating scenes.
//  2. Use deltaTime for frame-independent movement.
//  3. Access the current scene with 'escenaActual' in eval scripts.
//  4. You can simulate layers like this
//
//  choppy.sceneCreate(function(scene, ctx, deltaTime) {
//    // Layer 1
//    ctx.fillStyle = 'green';
//    ctx.fillRect(0,0,200,100);
//
//    // Layer 2
//    ctx.fillStyle = 'white';
//    ctx.fillRect(0,0,50,50);
//
//  }, "Cave");
//
//  5. This is a basic framework, extend it as needed for your game with "this." + some var name for states.
//  6. Remember to handle user input and game states within the eval scripts.
//  7. Enjoy building your 2D games with ChoppyJS!

class Choppy {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.scenes = [];
        this.currentScene = 0;
        this.lastTime = 0;
    }

    sceneCreate(Scene, name) {
        // Save the scene like an object
        this.scenes.push({ script: Scene, name: name, layers: {
            1: () => {},
            2: () => {},
            3: () => {},
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
            var deltaTime = timestamp - this.lastTime;
            this.lastTime = timestamp;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Use this in the eval scripts to access the current scene
            const scene = this.scenes[this.currentScene];

            // 1. Run Logic from the current scene
            scene.script.call(this, scene, ctx, deltaTime);

            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

}

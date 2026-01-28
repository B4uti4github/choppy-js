// ChoppyJS - A simple JavaScript game abstraction script for 2D games

// Disclaimer: This is a basic framework for building 2D games using JavaScript and HTML5 Canvas.
// It provides scene management and layer drawing capabilities.
// You can extend it further based on your game requirements.
// But, This is an simple script for game making.

// Tips: 

//  1. Use setScene(index) to switch between scenes, and use sceneCreate(evalScene, name) for creating scenes.
//  2. Use deltaTime for frame-independent movement.
//  3. Access the current scene with 'scene' in scenes function scripts.
//  4. Use The other function called Init for initialize variables or states when the scene starts in the momento of create an scene.
//  5. You can simulate layers like this (without OnlyFrameMode and in 2d context):
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
//  6. This is a basic framework, extend it as needed for your game with "this." + some var name for states.
//  7. Remember to handle user input and game states within the eval scripts.
//  8. Enjoy building your 2D games with ChoppyJS!
//  9. For WebGL mode, consider using a framework like OpenFL for better handling within Enter_frame event and automatic clear for call the play wuth the OnlyFrameMode Argument.

class Choppy {
    constructor(canvasId, WebGLMode, framework_Used) {
        
        if(framework_Used){
            
        } else {
            const canvas = document.getElementById(canvasId);
            this.WebGLMode = WebGLMode ?? false;
            if (!this.WebGLMode) {
                this.ctx = canvas.getContext('2d');
            } else {
                this.ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            }
        }
        this.framework_Used = framework_Used || false;
        this.iteracionInitAScene = 0;
        this.scenes = [];
        this.currentScene = 0;
        this.lastTime = 0;
        this.animationId = null;
    }

    sceneCreate(Scene, name, init) {
        // Guardamos script, nombre e init (con fallback a función vacía)
        this.scenes.push({ 
            script: Scene, 
            name: name, 
            init: init || function() {} 
        });
    }

    setScene(index) {
        let sceneIndex = -1;
        if(typeof index === 'string') {
            sceneIndex = this.scenes.findIndex(scene => scene.name === index);
        } else if (typeof index === "number") {
            if (index >= 0 && index < this.scenes.length) sceneIndex = index;
        }

        if (sceneIndex !== -1) {
            this.currentScene = sceneIndex;
            this.iteracionInitAScene = 0; // Reset para disparar el nuevo init()
        }
    }

    play(onlyFrameMode) {
        this.lastTime = performance.now();
        const executeInit = () => {
            if(this.iteracionInitAScene === 0){
                const scenary = this.scenes[this.currentScene];
                if(scenary && scenary.init) scenary.init.call(window);
                this.iteracionInitAScene = 1;
            }
        };

        if (onlyFrameMode) {
            if(!this.framework_Used) return // Salir si no se usa un framework
            
            executeInit();
            
            if(!window.lastTime) window.lastTime = performance.now();
            const now = performance.now();
            window.delta = (now - window.lastTime) / 1000;
            if (window.delta > 0.1) window.delta = 0.016; 
            window.lastTime = now;
            
            const scene = this.scenes[this.currentScene];
            scene.script.call(window, scene, window.delta);

        } else { 
            if (!this.WebGLMode) { 
                if(!this.framework_Used){
                    executeInit();

                    const loop = (timestamp) => {
                        if (!this.frameworkUsed) {
                            this.ctx.reset(); 
                        }
                        this.ctx.reset();
                        if (!this.lastTime) this.lastTime = timestamp;
                        const deltaTime = timestamp - this.lastTime;
                        this.lastTime = timestamp;
            
                        const scene = this.scenes[this.currentScene];
                        scene.script.call(window, scene, this.ctx, deltaTime);
                        this.animationId = requestAnimationFrame(loop);
                    };

                    if (this.animationId) cancelAnimationFrame(this.animationId);
                    this.animationId = requestAnimationFrame(loop);
                }
            } else {
                console.error("WebGL Mode is not supported yet... use onlyFrameMode.");
            }
        }
    }
}

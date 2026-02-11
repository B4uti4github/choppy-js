/*
   ____ _                             ____     _           _ ____    ____    _ 
  / ___| |__   ___  _ __  _ __  _   _|___ \ __| |         | / ___|  |___ \  / |
 | |   | '_ \ / _ \| '_ \| '_ \| | | | __) / _` |_____ _  | \___ \    __) | | |
 | |___| | | | (_) | |_) | |_) | |_| |/ __/ (_| |_____| |_| |___) |  / __/ _| |
  \____|_| |_|\___/| .__/| .__/ \__, |_____\__,_|      \___/|____/  |_____(_)_|
                   |_|   |_|    |___/                                          
 An Scene and layer manager for games and demos in their 2.1 :D
*/

class ChScene {
    constructor(name, scene, init, end) {
        this.name = name;
        this.sceneScript = scene || function() {};
        this.initScript = init || function() {};
        this.endScript = end || function() {};
        
        this.i = 0;
        this.active = true; 
        this.clampPause = true;
    }

    step() {
        if (this.i === 0) {
            this.active = true;
            this.initScript.call(window, this); 
            this.i = 1;
        }
        if (this.active) {
            this.sceneScript.call(window, this);
        }
    }

    pause() { this.active = false; }
    run() { this.active = true; }
    
    reset() { 
        this.endScript.call(window, this);
        this.i = 0;
    }

    kill() { 
        this.endScript.call(window, this);
        this.active = false;
    }
}

class Choppy {
    constructor() {
        this.layers = []; 
        this.lastTime = 0;
    }

    addLayer(scene, name, init, end) {
        const newLayer = new ChScene(name, scene, init, end);
        this.layers.push(newLayer);
        return newLayer; 
    }

    removeLayer(name) {
        const idx = this.layers.findIndex(l => l.name === name);
        if (idx !== -1) {
            this.layers[idx].kill();
            this.layers.splice(idx, 1);
        }
    }

    get(name) {
        return this.layers.find(l => l.name === name);
    }

    changeLayer(name, newScene, newInit, newEnd) {
        let layer = this.get(name);
        if (layer) {
            layer.kill(); 
            
            layer.sceneScript = newScene || function() {};
            layer.initScript = newInit || function() {};
            layer.endScript = newEnd || function() {};

            layer.i = 0
        }
    }


    play() {
        const loop = (timestamp) => {
            if (!this.lastTime) this.lastTime = timestamp;
            const dt = (timestamp - this.lastTime) / 1000;
            this.lastTime = timestamp;

            window.deltaTime = dt;

            for (let i = 0; i <= this.layers.length - 1; i++) {
                const layer = this.layers[i];
                if (!layer) continue;

               
                if (layer.clampPause && layer.i !== 0) {
                    if (dt > 0.1) {
                        layer.active = false;
                    } else {
                        layer.active = true;
                    }
                }
                
                layer.step();
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}

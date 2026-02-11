/*
   ____ _   _  ___  ____  ______   ______     _           _ ____  
  / ___| | | |/ _ \|  _ \|  _ \ \ / /___ \ __| |         | / ___| 
 | |   | |_| | | | | |_) | |_) \ V /  __) / _` |_____ _  | \___ \ 
 | |___|  _  | |_| |  __/|  __/ | |  / __/ (_| |_____| |_| |___) |
  \____|_|_|_|\___/|_|   |_|    |_| |_____\__,_|      \___/|____/ 
 |___ \  / _ \                                                    
   __) || | | |                                                   
  / __/ | |_| |                                                   
 |_____(_)___/                                                    
                 
 An Scene and layer manager for games and demos in their 2.0 :D
*/

class ChScene {
    constructor(name, scene, init, end) {
        this.name = name;
        this.sceneScript = scene || function() {};
        this.initScript = init || function() {};
        this.endScript = end || function() {};
        
        this.i = 0;
        this.active = true; 
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
            // 1. Cerramos el ciclo de la lógica anterior
            layer.kill(); 
            
            // 2. Inyectamos el nuevo ADN (funciones)
            layer.sceneScript = newScene || function() {};
            layer.initScript = newInit || function() {};
            layer.endScript = newEnd || function() {};

            layer.i = 0
        }
    }


    play() {
        const loop = (timestamp) => {
            if (!this.lastTime) this.lastTime = timestamp;
            const dt = timestamp - this.lastTime;
            this.lastTime = timestamp;

            if (dt < 100) {
                window.deltaTime = dt / 1000;
                for (let i = 0; i < this.layers.length; i++) {
                    if (this.layers[i]) {
                        this.layers[i].step();
                    }
                }
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}

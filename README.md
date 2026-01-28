# 🌊 Choppy Engine v1.5
### The ultra-lightweight game orchestration layer for Canvas API.

> Choppy is not a heavy framework; it's a high-speed abstraction script for developers who love the Canvas API but hate managing scenes in visual engines, Z-orders, and game loops from scratch. It's designed for speed-running game development and rapid prototyping. (Recommended use the local version for not updating every time when choppy its updated in UNPKG)
## 🔥 Why Choppy?
* Pure Canvas API: If you know ctx.fillRect() and CanvasAPI, you already know Choppy (if you don't use other framework and it's not using WebGL).
* Zero Overhead: A single, tiny JS file. No dependencies. No bloat.
* Compatibility with other frameworks: Yes, You can use OpenFL and others frameworks.
* Scenes Managing: Very easy to make and change scenes :D.
* Semi-Recursive Flow: Change scenes and modify the engine state directly from within your scene scripts.

## What is new?
>The new here in version 1.5 is that we've added a quality-of-life improvement suggested by FuukoTaki: now you can set a scene using its name. We also added support for other frameworks and the init function. This function runs once when the scene is created to initialize variables, while the main loop handles the logic :DDD.
>>Note for WebGL/Frameworks: If you use OpenFL, set the third argument to true. If you use WebGL, set the second argument to true (recommended only with OnlyFrameMode).
Remeber that in Openfl or other frameworks with an system of charcaters, delete the global characters in the init of the next scene of that charcaters

## 🎨 Drawing Perspective: Layers & Performance
1. Simulating Layers (Z-Index)
In Choppy, the order of your code defines the layers. Elements drawn later appear on top of earlier ones.
Correct ✅ (Clean Layering):
```js
choppy.sceneCreate(function(scene, ctx, deltaTime) {
    // Layer 1: Background (Bottom)
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,200,100);

    // Layer 2: Entity (Top)
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,50,50);
}, "Cave");
```


2. Performance: Init vs Script
The init function is for setup. The script loop is for logic. Never initialize heavy variables or sprites inside the loop!
Correct ✅ (Optimized):
```js
choppy.sceneCreate(
    function(scene, ctx, delta) { 
        // Logic: Move things
        window.playerX += 10 * delta;
    }, 
    "Level1", 
    function() { 
        // Setup: Run once
        window.playerX = 0; 
    }
);
```
Incorrect ❌ (Memory Leak):
```js
choppy.sceneCreate(function(scene, ctx, delta) {
    window.playerX = 0; // ERROR: Resets every frame!
    window.sprite = new openfl.display.Sprite(); // ERROR: 60 objects per second!
}, "Level1");
```

🧩 Integration with OpenFL (Hybrid Mode)
For frameworks like OpenFL, Choppy acts as the Logic Brain. Remeber that in Openfl or other frameworks with an system of charcaters, delete the global characters in the init of the next scene of that charcaters
```js
var choppy = new Choppy("myCanvas", false, true); // framework_Used = true

choppy.sceneCreate(
    function(scene, ctx, delta) {
        window.player.x += 10 * delta; // Physics/Logic
    },
    "GameScene",
    function() {
        window.player = new openfl.display.Sprite(); // Visual Setup
        openfl.Lib.current.stage.addChild(window.player);
    }
);

// Call in OpenFL's ENTER_FRAME
openfl.Lib.current.stage.addEventListener("enterFrame", function(e) {
    choppy.play(true); // onlyFrameMode = true
});
```

## 🚀 Quick Start (Speed-run style)

1. Setup your HTML
```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<script src="choppy.js" alt="https://unpkg.com/choppy.js"></script>
```

2. Create your Game Logic
```html
<script>
var choppy = new Choppy("myCanvas");

// Scene 1: Cave
choppy.sceneCreate(function(scene, ctx, deltaTime) {
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,200,100);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,50,50);
}, "Cave");

// Scene 2: Dark Cave
choppy.sceneCreate(function(scene, ctx, deltaTime) {
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,200,100);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,50,50);
}, "DarkCave");

choppy.play(); // Launch the game loop

// Example: Switch scene after 2 seconds
setTimeout(() => {
    choppy.setScene("DarkCave");
}, 2000);
</script>
```

## 📜 Usage & Credits
Attribution
This project is licensed under the MIT License. You must keep the copyright notice. Please credit ChoppyJS in your project's README.md or Credits screen!
Example: "Built with ChoppyJS by B4uti4GD"

Made by me with a little help from AI 😉. Go build something fast!

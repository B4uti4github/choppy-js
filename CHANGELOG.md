# v1.5
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


# v1.2
- Quality of Life (Qol) fix with improved security
- Uploaded to unpkg/npm
- Removed layers then so if you wants layers, code in this style:

<hr>

    Correct ✅:
```js
// Scene 1: Green and white
choppy.sceneCreate(function(scene, ctx, deltaTime) {
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,200,100);


    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,50,50);
}, "Cave");
```
    Incorrect ❌: 
```js
// Scene 1: Green and white
choppy.sceneCreate(function(scene, ctx, deltaTime) {
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,200,100);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,50,50);
}, "Cave");
 ```
- Removed Examples for soon, TODO list of the examples in [this file](./examples/TODO)

# v1.1
- From EscenaActual to actualScene.
- Added examples, feel free to use these examples for your projects, more examples soon 😉.
- Added Changelog.
# v1.0
- First commit.
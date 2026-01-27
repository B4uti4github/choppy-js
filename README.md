# 🌊 Choppy Engine v1.2
**The ultra-lightweight game orchestration layer for Canvas API.**

Choppy is not a heavy framework; it's a high-speed abstraction script for developers who love the **Canvas API** but hate managing scenes in visual engines, Z-orders, and game loops from scratch. It's designed for **speed-running game development** and rapid prototyping.

---

## 🔥 Why Choppy?

*   **Pure Canvas API**: If you know `ctx.fillRect()` and CanvasAPI, you already know Choppy.
*   **Zero Overhead**: A single, tiny JS file. No dependencies. No bloat.
*   **Dynamic Scripting**: Use the power of string-based logic (`eval`) for instant prototyping.
*   **Semi-Recursive Flow**: Change scenes and modify the engine state directly from within your scene scripts.

---

## What is new?

The new here in version 1.2 is that we've added a quality-of-life improvement with enhanced security by removing everything from `eval()`, making it safer, which leads us to upload it to unpkg/npm. We removed Layers, then so if you wants layers, you need to code in this style:
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

## 🚀 Quick Start (Speed-run style)

### 1. Setup your HTML
1. In the body tag:
```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<script src="https://unpkg.com/choppy2d-js"></script>
```

2. Create your Game Logic
```html
<script>
    var choppy = new Choppy("myCanvas");

    // Scene 1: Green and white
    choppy.sceneCreate(function(scene, ctx, deltaTime) {

        ctx.fillStyle = 'green';
        ctx.fillRect(0,0,200,100);


        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,50,50);

    }, "Cave");
    // Scene 2: Green and black
    choppy.sceneCreate(function(scene, ctx, deltaTime) {

        ctx.fillStyle = 'green';
        ctx.fillRect(0,0,200,100);


        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,50,50);

    }, "Cave");

    choppy.play(); // Launch the game loop

    // Example of scene transition after 2 seconds
    setTimeout(() => {
        choppy.setScene(1);
    }, 2000);
</script>
```
💡 Important Tips 🔥
Scene Management: Choppy provides a lightweight display list. You can switch scenes instantly without memory leaks.
Extensibility: You can extend the Choppy class easily to add physics or sound systems.

## Usage & Credits

### 📜 Attribution
This project is licensed under the MIT License. This means you **must** keep the copyright notice in the code. Additionally, we highly recommend and appreciate it if you credit **ChoppyJS** in:
*   Your project's `README.md`.
*   Your game's "Credits" screen.
*   The "Tools Used" section of your game's page.

Example: "Built with ChoppyJS by B4uti4GD"

## Documentation:
Here has documentation of various examples for how use and feel free to use this examples in [this folder](./examples/)

Made by me with a little help from AI 😉. Go build something fast!

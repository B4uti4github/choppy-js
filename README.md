# 🌊 Choppy Engine v1.0
**The ultra-lightweight game orchestration layer for Canvas API.**

Choppy is not a heavy framework; it's a high-speed abstraction script for developers who love the **Canvas API** but hate managing scenes in visual engines, Z-orders, and game loops from scratch. It's designed for **speed-running game development** and rapid prototyping.

---

## 🔥 Why Choppy?

*   **Pure Canvas API**: If you know `ctx.fillRect()` and CanvasAPI, you already know Choppy.
*   **Zero Overhead**: A single, tiny JS file. No dependencies. No bloat.
*   **Dynamic Scripting**: Use the power of string-based logic (`eval`) for instant prototyping.
*   **Scene-Based Z-Order**: Each scene manages its own independent rendering layers (Background, Game, UI).
*   **Semi-Recursive Flow**: Change scenes and modify the engine state directly from within your scene scripts.

---

## 🚀 Quick Start (Speed-run style)

### 1. Setup your HTML
1. In the body tag:
```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<script src="choppy.js"></script>
```

2. Create your Game Logic
```html
<script>
    var choppy = new Choppy("myCanvas");

    // Scene 0: Forest
    choppy.sceneCreate(`
        // Define drawings once (or update them dynamically)
        escenaActual.layers[0] = "ctx.fillStyle = 'green'; ctx.fillRect(0,0,200,100);"; // Floor
        escenaActual.layers[2] = "ctx.fillStyle = 'white'; ctx.fillText('Level: Forest', 10, 20);"; // UI
    `, "Forest");

    // Scene 1: Cave
    choppy.sceneCreate(`
        escenaActual.layers[0] = "ctx.fillStyle = 'black'; ctx.fillRect(0,0,200,100);"; // Dark background
        escenaActual.layers[1] = "ctx.fillStyle = 'gray'; ctx.fillRect(50,50,20,20);";   // A rock
    `, "Cave");

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
Security Disclaimer: This script uses eval() for extreme flexibility and speed. Be careful when copying scripts from untrusted sites; malicious code could be hidden in strings. Always know what your eval strings are doing.

## Usage & Credits

### 📦 Local Installation Only
For security reasons (due to the use of `eval()`), **ChoppyJS must be hosted locally**. Do not link to this script via a CDN. Download the `choppy.js` file and include it directly in your project's ZIP or repository.

### 📜 Attribution
This project is licensed under the MIT License. This means you **must** keep the copyright notice in the code. Additionally, we highly recommend and appreciate it if you credit **ChoppyJS** in:
*   Your project's `README.md`.
*   Your game's "Credits" screen.
*   The "Tools Used" section of your game's page.

Example: "Built with ChoppyJS by B4uti4GD"


Made by me with a little help from AI 😉. Go build something fast!

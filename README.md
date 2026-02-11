# 🌊 Choppy2d-js v2.0
> **An Scene and Layer manager for games and demos.**

**Choppy2d-js** is a high-level logic orchestrator designed to manage scene complexity and multitasking through a robust **Layer System**. It is completely **framework-agnostic**, making it the perfect "Director" for any rendering engine.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **Multitasking Z-Stack** | Run multiple active layers simultaneously (Background, World, UI). |
| **Instance Encapsulation** | Every layer is a `ChScene` instance with its own private `this` context. |
| **Auto-Management** | Scenes can `pause()`, `run()`, `reset()`, or `kill()` themselves internally. |
| **Safe Time-Step** | Built-in protection against lag spikes (Time Clamping) to keep physics stable. |

---

## ✨ What's new in 2.0?

### Added
- **Layer Stacking:** Sequential execution of multiple active scenes (Z-Order).
- **Instance-Based Logic:** Scenes are now `ChScene` instances with private `this` context.
- **DNA Mutation (The "Blueprint" Trick):** 
  - You can define `new ChScene()` molds as "blueprints" and store them without adding them to the engine.
  - These blueprints consume zero CPU/Execution time until you decide to inject their scripts into a live layer.
- **Dynamic Hot-Swapping:** Use `changeLayer()` to swap the logic (Init, Scene, End) of a live layer using a blueprint's DNA.
- **Self-Management:** Built-in `pause()`, `run()`, `reset()`, and `kill()` for every layer.
- **DeltaTime Clamping:** Lag protection capped at 100ms.

### Changed
- **High-Level Orchestration:** Refactored from a simple drawing manager to a framework-agnostic logic orchestrator.
- **Execution Context:** Scripts run via `call(window, this)`, allowing professional OOP patterns and "Hot-Swapping" logic.

### Deprecated
- **Numeric Indexes:** Removed scene selection by number. Management is now strictly name-based and layer-oriented for professional scalability.

---

## 📦 OpenFL Integration (Example)
Choppy2d-js v2.0 works perfectly as a Logic Controller for OpenFL's rendering engine.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choppy2D v2.0 + OpenFL Demo</title>
    <!-- 1. OpenFL Library via CDN -->
    <script src="https://cdn.jsdelivr.net/npm/openfl@9.5.0/dist/openfl.min.js"></script>
    <!-- 2. Your Engine (choppy.js) -->
    <script src="choppy.js"></script>
    <style>
        body { margin: 0; overflow: hidden; background: #111; }
        canvas { display: block; margin: 0 auto; }
    </style>
</head>
<body>

<script>
    // --- OPENFL SETUP ---
    const stage = new openfl.display.Stage(800, 600, 0xFFFFFF);
    document.body.appendChild(stage.element);

    // --- CHOPPY 2.0 LOGIC ---
    const engine = new Choppy();

    // Player Layer
    engine.addLayer(
        function(self) { 
            if (this.sprite.x > 800) {
                this.sprite.x = -50;
            } else {
                this.sprite.x += 200 * deltaTime;
            }
            this.sprite.rotation += 2;
        }, 
        "Player", 
        function(self) { 
            this.sprite = new openfl.display.Sprite();
            this.sprite.graphics.beginFill(0x22AABB);
            this.sprite.graphics.drawRect(-25, -25, 50, 50);
            this.sprite.x = 100;
            this.sprite.y = 300;
            stage.addChild(this.sprite);
        },
        function(self) { 
            stage.removeChild(this.sprite);
        }
    );

    // Run Engine
    engine.play();

</script>
</body>
</html>
```
## 📜 License
This project is licensed under the MIT License. You are free to use, modify, and distribute it as long as the copyright notice in the source code remains intact.
Made with passion for the gamedev community with help of AI. Go build something fast! 🚀
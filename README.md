

# 🌊 Choppy2d-js v2.1
> **A Scene and Layer manager for games and demos.**

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
## 🛡️ Physics Integrity & Frame Skipping
Choppy2D-js v2.1 introduces **Self-Healing Logic**, a feature designed for high-precision games (Platformers, Rhythm games, etc.).

When a browser lag spike occurs, traditional engines often process a huge `deltaTime`, causing objects to clip through walls or bypass collision triggers. Choppy2D-js solves this with `clampPause`:

- **Automatic Suspension:** If a frame takes longer than 100ms, layers with `clampPause` enabled will temporarily suspend their `sceneScript`.
- **Zero Corruption:** This ensures that physics calculations never process "impossible" time jumps.
- **Network Ready:** You can disable `clampPause` for Network/Socket layers to maintain real-time synchronization with a server while keeping your local physics safe.

---

## ✨ What's new in 2.1?

### Added
- **Physics Integrity Shield (`clampPause`):** Implemented a per-layer safety mechanism that prevents logical corruption during extreme frame-rate fluctuations (Lag Spikes).
- **Self-Healing Loop:** The engine now automatically suspends execution of layers marked with `clampPause` if `deltaTime` exceeds 100ms, effectively preventing "tunnelling" or physics clipping.
- **State-Aware Initialization:** Added protection to ensure `initScript` execution is never bypassed by the clamping logic, maintaining object lifecycle consistency.

### Changed
- **Time Handling:** Transitioned from "Fixed Delta Clamping" to "Dynamic Frame Suspension". The engine now preserves real-time fidelity (`window.deltaTime`) while shielding sensitive logic layers.
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

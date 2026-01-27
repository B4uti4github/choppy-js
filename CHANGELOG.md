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
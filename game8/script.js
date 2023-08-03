import Player from './Player.js'
import InputHandler from './InputHandler.js';


/**@type {HTMLCanvasElement} */

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const inputHandler = new InputHandler();
    const player = new Player(canvas.width, canvas.height, inputHandler);
    let lastTime = 0, deltaTime;

    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        player.update(deltaTime);
        player.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
});
import { Game } from "./Game.js";

/**@type {HTMLCanvasElement} */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 500
    const CANVAS_HEIGHT = canvas.height = 800;
    let lastTime = 0;

    const game = new Game(ctx, canvas.width, canvas.height);

    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate(0);
});
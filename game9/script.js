import Player from './Player.js'
import InputHandler from './InputHandler.js'

/**@type {HTMLCanvasElement} */

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    let lastTime = 0, deltaTime;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.input = new InputHandler();
            this.player = new Player(this, this.input);
        }

        update(deltaTime) {
            this.player.update(deltaTime);
        }

        draw(ctx) {
            this.player.draw(ctx);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
});
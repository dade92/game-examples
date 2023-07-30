import Background from './Background.js';
import InputHandler from './InputHandler.js';
import Enemy from './Enemy.js';
import Player from './Player.js';

/**@type {HTMLCanvasElement} */

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    class Game {
        constructor(inputHandler, player, background, canvasWidth, canvasHeight) {
            this.enemies = [];
            this.score = 0;
            this.gameOver = false;
            this.inputHandler = inputHandler;
            this.player = player;
            this.background = background;
            this.canvasHeight = canvasHeight;
            this.canvasWidth = canvasWidth;
            this.timeSinceLastFrame = 0;
            this.randomEnemyInterval = 0;
        }

        handleEnemies(deltaTime) {
            this.timeSinceLastFrame += deltaTime;
            if(this.timeSinceLastFrame > 1000 + this.randomEnemyInterval) {
                this.enemies.push(new Enemy(canvas.width, canvas.height));
                this.randomEnemyInterval = Math.random() * 10000 ;
                this.timeSinceLastFrame = 0;
            }
            this.enemies.forEach((e) => {
                e.update(deltaTime, this);
                e.draw(ctx);
            })
            this.enemies = this.enemies.filter((e) => !e.toBeRemoved);
        }

        displayStatusText = (ctx) => {
            ctx.fillStyle = 'white';
            ctx.font = '40px Helvetica'
            ctx.fillText('Score ' + this.score, 20, 50);
            if(this.gameOver) {
                ctx.textAlign = 'center';
                ctx.fillStyle = 'white';
                ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
            }
        }

        update(deltaTime) {
            background.update(deltaTime);
            player.update(deltaTime, this.inputHandler, this.enemies, this);
        }

        draw(ctx) {
            background.draw(ctx);
            player.draw(ctx);
        }
    }

    const inputHandler = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height, 3);
    const game = new Game(inputHandler, player, background);

    let deltaTime, lastTime = 0;
    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        game.update(deltaTime);
        game.draw(ctx);
        game.handleEnemies(deltaTime);
        game.displayStatusText(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});
import Player from './Player.js'
import InputHandler from './InputHandler.js'
import { Background } from './Background.js'
import { WalkingZombie } from './Enemy.js';

/**@type {HTMLCanvasElement} */

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 600;
    let lastTime = 0, deltaTime;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.input = new InputHandler();
            this.player = new Player(this, this.input);
            this.backgrounds = [
                new Background('layer-1.png', 1660, 600, 0.2),
                new Background('layer-2.png', 1660, 600, 0.2),
                new Background('layer-3.png', 1660, 600, 0.2),
                new Background('layer-4.png', 1660, 600, 0.4),
                new Background('layer-5.png', 1660, 600, 0),
            ];
            this.maxEnemyTime = 20000;
            this.minEnemyTime = 2000;
            this.enemyTime = Math.random() * this.maxEnemyTime + this.minEnemyTime;
            this.timeSinceLastEnemy = 0;
            this.enemies = [];
        }

        update(deltaTime) {
            this.timeSinceLastEnemy += deltaTime;
            if(this.timeSinceLastEnemy > this.enemyTime) {
                this.enemies.push(new WalkingZombie(this));
                this.timeSinceLastEnemy = 0;
                this.enemyTime = Math.random() * this.maxEnemyTime + this.minEnemyTime;;
            }
            this.player.update(deltaTime);
            this.backgrounds.forEach((b, index) => {
                b.update((this.player.speed / 10) * index);
            });
            this.enemies.forEach((e) => {
                e.update(deltaTime);
            });
            this.enemies = this.enemies.filter(e => !e.toBeRemoved);
        }

        draw(ctx) {
            this.backgrounds.forEach((b) => {
                b.draw(ctx)
            });
            this.enemies.forEach((e) => {
                e.draw(ctx);
            })
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
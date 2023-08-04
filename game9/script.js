import Player from './Player.js'
import InputHandler from './InputHandler.js'
import { Backgrounds } from './Background.js'
import { WalkingZombie, Mosquito, Plant } from './Enemy.js';

/**@type {HTMLCanvasElement} */

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;
    let lastTime = 0, deltaTime;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.input = new InputHandler();
            this.player = new Player(this, this.input);
            this.backgrounds = new Backgrounds(this, this.player);
            this.maxEnemyTime = 3000;
            this.minEnemyTime = 500;
            this.enemyTime = Math.random() * this.maxEnemyTime + this.minEnemyTime;
            this.timeSinceLastEnemy = 0;
            this.enemies = [];
            this.enemyFactory = [
                () => new WalkingZombie(this),
                () => new Mosquito(this),
                () => new Plant(this),
            ]
            this.speed = 0;
        }

        update(deltaTime) {
            // Updates the backgrounds
            this.backgrounds.update();

            // Enemy adding logic
            this.timeSinceLastEnemy += deltaTime;
            if(this.timeSinceLastEnemy > this.enemyTime) {
                this.addEnemy();
            }

            // Updates player and enemies. Collision detection too
            this.player.update(deltaTime);
            this.enemies.forEach((e) => {
                e.update(deltaTime);
            });

            this.enemies = this.enemies.filter(e => !e.toBeRemoved);
        }

        draw(ctx) {
            this.backgrounds.draw(ctx);
            this.enemies.forEach((e) => {
                e.draw(ctx);
            })
            this.player.draw(ctx);
        }

        addEnemy() {
            if(this.speed > 0) {
                this.enemies.push(this.enemyFactory[Math.floor(Math.random() * 3)]());
                this.timeSinceLastEnemy = 0;
                this.enemyTime = Math.random() * this.maxEnemyTime + this.minEnemyTime;
                console.log(this.enemies);
            }
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
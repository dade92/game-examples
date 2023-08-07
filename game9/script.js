import Player from './Player.js'
import { InputHandler } from './InputHandler.js'
import { Background } from './Background.js'
import { WalkingZombie, Mosquito, Plant } from './Enemy.js';
import { UI } from './UI.js'
import { Block } from './Block.js'

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
            
            this.input = new InputHandler(this);
            this.player = new Player(this, this.input);
            this.UI = new UI(this);

            this.background = new Background(this, this.player);
            this.maxEnemyTime = 3000;
            this.minEnemyTime = 300;
            this.enemyTime = Math.random() * this.maxEnemyTime + this.minEnemyTime;
            this.timeSinceLastEnemy = 0;
            this.enemies = [];
            this.explosions = [];
            this.enemyFactory = [
                () => new WalkingZombie(this),
                () => new Mosquito(this),
                () => new Plant(this),
            ];
            this.particles = [];
            this.blocks = [
                new Block(300, 200, 30, 30, this),
                new Block(330, 200, 30, 30, this),
                new Block(360, 200, 30, 30, this),
            ];
            this.speed = 0;
            this.debug = false;
            this.lives = new Image();
            this.lives.src = 'heart.png';
            this.gameOver = false;
            this.score = 0;
        }

        update(deltaTime) {
            // Updates the background
            this.background.update();

            // Enemy adding logic
            this.timeSinceLastEnemy += deltaTime;
            if(this.timeSinceLastEnemy > this.enemyTime) {
                this.addEnemy();
            }

            //TODO implement blocks collision using distance between squares
            // Updates player and enemies. Collision detection too
            this.player.update(deltaTime);
            this.enemies.forEach((e) => {
                e.update(deltaTime);
            });
            this.explosions.forEach((ex) => {
                ex.update(deltaTime);
            });
            this.particles.forEach((p, index) => {
                p.update();
                if(p.toBeRemoved) {
                    this.particles.splice(index, 1);
                }
            });
            this.enemies = this.enemies.filter(e => !e.toBeRemoved);
            this.blocks.forEach((b) => {
                b.update();
            })
            if(this.player.lives <= 0) {
                this.gameOver = true;
            }
        }

        draw(ctx) {
            this.background.draw(ctx);
            this.enemies.forEach((e) => {
                e.draw(ctx);
            });
            this.player.draw(ctx);
            this.explosions.forEach((ex) => {
                ex.draw(ctx);
            });
            this.blocks.forEach((b) => {
                b.draw(ctx);
            })
            this.particles.forEach((p) => {
                p.draw(ctx);
            });
            this.UI.draw(ctx);
        }

        addEnemy() {
            if(this.speed > 0) {
                this.enemies.push(this.enemyFactory[Math.floor(Math.random() * 3)]());
                this.timeSinceLastEnemy = 0;
                this.enemyTime = Math.random() * this.maxEnemyTime + this.minEnemyTime;
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
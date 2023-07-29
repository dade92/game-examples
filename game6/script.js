/**@type {HTMLCanvasElement} */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 500
    const CANVAS_HEIGHT = canvas.height = 800;
    let lastTime = 0;

    class Game {
        constructor(ctx, width, height) {
            this.enemies = [];
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.timeSinceLastUpdate = 0;
            this.enemyInterval = 1000;
            this.enemyType = ['worm', 'ghost', 'spider'];
        }

        update(deltaTime) {
            this.timeSinceLastUpdate += deltaTime;
            if(this.timeSinceLastUpdate > this.enemyInterval) {
                this.#addNewEnemy();
                this.timeSinceLastUpdate = 0;
            }
            this.enemies.forEach((e) => {
                e.update(deltaTime);
            });
            this.enemies = this.enemies.filter((e) => !e.toBeRemoved);
        }

        draw() {
            this.enemies.forEach((e) => {
                e.draw(this.ctx);
            });
        }

        #addNewEnemy() {
            const typeNumber = Math.floor(Math.random()* 3 % 3);
            if(this.enemyType[typeNumber] === 'worm') {
                this.enemies.push(new Worm(this));
            } else if(this.enemyType[typeNumber] === 'ghost') {
                this.enemies.push(new Ghost(this));
            } else {
                this.enemies.push(new Spider(this));
            }
        }
    }

    class Enemy {
        constructor(game, spriteWidth, spriteHeight, imageSrc, frameMax, speed) {
            this.game = game;   // I'm not convinced of this composition
            this.toBeRemoved = false;
            this.frame = 0;
            this.timeSinceLastUpdate = 0;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            //TODO set speed for every enemy
            this.speed = speed;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;
            this.width = this.spriteWidth / 2;
            this.height = this.spriteHeight / 2;
            this.image = new Image();
            this.image.src = imageSrc;
            this.frameMax = frameMax;
        }

        update(deltaTime) {
            if(this.x < 0 - game.width || this.y < 0 - game.height) {
                this.toBeRemoved = true;
            }
            this.timeSinceLastUpdate += deltaTime;
            if(this.timeSinceLastUpdate > 40) {
                this.frame = (this.frame +1) % this.frameMax;
                this.timeSinceLastUpdate = 0;
            }
            //collision detection here
        }

        draw(ctx) {
            ctx.drawImage(
                this.image, 
                this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
                this.x, this.y, this.width, this.height
            );
        }
    }

    class Spider extends Enemy {
        constructor(game) {
            super(game, 310, 175, 'spider.png', 5, Math.random() * 0.3 + 0.2);
            this.y = 0 - this.game.height;
            this.x = Math.random() * (this.game.width - this.width);
            this.maxExtension = Math.random() * this.game.height;
        }

        update(deltaTime) {
            super.update(deltaTime);
            this.y += this.speed * deltaTime;
            if(this.y > this.maxExtension) {
                this.speed *= (-1);
            }
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, 0);
            ctx.lineTo(this.x + this.width / 2, this.y + 10);
            ctx.stroke();
            super.draw(ctx);

        }
    }

    class Worm extends Enemy {
        constructor(game) {
            super(game, 229, 171, 'worm.png', 5, Math.random() * 0.3 + 0.1);
            this.y = this.game.height - this.height;
        }

        update(deltaTime) {
            super.update(deltaTime);
            this.x-= this.speed * deltaTime;
        }
    }

    class Ghost extends Enemy {
        constructor(game) {
            super(game, 261, 209, 'ghost.png', 5, Math.random() * 0.3 + 0.3);
            this.y = Math.random() * this.game.height * 0.8;
            this.angle = 0;
        }

        update(deltaTime) {
            super.update(deltaTime);
            this.x -= this.speed * deltaTime;
            this.y +=  2 * Math.sin(this.angle * 0.3);
            this.angle++;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = 0.7;
            super.draw(ctx);
            ctx.restore();
        }
    }

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
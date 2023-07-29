/**@type {HTMLCanvasElement} */

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;
    let enemies = [];
    let score = 0;
    let gameOver = false;

    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', (e) => {
                console.log(e);
                if((e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowRight' || 
                    e.key === 'ArrowLeft' ||
                    e.key === ' ') && 
                    this.keys.indexOf(e.key) === -1) {
                        this.keys.push(e.key);
                }
                console.log(this.keys);
            });
            window.addEventListener('keyup', (e) => {
                if(e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowRight' || 
                    e.key === 'ArrowLeft'||
                    e.key === ' ') {
                        this.keys.splice(this.keys.indexOf(e.key), 1);
                }
                console.log(this.keys);
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.width = this.spriteWidth / 2;
            this.height = this.spriteHeight / 2;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.frame = 0;
            this.frameY = 0;
            this.speed = 0;
            this.speedY = 0;
            this.weight = 1;
            this.timeSinceLastFrame = 0;
            this.numOfFrames = 9;
            this.frameInterval = 1000 / 20;
        }

        update(deltaTime, inputHandler, enemies) {
            // collision detection
            enemies.forEach((e) => {
                const dx = (e.x + e.width /2) - (this.x + this.width / 2);
                const dy = (e.y + e.height / 2) - (this.y + this.height / 2);
                const distance = Math.sqrt(dx*dx + dy*dy);
                if(distance < e.width / 2 + this.width / 2) {
                    gameOver = true;
                }
            });
            this.timeSinceLastFrame += deltaTime;
            // vertical speed
            this.y += this.speedY;
            if(!this.onTheGround()) {
                this.speedY += this.weight;
                this.frameY = 1;
                this.numOfFrames = 7;
            } else {
                this.speedY = 0;
                this.frameY = 0;
                this.numOfFrames = 9;
            }
            // horizontal speed
            this.x+= this.speed;
            if(this.x > this.gameWidth - this.width) {
                this.x = this.gameWidth- this.width;
            }
            if(inputHandler.keys.indexOf('ArrowRight') > -1 ) {
                this.speed = 5;
            } else if(inputHandler.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else if(inputHandler.keys.indexOf('ArrowUp') > -1 && this.onTheGround()) {
                this.speedY -= 22;
            } else if(inputHandler.keys.indexOf(' ') > -1){
                this.speed = 10;
                this.frameY = 2;
                this.numOfFrames = 6;
            }
            else {
                this.speed = 0;
            }

            if(this.x < 0) {
                this.x = 0;
            }
            // sprite animation
            if(this.timeSinceLastFrame > this.frameInterval) {
                this.frame = (this.frame + 1) % this.numOfFrames;
                this.timeSinceLastFrame = 0;
            }
        }

        onTheGround() {
            return this.y >= this.gameHeight - this.height;
        }

        draw(ctx) {
            ctx.drawImage(
                this.image,
                this.frame * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                this.x, this.y, this.width, this.height
            );
        }

    }

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('background');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.timeSinceLastFrame = 0;
            this.speed = 2;
        }

        update(deltaTime) {
            this.timeSinceLastFrame += deltaTime;
            if(this.timeSinceLastFrame > 10) {
                this.x -= this.speed;
                this.timeSinceLastFrame = 0;
                if(this.x < 0 - this.width) {
                    this.x = 0;
                }
            }
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.spriteWidth = 160;
            this.spriteHeight = 119;
            this.width = this.spriteWidth / 2;
            this.height = this.spriteHeight / 2;
            this.image = document.getElementById('enemyImage');
            this.frame = 0;
            this.timeSinceLastFrame = 0;
            this.x = this.gameWidth + this.width;
            this.y = this.gameHeight - this.height;
            this.speed = -3;
            this.toBeRemoved = false;
            this.frameInterval = 1000 / 20;
        }

        update(deltaTime) {
            this.timeSinceLastFrame += deltaTime;
            this.x += this.speed;
            if(this.x < 0 - this.width) {
                this.toBeRemoved = true;
                score++;
            }
            if(this.timeSinceLastFrame > this.frameInterval) {
                this.timeSinceLastFrame = 0;
                this.frame = (this.frame + 1) % 6;
            }
        }

        draw(ctx) {
            ctx.drawImage(
                this.image, 
                this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
                this.x, this.y, this.width, this.height
            );
        }
    }

    let timeSinceLastFrame = 0;
    let randomEnemyInterval = 0;

    function handleEnemies(deltaTime) {
        timeSinceLastFrame += deltaTime;
        if(timeSinceLastFrame > 1000 + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            randomEnemyInterval = Math.random() * 10000 ;
            timeSinceLastFrame = 0;
        }
        enemies.forEach((e) => {
            e.update(deltaTime);
            e.draw(ctx);
        })
        enemies = enemies.filter((e) => !e.toBeRemoved);
    }

    displayStatusText = (ctx) => {
        ctx.fillStyle = 'white';
        ctx.font = '40px Helvetica'
        ctx.fillText('Score ' + score, 20, 50);
        if(gameOver) {
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        }
    }

    const inputHandler = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    let deltaTime, lastTime = 0;

    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        background.update(deltaTime);
        background.draw(ctx);
        player.update(deltaTime, inputHandler, enemies);
        player.draw(ctx);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if(!gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});
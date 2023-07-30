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

    update(deltaTime, inputHandler, enemies, game) {
        // collision detection
        enemies.forEach((e) => {
            const dx = (e.x + e.width /2) - (this.x + this.width / 2);
            const dy = (e.y + e.height / 2) - (this.y + this.height / 2);
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < e.width / 2 + this.width / 2) {
                game.gameOver = true;
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
        } else if((inputHandler.keys.indexOf('ArrowUp') > -1 || inputHandler.keys.indexOf('swipe up') > -1) && this.onTheGround()) {
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

export default Player;
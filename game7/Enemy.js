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

    update(deltaTime, game) {
        this.timeSinceLastFrame += deltaTime;
        this.x += this.speed;
        if(this.x < 0 - this.width) {
            this.toBeRemoved = true;
            game.score++;
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

export default Enemy;
class Background {
    constructor(gameWidth, gameHeight, speed) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('background');
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 720;
        this.timeSinceLastFrame = 0;
        this.speed = speed;
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

export default Background;
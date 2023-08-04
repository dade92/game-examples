class Enemy {
    constructor(image, spriteWidth, spriteHeight, numOfFrames) {
        this.image = new Image();
        this.image.src = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = 0;
        this.y = 0;
        this.toBeRemoved = false;
        this.timeSinceLastFrame = 0;
        this.frame = 0;
        this.numOfFrames = numOfFrames;
    }

    update(deltaTime) {
        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > 40) {
            this.frame = (this.frame + 1) % this.numOfFrames;
            this.timeSinceLastFrame = 0;
        }
        if(this.x < 0 - this.width) {
            this.toBeRemoved = true;
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

export class WalkingZombie extends Enemy {
    constructor(game) {
        super('enemy_zombie.png', 290, 404, 8);
        this.y = game.height - this.height - game.groundMargin;
        this.x = game.width;
        this.speed = 1;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.x -= this.speed;
    }

    draw(ctx) {
        super.draw(ctx);
    }
}
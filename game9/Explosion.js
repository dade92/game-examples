export class Explosion {
    constructor(x,y, size) {
        this.image = new Image();
        this.image.src = 'boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'boom.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 50;
        this.markedForDeletion = false;
        this.size = size;
    }

    update(deltaTime) {
        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
        }
        if(this.frame === 0) {
            this.sound.play();
        }
        if(this.frame > 5) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.image, 
            this.frame * this.spriteWidth, 0 , this.spriteWidth, this.spriteHeight,
            this.x - this.size / 2, this.y - this.size / 2, this.size, this.size
        );
    }
}
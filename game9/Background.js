export class Background {
    constructor(image, width, height, speedModifier) {
        this.image = new Image();
        this.image.src = image;
        this.x = 0;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
    }

    update(playerSpeed) {
        this.x -= this.speedModifier;
        if(playerSpeed > 0) {
            this.x -= playerSpeed;
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.x, 0, this.width, this.height
        );
        ctx.drawImage(
            this.image,
            this.x + this.width, 0, this.width, this.height
        );
    }
}
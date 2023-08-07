export class Block {
    constructor(x, y, width, height, game) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.game = game;
        this.visible = this.isOutsideScreen();
    }

    update() {
        this.x -= this.game.speed;
        if(this.isOutsideScreen()) {
            this.visible = false;
        } else {
            this.visible = true;
        }
    }

    isOutsideScreen() {
        return this.x < 0 - this.width || this.x > this.game.width;
    }

    draw(ctx) {
        if(this.visible) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
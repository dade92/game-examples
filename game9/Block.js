export class Block {

    constructor(x, y, width, height, game) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.game = game;
    }

    update() {
        this.x -= this.game.speed;
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
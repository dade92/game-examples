class Background {
    constructor(image, width, height, speedModifier, game) {
        this.image = new Image();
        this.image.src = image;
        this.x = 0;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.game = game;
    }

    update() {
        this.x -= this.game.speed * this.speedModifier;
        if(this.x < 0 - this.width) {
            this.x = 0;
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

export class Backgrounds {
    constructor(game, player) {
        this.game = game;
        this.player = player;
        this.width = 1667;
        this.height = 500;
        this.layers = [
            new Background('layer-1.png', this.width, this.height, 0.1, game),
            new Background('layer-2.png', this.width, this.height, 0.3, game),
            new Background('layer-3.png', this.width, this.height, 0.5, game),
            new Background('layer-4.png', this.width, this.height, 0.7, game),
            new Background('layer-5.png', this.width, this.height, 1, game),
        ];
    }

    update() {
        this.layers.forEach((b) => {
            b.update(0);
        });
    }

    draw(ctx) {
        this.layers.forEach((b) => {
            b.draw(ctx)
        });
    }
}
class Particle {
    constructor(game) {
        this.game = game;
        this.toBeRemoved = false;
    }

    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.92;
        if(this.size < 0.5) {
            this.toBeRemoved = true;
        }
    }
}

export class Fire extends Particle {
    constructor(game, player, x, y) {
        super(game);
        this.image = new Image();
        this.image.src = 'fire.png';
        this.game = game;
        this.player = player;
        this.size = Math.random() * 100 + 50;
        this.x = x;
        this.y = y;
        this.speedX = this.player.speed;
        this.speedY = 1;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }

    update() {
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle*5);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.image,
            0,0, this.size, this.size
        );
        ctx.restore();
    }
}

export class Dust extends Particle {
    constructor(game, x,y) {
        super(game);
        this.size = Math.random() * 5 + 5;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgb(0,0,0,0.2)';
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
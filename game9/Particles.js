class Particle {
    constructor(game) {
        this.game = game;
        this.toBeRemoved = false;
    }

    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if(this.size < 0.5) {
            this.toBeRemoved = true;
        }
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
        // ctx.fillRect(this.x, this.y, 10,10);
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
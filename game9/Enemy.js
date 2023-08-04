class Enemy {
    constructor(game, image, spriteWidth, spriteHeight, numOfFrames, resizeFactor) {
        this.image = new Image();
        this.image.src = image;
        this.numOfFrames = numOfFrames;
        this.game = game;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth / resizeFactor;
        this.height = this.spriteHeight / resizeFactor;
        // By default, enemies appear at the end of the screen
        this.x = game.width;
        this.y = 0;

        this.toBeRemoved = false;
        this.timeSinceLastFrame = 0;
        this.frame = 0;
        this.speed = 0;
        this.speedY = 0;
    }

    update(deltaTime) {
        // Move the enemy (with game speed adjustment)
        this.x += this.speed - this.game.speed;
        this.y += this.speedY;

        // Animate the enemy
        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > 40) {
            this.frame = (this.frame + 1) % this.numOfFrames;
            this.timeSinceLastFrame = 0;
        }

        // Remove logic
        if(this.x < 0 - this.width) {
            this.toBeRemoved = true;
        }
    }

    draw(ctx) {
        if(this.game.debug) {
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height /2, this.width / 2, 0, 2 * Math.PI);
            ctx.stroke();
        }
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height
        );
    } 
}

export class Plant extends Enemy {
    constructor(game) {
        super(game, 'enemy_plant.png', 60, 80, 2, 1);
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.x = this.game.width;
        this.speed = 0;
        this.speedY = 0;
    }
}

export class Mosquito extends Enemy {
    constructor(game) {
        super(game, 'enemy_fly.png', 60, 44, 6, 1);
        this.speed = Math.random() * (-3) + 1;
        this.angle = 0;
        this.y = Math.random() * (game.height * 0.5);
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle++;
        this.speedY = Math.sin(this.angle * 0.1) * 2; 
    }
}

export class WalkingZombie extends Enemy {
    constructor(game) {
        super(game, 'enemy_zombie.png', 290, 404, 8, 4);
        this.y = game.height - this.height - game.groundMargin;
        this.speed = -1;
    }
}
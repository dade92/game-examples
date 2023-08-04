class Enemy {
    constructor(game, image, spriteWidth, spriteHeight, numOfFrames, resizeFactor) {
        this.image = new Image();
        this.image.src = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth / resizeFactor;
        this.height = this.spriteHeight / resizeFactor;
        //TODO this is not true for all enemies: static ones should have fixed x
        this.x = game.width;
        this.y = 0;
        this.toBeRemoved = false;
        this.timeSinceLastFrame = 0;
        this.frame = 0;
        this.numOfFrames = numOfFrames;
        this.game = game;
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

export class Plant extends Enemy {
    constructor(game) {
        super(game, 'enemy_plant.png', 60, 80, 2, 1);
        this.y = game.height - this.height - game.groundMargin;
        this.x = Math.random() * game.width + 10;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle++;
        this.x -= this.game.speed;
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super(game, 'enemy_fly.png', 60, 44, 6, 1);
        this.speed = 1;
        this.angle = 0;
        this.y = Math.random() * (game.height / 2) ;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle++;
        this.x -= this.speed;
        this.y += Math.sin(this.angle * 0.1) * 2; 
    }
}



export class WalkingZombie extends Enemy {
    constructor(game) {
        super(game, 'enemy_zombie.png', 290, 404, 8, 4);
        this.y = game.height - this.height - game.groundMargin;
        this.speed = 1;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.x -= this.speed;
    }
}
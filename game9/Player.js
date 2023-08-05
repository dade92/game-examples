import { states, StandingRight, RunRight, CrawlRight, JumpRight, FallRight, RolllRight, RunLeft, RollDown, Hit } from "./State.js";
import { Explosion } from './Explosion.js'  

export default class Player {
    constructor(game, inputHandler) {
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.game = game;
        this.states = [
            new StandingRight(this),
            new RunRight(this), 
            new CrawlRight(this),
            new JumpRight(this),
            new FallRight(this),
            new RolllRight(this),
            new RunLeft(this),
            new RollDown(this),
            new Hit(this),
        ];
        this.currentState = this.states[0];
        this.inputHandler = inputHandler;
        this.image = document.getElementById('playerImage');
        this.spriteWidth = 100;
        this.spriteHeight = 91.3;
        this.width = this.spriteWidth / 1;
        this.height = this.spriteHeight / 1;
        this.x = 0;
        this.y = this.gameHeight - this.height - this.game.groundMargin;
        this.frame = 0;
        this.frameY = 0;
        this.speed = 0;
        this.speedY = 0;
        this.weight = 0.5;
        this.timeSinceLastFrame = 0;
        this.numOfFrames = 7;
        this.frameInterval = 1000 / 20;
        this.maxSpeed = 3;
        this.lives = 5;
    }

    update(deltaTime) {
        this.x += this.speed;
        this.y += this.speedY;
        if(!this.onTheGround()) {
            this.speedY += this.weight;
        } else {
            this.speedY = 0;
        }

        if(this.x < 0) {
            this.x = 0;
        } else if(this.x > this.gameWidth - this.width) {
            this.x = this.gameWidth - this.width;
        }
        if(this.y > this.gameHeight - this.height - this.game.groundMargin) {
            this.y = this.gameHeight - this.height - this.game.groundMargin;
        }

        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frame = (this.frame + 1) % this.numOfFrames;
            this.timeSinceLastFrame = 0;
        }
        this.currentState.handleInput(this.inputHandler.lastKey);
        this.checkCollision();
    }

    onTheGround() {
        return this.y >= this.gameHeight - this.height - this.game.groundMargin;
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
        this.game.speed = this.speed;
    }

    draw(ctx) {
        if(this.game.debug) {
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height /2, this.width / 2, 0, 2 * Math.PI);
            ctx.stroke();
        }
        ctx.drawImage(
            this.image,
            this.spriteWidth * this.frame, this.spriteHeight * this.frameY, 
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,this.width, this.height
        );
    }

    checkCollision() {
        this.game.enemies.forEach((e) => {
            const dx = (e.x + e.width /2) - (this.x + this.width / 2);
            const dy = (e.y + e.height / 2) - (this.y + this.height / 2);
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < e.width / 2 + this.width / 2) {
                e.toBeRemoved = true;
                if(this.currentState.state === 'ROLL RIGHT' || this.currentState.state === 'ROLL DOWN') {
                    this.game.explosions.push(new Explosion(this.x + this.width /2, this.y + this.height /2, 80));
                    this.game.score++;
                } else {
                    this.setState(states.HIT);
                    this.lives--;
                }
            }
        })
    }

}
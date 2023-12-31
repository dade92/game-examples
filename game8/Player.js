import { StandingLeft, StandingRight, RunRight, RunLeft, CrawlRight, CrawlLeft, JumpRight, FallRight, JumpLeft, FallLeft, RolllRight, RolllLeft } from "./State.js";

export default class Player {
    constructor(gameWidth, gameHeight, inputHandler) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [
            new StandingRight(this),
            new StandingLeft(this),
            new RunRight(this), 
            new RunLeft(this),
            new CrawlRight(this),
            new CrawlLeft(this),
            new JumpRight(this),
            new FallRight(this),
            new JumpLeft(this),
            new FallLeft(this),
            new RolllRight(this),
            new RolllLeft(this),
        ];
        this.currentState = this.states[0];
        this.inputHandler = inputHandler;
        this.image = document.getElementById('playerImage');
        this.spriteWidth = 200;
        this.spriteHeight = 181.83;
        this.width = this.spriteWidth / 1.5;
        this.height = this.spriteHeight / 1.5;
        this.x = 0;
        this.y = gameHeight - this.height;
        this.frame = 0;
        this.frameY = 0;
        this.speed = 0;
        this.speedY = 0;
        this.weight = 0.5;
        this.timeSinceLastFrame = 0;
        this.numOfFrames = [7, 7, 9, 9, 5, 5, 7, 7, 7, 7, 7, 7];
        this.frameInterval = 1000 / 20;
        this.maxSpeed = 3;
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
        if(this.y > this.gameHeight - this.height) {
            this.y = this.gameHeight - this.height;
        }

        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frame = (this.frame + 1) % this.numOfFrames[this.states.indexOf(this.currentState)];
            this.timeSinceLastFrame = 0;
        }
        this.currentState.handleInput(this.inputHandler.lastKey);
    }

    onTheGround() {
        return this.y >= this.gameHeight - this.height;
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.spriteWidth * this.frame, this.spriteHeight * this.frameY, 
                this.spriteWidth, this.spriteHeight,
            this.x, this.y,this.width, this.height
        );
    }

}
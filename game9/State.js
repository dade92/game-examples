import { Dust } from './Particles.js'

export const states = {
    STANDING_RIGHT: 0,
    RUN_RIGHT: 1,
    CRAWL_RIGHT: 2,
    JUMP_RIGHT: 3,
    FALL_RIGHT: 4,
    ROLL_RIGHT: 5,
    RUN_LEFT: 6,
    ROLL_DOWN: 7,
    HIT: 8,
}

class State {
    constructor(state) {
        this.state = state;
    }

    enter() {}

    handleInput(input) {}
}

export class StandingRight extends State {
    constructor(player) {
        super('STANDING RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 0;
        this.player.speed = 0;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(input === 'PRESS right') {
            this.player.setState(states.RUN_RIGHT);
        }
        else if(input === 'PRESS down') {
            this.player.setState(states.CRAWL_RIGHT);
        }
        else if(input === 'PRESS up') {
            this.player.setState(states.JUMP_RIGHT);
        } else if(input === 'PRESS left') {
            this.player.setState(states.RUN_LEFT);
        } else if(input === 'PRESS space') {
            this.player.setState(states.ROLL_RIGHT);
        }
    }
}

export class RunRight extends State {
    constructor(player) {
        super('RUN RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 3;
        this.player.speed = this.player.normalSpeed;
        this.player.numOfFrames = 9;
    }

    handleInput(input) {
        this.player.game.particles.push(new Dust(this.player.game, this.player.x + this.player.width / 2, this.player.y + this.player.height));
        if(input === 'PRESS right') {
            this.player.setState(states.RUN_RIGHT);
        } else if(input === 'RELEASE right') {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class RunLeft extends State {
    constructor(player) {
        super('RUN LEFT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 3;
        this.player.speed = -this.player.normalSpeed;
        this.player.numOfFrames = 9;
    }

    handleInput(input) {
        if(input === 'PRESS right') {
            this.player.setState(states.RUN_RIGHT);
        } else if(input === 'RELEASE right') {
            this.player.setState(states.STANDING_RIGHT);
        } else if(input === 'RELEASE left') {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class JumpRight extends State {
    constructor(player) {
        super('JUMP RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 1;
        this.player.speedY = -20;
        this.player.speed = this.player.maxSpeed;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(!this.player.onTheGround() && this.player.speedY === 0) {
            this.player.setState(states.FALL_RIGHT);
        } else if(input === 'PRESS space') {
            this.player.setState(states.ROLL_DOWN);
        }
    }
}

export class FallRight extends State {
    constructor(player) {
        super('FALL RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 2;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(this.player.onTheGround()) {
            this.player.setState(states.STANDING_RIGHT);
        } else if(input === 'PRESS space') {
            this.player.setState(states.ROLL_DOWN);
        }
    }
}

export class RollDown extends State {
    constructor(player) {
        super('ROLL DOWN');
        this.player = player;
    }

    enter() {
        this.player.frameY = 6;
        this.player.speedY = 20;
        this.player.speed  = 0;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(this.player.onTheGround()) {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class CrawlRight extends State {
    constructor(player) {
        super('CRAWL RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 5;
        this.player.numOfFrames = 5;
    }

    handleInput(input) {
        if(input === 'PRESS down') {
            this.player.setState(states.CRAWL_RIGHT);
        } else if(input === 'RELEASE down') {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class RolllRight extends State {
    constructor(player) {
        super('ROLL RIGHT');
        this.player = player;
        this.triggerPosition = 0;
    }

    enter() {
        this.player.frameY = 6;
        this.player.speed = this.player.normalSpeed * 3;
        this.triggerPosition = this.player.x;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(input === 'RELEASE space') {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class Hit extends State {
    constructor(player) {
        super('HIT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 4;
        this.player.numOfFrames = 11;
        this.player.speed = 0;
    }

    handleInput(input) {
        if(input === 'PRESS right') {
            this.player.setState(states.STANDING_RIGHT);
        } else if(input === 'PRESS left') {
            this.player.setState(states.RUN_LEFT);
        }
    }
}
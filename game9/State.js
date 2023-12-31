import { Dust, Fire } from './Particles.js'

export const states = {
    STANDING_RIGHT: 0,
    RUN_RIGHT: 1,
    CRAWL_RIGHT: 2,
    JUMP_RIGHT: 3,
    FALL_RIGHT: 4,
    ROLL_RIGHT: 5,
    RUN_LEFT: 6,
    ROLL_DOWN_RIGHT: 7,
    HIT: 8,
    STANDING_LEFT: 9,
    JUMP_LEFT: 10,
    ROLL_LEFT: 11,
    CRAWL_LEFT: 12,
    FALL_LEFT: 13,
    ROLL_DOWN_LEFT: 14,
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

export class StandingLeft extends State {
    constructor(player) {
        super('STANDING LEFT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 1;
        this.player.speed = 0;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(input === 'PRESS right') {
            this.player.setState(states.STANDING_RIGHT);
        }
        else if(input === 'PRESS down') {
            this.player.setState(states.CRAWL_LEFT);
        }
        else if(input === 'PRESS up') {
            this.player.setState(states.JUMP_LEFT);
        } else if(input === 'PRESS left') {
            this.player.setState(states.RUN_LEFT);
        } else if(input === 'PRESS space') {
            this.player.setState(states.ROLL_LEFT);
        }
    }
}

export class RunRight extends State {
    constructor(player) {
        super('RUN RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 6;
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
        this.player.frameY = 7;
        this.player.speed = -this.player.maxSpeed;
        this.player.numOfFrames = 9;
    }

    handleInput(input) {
        this.player.game.particles.push(new Dust(this.player.game, this.player.x + this.player.width / 2, this.player.y + this.player.height));
        if(input === 'PRESS right') {
            this.player.setState(states.STANDING_RIGHT);
        } else if(input === 'RELEASE left') {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class JumpRight extends State {
    constructor(player) {
        super('JUMP RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 2;
        this.player.speedY = -20;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(!this.player.onTheGround() && this.player.speedY === 0) {
            this.player.setState(states.FALL_RIGHT);
        } else if(input === 'PRESS space') {
            this.player.setState(states.ROLL_DOWN_RIGHT);
        } else if(input === 'PRESS right') {
            this.player.speed = this.player.normalSpeed;
        }
    }
}

export class FallRight extends State {
    constructor(player) {
        super('FALL RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 4;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(this.player.onTheGround()) {
            this.player.setState(states.STANDING_RIGHT);
        } else if(input === 'PRESS space') {
            this.player.setState(states.ROLL_DOWN_RIGHT);
        }
    }
}

export class JumpLeft extends State {
    constructor(player) {
        super('JUMP LEFT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 3;
        this.player.speedY = -20;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(!this.player.onTheGround() && this.player.speedY === 0) {
            this.player.setState(states.FALL_LEFT);
        } else if(input === 'PRESS space') {
            this.player.setState(states.ROLL_DOWN_LEFT);
        } else if(input === 'PRESS left') {
            this.player.speed = -this.player.normalSpeed;
        }
    }
}

export class FallLeft extends State {
    constructor(player) {
        super('FALL LEFT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 5;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        if(this.player.onTheGround()) {
            this.player.setState(states.STANDING_LEFT);
        } else if(input === 'PRESS space') {
            //TODO fix this
            this.player.setState(states.ROLL_DOWN_LEFT);
        }
    }
}

export class RollDownRight extends State {
    constructor(player) {
        super('ROLL');
        this.player = player;
    }

    enter() {
        this.player.frameY = 10;
        this.player.speedY = 20;
        this.player.speed  = 0;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        this.player.game.particles.push(new Fire(this.player.game, this.player, this.player.x, this.player.y));
        if(this.player.onTheGround()) {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class RollDownLeft extends State {
    constructor(player) {
        super('ROLL');
        this.player = player;
    }

    enter() {
        this.player.frameY = 11;
        this.player.speedY = 20;
        this.player.speed  = 0;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        this.player.game.particles.push(new Fire(this.player.game, this.player, this.player.x, this.player.y));
        if(this.player.onTheGround()) {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class CrawlRight extends State {
    constructor(player) {
        super('CRAWL RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 8;
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

export class CrawlLeft extends State {
    constructor(player) {
        super('CRAWL LEFT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 9;
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
        super('ROLL');
        this.player = player;
        this.triggerPosition = 0;
    }

    enter() {
        this.player.frameY = 10;
        this.player.speed = this.player.maxSpeed;
        this.triggerPosition = this.player.x;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        this.player.game.particles.push(new Fire(this.player.game, this.player, this.player.x, this.player.y));
        if(input === 'RELEASE space') {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class RollLeft extends State {
    constructor(player) {
        super('ROLL');
        this.player = player;
        this.triggerPosition = 0;
    }

    enter() {
        this.player.frameY = 11;
        this.player.speed = -this.player.maxSpeed;
        this.triggerPosition = this.player.x;
        this.player.numOfFrames = 7;
    }

    handleInput(input) {
        this.player.game.particles.push(new Fire(this.player.game, this.player, this.player.x, this.player.y));
        if(input === 'RELEASE space') {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class Hit extends State {
    //TODO make him blinking like crash bandicoot
    constructor(player) {
        super('HIT');
        this.player = player;
        this.sound = new Audio();
        this.sound.src = 'hits/10.ogg'
    }

    enter() {
        this.player.frameY = 0;
        this.player.numOfFrames = 7;
        this.player.speed = 0;
        this.sound.play();
    }

    handleInput(input) {
        if(input === 'PRESS right') {
            this.player.setState(states.STANDING_RIGHT);
        } else if(input === 'PRESS left') {
            this.player.setState(states.RUN_LEFT);
        }
    }
}
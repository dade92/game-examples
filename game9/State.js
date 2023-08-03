export const states = {
    STANDING_RIGHT: 0,
    RUN_RIGHT: 1,
    CRAWL_RIGHT: 2,
    JUMP_RIGHT: 3,
    FALL_RIGHT: 4,
    ROLL_RIGHT: 5,
    RUN_LEFT: 6,
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
        } else if(input === 'PRESS space') {
            this.player.setState(states.ROLL_RIGHT);
        } else if(input === 'PRESS left') {
            this.player.setState(states.RUN_LEFT);
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
        this.player.speed = this.player.maxSpeed;
    }

    handleInput(input) {
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
        this.player.speed = -this.player.maxSpeed;
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
        this.player.speedY = -15;
        this.player.speed = this.player.maxSpeed;
    }

    handleInput(input) {
        if(!this.player.onTheGround() && this.player.speedY === 0) {
            this.player.setState(states.FALL_RIGHT);
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
        this.player.speed = this.player.maxSpeed * 3;
        this.triggerPosition = this.player.x;
    }

    handleInput(input) {
        if(input === 'RELEASE space') {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}
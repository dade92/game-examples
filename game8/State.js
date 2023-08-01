export const states = {
    STANDING_RIGHT: 0,
    STANDING_LEFT: 1,
    RUN_RIGHT: 2,
    RUN_LEFT: 3,
    CRAWL_RIGHT: 4,
    CRAWL_LEFT: 5,
    JUMP_RIGHT: 6,
    FALL_RIGHT: 7,
}

class State {
    constructor(state) {
        this.state = state;
    }

    enter() {}

    handleInput(input) {}
}

export class StandingLeft extends State {
    constructor(player) {
        super('STANDING LEFT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 1;
        this.player.speed = 0;
    }

    handleInput(input) {
        if(input === 'PRESS right') {
            this.player.setState(states.STANDING_RIGHT);
        }
        else if(input === 'PRESS left') {
            this.player.setState(states.RUN_LEFT);
        } 
        else if(input === 'PRESS down') {
            this.player.setState(states.CRAWL_LEFT);
        }
    }
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
        if(input === 'PRESS left') {
            this.player.setState(states.STANDING_LEFT);
        }
        else if(input === 'PRESS right') {
            this.player.setState(states.RUN_RIGHT);
        }
        else if(input === 'PRESS down') {
            this.player.setState(states.CRAWL_RIGHT);
        }
        else if(input === 'PRESS up') {
            this.player.setState(states.JUMP_RIGHT);
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
        this.player.speed = 3;
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
        this.player.frameY = 7;
        this.player.speed = -3;
    }

    handleInput(input) {
        if(input === 'PRESS left') {
            this.player.setState(states.RUN_LEFT);
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
        this.player.speedY = -15;
    }

    handleInput(input) {
        if(input === 'RELEASE up') {
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
        this.player.frameY = 4;
        this.player.speedY = 0;
    }

    handleInput(input) {
    }
}

export class CrawlRight extends State {
    constructor(player) {
        super('CRAWL RIGHT');
        this.player = player;
    }

    enter() {
        this.player.frameY = 8;
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
    }

    handleInput(input) {
        if(input === 'PRESS down') {
            this.player.setState(states.CRAWL_LEFT);
        } else if(input === 'RELEASE down') {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}
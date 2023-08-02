import { Enemy, Worm, Ghost, Spider } from "./Enemy.js";

export class Game {
    constructor(ctx, width, height) {
        this.enemies = [];
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.timeSinceLastUpdate = 0;
        this.enemyInterval = 1000;
        this.enemyType = ['worm', 'ghost', 'spider'];
    }

    update(deltaTime) {
        this.timeSinceLastUpdate += deltaTime;
        if(this.timeSinceLastUpdate > this.enemyInterval) {
            this.#addNewEnemy();
            this.timeSinceLastUpdate = 0;
        }
        this.enemies.forEach((e) => {
            e.update(deltaTime);
        });
        this.enemies = this.enemies.filter((e) => !e.toBeRemoved);
    }

    draw() {
        this.enemies.forEach((e) => {
            e.draw(this.ctx);
        });
    }

    #addNewEnemy() {
        const typeNumber = Math.floor(Math.random()* 3 % 3);
        if(this.enemyType[typeNumber] === 'worm') {
            this.enemies.push(new Worm(this));
        } else if(this.enemyType[typeNumber] === 'ghost') {
            this.enemies.push(new Ghost(this));
        } else {
            this.enemies.push(new Spider(this));
        }
    }
}
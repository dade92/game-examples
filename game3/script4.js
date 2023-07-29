/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 800;
const enemies = [];
const numberOfEnemies = 10;

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy4.png'
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.newX = Math.random() * canvas.width;
        this.newY = Math.random() * canvas.height;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random()*200 + 50);
    }

    update() {
        // newX and newY are updated only when gameFrame % this.interval === 0.
        // for the most of the time, dx and dy remain the same.
        // This gives the "non constant" movement of the enemies.
        // Moreover, newX and newY are random, so dx and dy are random too.
        // The delta divider gives the speed of the change.

        if(gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy =  this.y - this.newY;
        this.x -= dx/20;
        this.y -= dy/20;
        if(this.x + this.width < 0) this.x = canvas.width;
        if(gameFrame % this.flapSpeed === 0) {
            this.frame > 7 ? this.frame = 0 : this.frame++;
        }
    }
  
    draw() {
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth, 0 , this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height
        );
    }

}

for(let i = 0;i<numberOfEnemies;i++) {
    enemies.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemies.forEach((e) => {
        e.update();
        e.draw();
    })
    requestAnimationFrame(animate);
    gameFrame++;
}
animate();

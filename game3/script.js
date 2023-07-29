/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 800;
const enemies = [];
const numberOfEnemies = 5;
let lastTime = 0;

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy1.png'
        this.x = Math.random() * canvas.width / 2;
        this.y = Math.random() * canvas.height / 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.frame = 0;
        this.lastTime = 0;
        this.updateSpriteFreq = Math.floor( Math.random() * 50 + 10 );
        this.flapSpeed = Math.floor(Math.random() * 5 + 1);
    }

    update(deltaTime) {
        // Changing the offset and the length you can speed up the enemies
        this.lastTime += deltaTime;
        this.x+= Math.random() * 7 - 3.5;
        this.y+=Math.random() * 7 - 3.5;
        if(this.lastTime > this.updateSpriteFreq) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
            this.lastTime = 0;
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

function animate(timestamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    enemies.forEach((e) => {
        e.update(deltaTime);
        e.draw();
    })
    requestAnimationFrame(animate);
    gameFrame++;
}
animate(0);

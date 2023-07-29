/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 800;
const enemies = [];
const numberOfEnemies = 20;

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy2.png'
        this.speed = Math.random() * 4 + 1;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 5 + 1);
        this.angle = 0;
        // Incrementing angle speed improve the frequency of oscillation
        this.angleSpeed = Math.random() * 0.5;
        // Incrementing curve range will improve the oscillation
        this.curve = Math.random() * 7;
    }

    update() {
        this.x-= this.speed;
        this.y+= this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) this.x = canvas.width;
        if(gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
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

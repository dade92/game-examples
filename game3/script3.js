/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 800;
const enemies = [];
const numberOfEnemies = 50;

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy3.png'
        this.x = 0;
        this.y = 0;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 500;
        // Incresing angle speed will increase the speed of the enemies
        this.angleSpeed = Math.random() * 0.5 + 0.6;
    }

    update() {
        // Frequency param changes the movement pattern
        // Changing the curve will increase or decrease the diameter of movement

        this.x = canvas.width / 2 * Math.sin(this.angle * Math.PI / 90) + (canvas.width / 2 - this.width / 2);
        this.y = canvas.height / 2 * Math.cos(this.angle * Math.PI / 180) + (canvas.height / 2 - this.height / 2);
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

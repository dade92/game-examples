/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.timer = 0;
        this.sound = new Audio();
        this.sound.src = 'sounds/boom.wav'
    }

    update() {
        if(this.frame === 0) this.sound.play();
        this.timer++;
        if(this.timer % 3 === 0) {
            this.frame++;
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0, 
            this.spriteWidth, 
            this.spriteHeight,
            this.x, this.y, 
            this.width, this.height
        )
    }
}

function createAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

window.addEventListener('click', (e) => {
    createAnimation(e)
})

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i =0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame > 5) {
            explosions.splice(i, 1);
        }
    }
    requestAnimationFrame(animate);
}
animate();
/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 700
const CANVAS_HEIGHT = canvas.height = 700;

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
const COLLISION_CANVAS_WIDTH = collisionCanvas.width = 700;
const COLLISION_CANVAS_HEIGHT = collisionCanvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();
let collisionCanvasPosition = collisionCanvas.getBoundingClientRect();
ctx.font = '50px Impact';

const maxScore = 10;

let gameOver = false;
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;
let speedOfRavens = 2;
let lastSpeedChange = 0;

let ravens = [];
class Raven {
    constructor(speed) {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.3 + 0.2;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        // Adjust the directionX offsets to increase/descrease the speed
        this.directionX = Math.random() * 5 + speed;
        this. directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'raven.png';
        this.frame = 0;
        this.timeSinceFlap = 0;
	    // Adjust this flapInterval to change randomly the speed of flapping of the Raven
        this.flapInterval = Math.random() * 20 + 40;
        this.randomColors = [Math.floor(Math.random() * 255),Math.floor(Math.random() * 255), Math.floor(Math.random() * 255) ];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }

    update(deltaTime) {
        if(this.y < 0 || this.y > (canvas.height - this.height)) {
            this.directionY = this.directionY * (-1);
        }
        this.x -= this.directionX;
        this.y -= this.directionY;
        this.timeSinceFlap += deltaTime;
        if(this.timeSinceFlap > this.flapInterval) {
            this.frame = (this.frame + 1) %5
            this.timeSinceFlap = 0;
        }
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
    }

    draw() {
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.image, this.frame * this.spriteWidth, 0 , this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height
        );
    }
}

let explosions = [];

class Explosion {
    constructor(x,y, size) {
        this.image = new Image();
        this.image.src = 'boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x - canvasPosition.left;
        this.y = y - canvasPosition.top;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'sounds/boom.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 50;
        this.markedForDeletion = false;
        this.size = size;
    }

    update(deltaTime) {
        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
        }
        if(this.frame === 0) {
            this.sound.play();
        }
        if(this.frame > 5) {
            this.markedForDeletion = true;
        }
    }

    draw() {
        ctx.drawImage(
            this.image, 
            this.frame * this.spriteWidth, 0 , this.spriteWidth, this.spriteHeight,
            this.x - this.size / 2, this.y - this.size / 2, this.size, this.size
        );
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 30 ,50);
}

function drawGameOver() {
    ctx.fillStyle = 'black';
    ctx.fillText('GAME OVER', canvas.width / 2 - canvasPosition.left, canvas.height / 2 - canvasPosition.top);
}

window.addEventListener('click', (e) => {
    const detectPixelColor = collisionCtx.getImageData(
        e.x- canvasPosition.left, 
        e.y - canvasPosition.top, 
        1,1
    );

    //TODO raves should give different scores depending on their dimension:
    // little ones are more difficult to hit
    const pc = detectPixelColor.data;
    ravens.forEach((r) => {
        if( r.randomColors[0] === pc[0] && 
            r.randomColors[1] === pc[1] && 
            r.randomColors[2] === pc[2]
        ) {
            r.markedForDeletion = true;
            score+= 1;
            explosions.push(new Explosion(e.x, e.y, r.width));
        }
    });
});

function animate(timestamp) {
    if(timestamp - lastSpeedChange > 5000) {
        speedOfRavens++;
        lastSpeedChange = timestamp;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    if(timeToNextRaven > ravenInterval) {
        ravens.push(new Raven(3));
        timeToNextRaven = 0;
        ravens.sort((a,b) => {
            return a.width - b.width;
        })
    }
    ravens.forEach((r) => {
        r.update(deltaTime);
        r.draw();
    });
    explosions.forEach((ex) => {
        ex.update(deltaTime);
        ex.draw();
    });
    drawScore();
    ravens = ravens.filter((r) => !r.markedForDeletion);
    explosions = explosions.filter((e) => !e.markedForDeletion);
    if(gameOver) {
        drawGameOver();
    }
    requestAnimationFrame(animate);
}
animate(0);

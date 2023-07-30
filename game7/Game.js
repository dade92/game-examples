import Background from './Background.js';
import Player from './Player.js';

class Game {
    constructor(inputHandler, player, background) {
        this.enemies = [];
        this.score = 0;
        this.gameOver = false;
        this.inputHandler = inputHandler;
        this.player = player;
        this.background = background;
    }

    handleEnemies(deltaTime) {
        timeSinceLastFrame += deltaTime;
        if(timeSinceLastFrame > 1000 + randomEnemyInterval) {
            this.enemies.push(new Enemy(canvas.width, canvas.height));
            randomEnemyInterval = Math.random() * 10000 ;
            timeSinceLastFrame = 0;
        }
        this.enemies.forEach((e) => {
            e.update(deltaTime, this);
            e.draw(ctx);
        })
        this.enemies = this.enemies.filter((e) => !e.toBeRemoved);
    }

    displayStatusText = (ctx) => {
        ctx.fillStyle = 'white';
        ctx.font = '40px Helvetica'
        ctx.fillText('Score ' + this.score, 20, 50);
        if(this.gameOver) {
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        }
    }

    update(deltaTime) {
        background.update(deltaTime);
        player.update(deltaTime, this.inputHandler, this.enemies, this);
    }

    draw(ctx) {
        background.draw(ctx);
        player.draw(ctx);
    }
}

export default Game;
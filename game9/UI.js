export class UI {
    constructor(game) {
        this.game = game;
        this.lives = new Image();
        this.lives.src = 'heart.png';
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "30px serif";
        for(let i = 0; i< this.game.player.lives; i++) {
            ctx.drawImage(
                this.lives,
                i * 50 /2 + 20, 20, 50 / 2, 50 / 2
            )
        }
        ctx.fillText('Score: ' + this.game.score, 200, 40);

        if(this.game.gameOver) {
            ctx.fillText("GAME OVER", this.game.width / 2, this.game.height / 2);
        }
    }
}
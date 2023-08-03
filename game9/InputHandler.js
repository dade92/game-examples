class InputHandler {
    //TODO probably we should manage a list of keys not just the last one
    constructor() {
        this.keys = [];
        this.lastKey = '';
        this.touchY = 0;
        this.touchThreshold = 30;
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case "ArrowLeft":
                    this.lastKey = 'PRESS left';
                    break;
                case "ArrowRight":
                    this.lastKey = 'PRESS right';
                    break;
                case "ArrowDown":
                    this.lastKey = 'PRESS down';
                    break;
                case "ArrowUp":
                    this.lastKey = 'PRESS up';
                    break;
                case " ":
                    this.lastKey = 'PRESS space';
                    break;
            }
        });
        window.addEventListener('keyup', (e) => {
            switch(e.key) {
                case "ArrowLeft":
                    this.lastKey = 'RELEASE left';
                    break;
                case "ArrowRight":
                    this.lastKey = 'RELEASE right';
                    break;
                case "ArrowDown":
                    this.lastKey = 'RELEASE down';
                    break;
                case "ArrowUp":
                    this.lastKey = 'RELEASE up';
                    break;
                case " ":
                    this.lastKey = 'RELEASE space';
                    break;
            }
        });
        window.addEventListener('touchstart', (e) => {
            this.touchY = e.changedTouches[0].pageY;
        });
        window.addEventListener('touchmove', (e) => {
            const swipeDistance = e.changedTouches[0].pageY - this.touchY;
            console.log(swipeDistance);
            if(swipeDistance > -this.touchThreshold && this.keys.indexOf('swipe down') === -1) {
                this.keys.push('swipe down');
            } else if(swipeDistance < this.touchThreshold && this.keys.indexOf('swipe up') === -1) {
                this.keys.push('swipe up');
            }
        });
        window.addEventListener('touchend', (e) => {
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
        });
    }
}

export default InputHandler;
class InputHandler {
    constructor() {
        this.keys = [];
        this.touchY = 0;
        this.touchThreshold = 30;
        window.addEventListener('keydown', (e) => {
            console.log(e);
            if((e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' || 
                e.key === 'ArrowRight' || 
                e.key === 'ArrowLeft' ||
                e.key === ' ') && 
                this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', (e) => {
            if(e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' || 
                e.key === 'ArrowRight' || 
                e.key === 'ArrowLeft'||
                e.key === ' ') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
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
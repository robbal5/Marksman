export class Target {
    constructor() {
        this.flyUp = new Image();
        this.flyUp.src = '../src/images/flyup_target2.png';
        this.flyDown = new Image();
        this.flyDown.src = '../src/images/flydown_target2.png';
        this.xPos = (Math.random() * 150) + 30;
        this.yPos = (Math.random() * 50) + 10;
        this.state = 1;
        this.flyPos = 0;
    }

    drawTarget(canvas, ctx) {
        if (this.flyPos < 10) {
            if (this.flyPos == 0) {
                this.yPos +=5;
            }
            ctx.drawImage(this.flyUp, this.xPos, this.yPos, 20,20);
            this.flyPos +=1
        } else {
            if (this.flyPos == 10) {
                this.yPos -=5;
            }
            ctx.drawImage(this.flyDown, this.xPos, this.yPos, 20, 20);
            this.flyPos +=1;
            if (this.flyPos > 20) {
                this.flyPos = 0;
            }
            
        }
    }
}
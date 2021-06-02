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
        this.range = Math.floor(Math.random() * 100);
        this.size = 20;
    }

    drawTarget(canvas, ctx) {
        if (this.flyPos < this.range/2) {

            this.yPos += 1;
            ctx.drawImage(this.flyUp, this.xPos, this.yPos, this.size,this.size);
            this.flyPos +=1

        } else {

            this.yPos -= 1;
            ctx.drawImage(this.flyDown, this.xPos, this.yPos, this.size, this.size);
            this.flyPos +=1;
            
            if (this.flyPos > this.range) {
                this.flyPos = 0;
            }
            
        }
    }
}
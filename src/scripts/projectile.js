export class Projectile {
    constructor(power, angle) {
        this.projectile = new Image();
        this.projectile.src = '../src/images/ball.png'; 
        this.xPos = 17;
        this.yPos = 110;
        this.power = power;
        this.angle = angle;
        this.dy = this.power * Math.sin(this.angle * 0.01745);
        this.dx = this.power/2 * Math.cos(this.angle*0.01745);
        this.xSize = 10;
        this.ySize = 10;
        this.timer = 0;
    }

    // update(power, angle) {
    //     if (angle != this.angle) {

    //     }
    //     if (power != this.power) {
    //         this.dy = this.power * Math.sin(this.angle * 0.01745);
    //         this.dx = this.power * Math.cos(this.angle * 0.01745);
    //     }
    // }

    drawProjectile(canvas, ctx) {
        ctx.drawImage(this.projectile, 0, 0, 100, 100, this.xPos, this.yPos, this.xSize, this.ySize);
            this.xPos += this.dx/2;
            this.dy -= 1;
            this.yPos -= this.dy/3;
        this.timer += 1;
    }
}
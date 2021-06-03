export class Projectile {
    constructor(power, angle) {
        this.projectile = new Image();
        this.projectile.src = '../src/images/ball.png'; 
        this.xPos = 17;
        this.yPos = 110;
        this.power = power/2;
        this.angle = angle;
        this.dy = this.power * Math.sin(this.angle * 0.01745);
        this.dx = this.power/2 * Math.cos(this.angle*0.01745);
        this.xSize = 10;
        this.ySize = 10;
        this.hit = false;
        this.timer = 1;
        this.state = 1;
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
        if (!this.hit) {
            ctx.drawImage(this.projectile, 0, 0, 100, 100, this.xPos, this.yPos, this.xSize, this.ySize);
            this.xPos += this.dx/2;
            this.dy -= 1;
            this.yPos -= this.dy/3;
        } else {
            debugger;
            ctx.drawImage(this.projectile, 64 * Math.floor((this.timer/4)%8), 64* Math.floor(this.timer/32), 60, 60, this.xPos, this.yPos, 30, 30)
            this.timer += 1
            if (this.timer > 64) {
                this.state = 0
            }
        }
    }

    checkCollisions(targets, canvas, game) {
        let that = this;
        if (this.yPos > canvas.height - 25 || this.xPos > canvas.width) {
            this.state = 0;
            game.previousShotsHit = 1;
            return false;
        }
        let result = false;
        
        targets.forEach((target) => {
            if (target.xPos - (that.xPos + that.xSize) < -5
             && target.xPos + target.size - that.xPos > 0
             && target.yPos - (that.yPos + that.ySize) < -5
             && target.yPos + target.size - that.yPos > 0 
             && !that.hit){
                 this.hit = true;
                 this.yPos = target.yPos;
                 this.xPos = target.xPos;
                that.projectile.src = '../src/images/explosion.png';
                target.state = 0;
                result = true;
            }
        })
        return result;
    }
}
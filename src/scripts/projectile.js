import {Sound} from './sounds';

export class Projectile {
    constructor(power, angle) {
        this.projectile = new Image();
        this.projectile.src = './images/ball.png'; 
        this.xPos = 17;
        this.yPos = 110;
        this.power = power/2;
        this.angle = angle;
        this.dy = this.power * Math.sin(this.angle * 0.01745);
        this.dx = this.power/2 * Math.cos(this.angle*0.01745);
        this.xSize = 8;
        this.ySize = 8;
        this.hit = false;
        this.timer = 1;
        this.state = 1;
        this.strike  = new Sound('hit-sound');
        this.miss = new Sound('miss-sound');
        this.shoot = new Sound('cannon-sound');
    }

    // update(power, angle) {
    //     if (angle != this.angle) {

    //     }
    //     if (power != this.power) {
    //         this.dy = this.power * Math.sin(this.angle * 0.01745);
    //         this.dx = this.power * Math.cos(this.angle * 0.01745);
    //     }
    // }

    drawProjectile(canvas, ctx, game) {
        if (!this.hit) {
            ctx.drawImage(this.projectile, 0, 0, 100, 100, this.xPos, this.yPos, this.xSize, this.ySize);
            this.xPos += this.dx/2;
            this.dy -= 1;
            this.yPos -= this.dy/3;
        } else {
            ctx.drawImage(this.projectile, 64 * Math.floor((this.timer/4)%8), 64* Math.floor(this.timer/32), 60, 60, this.xPos, this.yPos, 20, 20)
            this.timer += 1
            if (this.timer > 64) {
                this.state = 0
                if (game.multiplayer) {
                    game.currentPlayer = game.currentPlayer == 1 ? 2 : 1;
                }
            }
        }
    }

    checkCollisions(targets, canvas, game) {
        let that = this;
        if (this.yPos > canvas.height - 25 || this.xPos > canvas.width) {
            debugger;
            if (Object.values(game.projectiles).filter(proj => proj.state == 1).length < 2 && !game.firing) {
                this.shoot.stop();
            }
            this.state = 0;
            this.miss.play();
            if (game.multiplayer) {
                game.currentPlayer = game.currentPlayer == 1 ? 2 : 1;
            }
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
                if (Object.values(game.projectiles).filter(proj => proj.state == 1).length < 2 && !game.firing) {
                    this.shoot.stop();
                }
                 this.strike.stop();
                 this.strike.play();
                 this.hit = true;
                 this.yPos = target.yPos;
                 this.xPos = target.xPos;
                that.projectile.src = './images/explosion.png';
                target.state = 0;
                result = true;
            }
        })
        return result;
    }
}
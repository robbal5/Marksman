

export class Cannon {
    constructor() {
        this.picture = new Image();
        this.picture.src = '../src/images/cannon_spritesheet.png'
        this.x = -138.75,
        this.y = -64.42,
        this.width = 40,
        this.height= 30,
        this.frameX = -140,
        this.frameY = 50,
        this.firing = false,
        this.rotation = 45;
        this.state = 0;
        
    }

    drawCannon(canvas, ctx, firing) {
        
            ctx.save()
            // ctx.drawImage(this.picture, 0,0, 30, 30)
            ctx.translate(canvas.width/2, canvas.height/2)
            ctx.rotate(-this.rotation * 0.01745)
            if (firing) {
                
                ctx.drawImage(this.picture, 60*(Math.floor(this.state/3)), 80, 60, 35, this.x, this.y, 25, 12)
                ctx.translate(0,0)
                ctx.restore()
                let newState = this.state + 1;
                if (newState < 24){
                    this.state +=1;
                    // return true;
                } else {
                    this.state = 0
                    // return false;
                }
                return this.state;
            } else {
                ctx.drawImage(this.picture, 60 * (Math.floor(this.state / 3)), 80, 60, 35, this.x, this.y, 25, 12)
                ctx.translate(0, 0)
                ctx.restore()
            }
        
    }

    rotateCannon(bool){
        
        if (bool){
            let newValue = this.rotation - 1;
            if (newValue >= 0) {
                this.rotation = newValue;
                let radians = this.rotation*(0.01745);
                let standardRadians = 19.7 * (0.01745);
                this.x = -150*(Math.cos(radians-standardRadians)) - 3;
                this.y = -150*(Math.sin(radians - standardRadians))
                
            }
        } else {
            let newValue = this.rotation + 1;
            if (newValue <= 90) {
                this.rotation = newValue;
                let radians = this.rotation * (0.01745);
                let standardRadians = 19.75  * (0.01745);
                this.x = -150 * (Math.cos(radians - standardRadians)) -3;
                this.y = -150 * (Math.sin(radians - standardRadians));
            }
        }
    }
}
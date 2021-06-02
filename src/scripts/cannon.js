export class Cannon {
    constructor() {
        this.picture = new Image();
        this.picture.src = '../src/images/cannon_spritesheet.png'
        this.x = -135.75,
        this.y = -64.42,
        this.width = 40,
        this.height= 30,
        this.frameX = -140,
        this.frameY = 50,
        this.firing = false,
        this.rotation = 45;
    }

    drawCannon(canvas, ctx) {
        
            ctx.save()
            // ctx.drawImage(this.picture, 0,0, 30, 30)
            ctx.translate(canvas.width/2, canvas.height/2)
            ctx.rotate(-this.rotation * 0.01745)
            ctx.drawImage(this.picture, 0, 0, 40, 40, this.x, this.y, 17, 17)
            ctx.translate(0,0)
            ctx.restore()
        
    }

    rotateCannon(bool){
        debugger;
        if (bool){
            let newValue = this.rotation - 1;
            if (newValue >= 0) {
                this.rotation = newValue;
                let radians = this.rotation*(0.01745);
                let standardRadians = 19.7 * (0.01745);
                this.x = -150*(Math.cos(radians-standardRadians))
                this.y = -150*(Math.sin(radians - standardRadians))
                debugger;
            }
        } else {
            let newValue = this.rotation + 1;
            if (newValue <= 90) {
                this.rotation = newValue;
                let radians = this.rotation * (0.01745);
                let standardRadians = 19.7  * (0.01745);
                this.x = -150 * (Math.cos(radians - standardRadians))
                this.y = -150 * (Math.sin(radians - standardRadians))
            }
        }
    }
}
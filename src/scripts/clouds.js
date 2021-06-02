export class Cloud {
    constructor(posX, posY, cropStartX, cropStartY, cropEndX, cropEndY, sizeX, sizeY, source) {
        this.posX = posX,
        this.posY = posY,
        this.cropStartX = cropStartX,
        this.cropStartY = cropStartY,
        this.cropEndX = cropEndX,
        this.cropEndY = cropEndY,
        this.sizeX = sizeX,
        this.sizeY = sizeY,
        this.speed = Math.random(),
        this.source = source;

    }

    drawCloud(canvas, ctx) {
        ctx.drawImage(this.source, this.cropStartX, this.cropStartY, this.cropEndX, this.cropEndY, this.posX, this.posY, this.sizeX, this.sizeY)
    }

    moveCloud(canvas, ctx) {
        
        let newXPos = Math.floor(this.posX - this.speed);
        if (newXPos + this.sizeX < 0) {
            newXPos = canvas.width;
            this.posY = Math.floor(Math.random() * 30)
        }
        this.posX = newXPos;
    }
}
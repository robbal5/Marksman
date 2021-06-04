import {Cloud} from './clouds'

export const initialBackground = (canvas, ctx) => {
    const sun = new Image();
    sun.src = './images/sun.png';
    sun.onload = () => {
        ctx.drawImage(sun, canvas.width - 45,0 , 35, 35)
    }
    const clouds = new Image();
    clouds.src = './images/clouds.png';
    const cloudObjs = [new Cloud(30, 25, 0, 0, 390, 220, 40, 30, clouds), 
                        new Cloud(200, 10, 400, 120, 330, 150, 35, 25, clouds),
                        new Cloud(280, 35, 400, 120, 330, 150, 35, 25, clouds),
                        new Cloud(100, 5, 300, 275, 300, 160, 30, 20, clouds )]
    clouds.onload = () => {
        cloudObjs.forEach(cloud => {
            // if ([1,2][Math.floor(Math.random() * 3)] % 2 != 0) return;

            ctx.drawImage(clouds, cloud.cropStartX, cloud.cropStartY, cloud.cropEndX, cloud.cropEndY, cloud.posX, cloud.posY, cloud.sizeX, cloud.sizeY)
        })

    }
    ctx.fillStyle = 'darkolivegreen';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
    ctx.fillStyle = 'black';
    ctx.font = '15px Times New Roman';
    ctx.fillText('Click Enter to Begin!', 90, 80)
    return cloudObjs;
}
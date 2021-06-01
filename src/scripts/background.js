export const initialBackground = (canvas, ctx) => {
    const sun = new Image();
    sun.src = '../src/images/sun.png';
    sun.onload = () => {
        ctx.drawImage(sun, canvas.width - 45,0 , 35, 35)
    }
    const clouds = new Image();
    clouds.src = '../src/images/clouds.png'
    clouds.onload = () => {
        ctx.drawImage(clouds,0, 0, 390, 220, 30, 25, 40, 30 )
        ctx.drawImage(clouds, 400, 120, 330, 150, 200, 10, 35, 25)
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(0, canvas.height - 25, canvas.width, 25)
    
}
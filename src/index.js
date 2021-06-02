import "./styles/index.scss";
import {setupModal} from './scripts/modal';
import {initialBackground} from './scripts/background'
import {Cannon} from './scripts/cannon'


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const clouds = initialBackground(canvas, ctx);
    const sun = new Image();
    sun.src = '../src/images/sun.png';
    setupModal();
    const cannon = new Cannon();
    cannon.drawCannon(canvas, ctx);

    function animate() {
        
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(sun, canvas.width - 45, 0, 35, 35);
        ctx.fillStyle = 'green';
        ctx.fillRect(0, canvas.height - 25, canvas.width, 25)
        clouds.forEach((cloud) => { 
                cloud.moveCloud(canvas, ctx);
                cloud.drawCloud(canvas, ctx);
        })
        cannon.drawCannon(canvas, ctx);
        requestAnimationFrame(animate);
    }

    document.addEventListener('keydown', (event) => {
        
        if (event.key === 'ArrowLeft') {
            cannon.rotateCannon(false);
        }
        if (event.key === 'ArrowRight') {
            cannon.rotateCannon(true);
        }
    })

    animate();
   
})

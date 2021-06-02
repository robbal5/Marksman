import "./styles/index.scss";
import {setupModal} from './scripts/modal';
import {initialBackground} from './scripts/background'
import {Cannon} from './scripts/cannon'
import {Target} from './scripts/target'
import { Projectile } from "./scripts/projectile";
import { Game } from "./scripts/game";


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const clouds = initialBackground(canvas, ctx);
    const sun = new Image();
    sun.src = '../src/images/sun.png';
    setupModal();
    const cannon = new Cannon();
    cannon.drawCannon(canvas, ctx);
    const target = new Target();
    const projectile = new Projectile(30, 30);
    
    let fire = false;

    //ADDING GAME
    let gameStarted = false;
    let game;


    let fps, interval, startTime, now, then, elapsed;

    function startAnimating(fps) {
        interval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
    }

    function animate() {
        
        requestAnimationFrame(animate);

        now = Date.now();
        elapsed = now - then;

        if (elapsed > interval) {
            
            then = now - (elapsed % interval);

            // ctx.clearRect(0,0, canvas.width, canvas.height);
            // ctx.drawImage(sun, canvas.width - 45, 0, 35, 35);
            // ctx.fillStyle = 'green';
            // ctx.fillRect(0, canvas.height - 25, canvas.width, 25)
            // clouds.forEach((cloud) => { 
            //         cloud.moveCloud(canvas, ctx);
            //         cloud.drawCloud(canvas, ctx);
            // })
            // cannon.drawCannon(canvas, ctx);
            // target.drawTarget(canvas, ctx);
            
            // if (fire) {
            //     projectile.drawProjectile(canvas, ctx);  
            // }

        game.drawGame(canvas, ctx)
            
        }
        
    }

    document.addEventListener('keydown', ({key}) => {
        
        // if (event.key === 'ArrowLeft') {
        //     cannon.rotateCannon(false);
        // }
        // if (event.key === 'ArrowRight') {
        //     cannon.rotateCannon(true);
        // }
        // if (event.key === ' '){
        //      fire = true;
             
        // }

        game.updateGame(key)


    })

    // if (gameStarted){
    //     startAnimating(30);
    // }

    //Start game button
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click',(e) => {
        
        e.preventDefault();
        gameStarted = true;
        let shots = document.getElementById('shots').value;
        let targets = document.getElementById('targets').value;
        game = new Game(shots,targets,clouds);
        game.startGame();
        startAnimating(30);
        document.getElementById('start-button').innerHTML = 'Restart';
    })

   
})

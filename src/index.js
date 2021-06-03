import "./styles/index.scss";
import {setupModal} from './scripts/modal';
import {initialBackground} from './scripts/background'
import {Cannon} from './scripts/cannon'
import {Target} from './scripts/target'
import { Projectile } from "./scripts/projectile";
import { Game } from "./scripts/game";
import { gameOver } from "./scripts/gameover";


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
        if (game.gameWon || game.gameLost) {
            gameOver(game, ctx, canvas);
        } else{
            requestAnimationFrame(animate);
        }
        
    }

    document.addEventListener('keydown', (e) => {
        const validGameKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];
        // if (event.key === 'ArrowLeft') {
        //     cannon.rotateCannon(false);
        // }
        // if (event.key === 'ArrowRight') {
        //     cannon.rotateCannon(true);
        // }
        // if (event.key === ' '){
        //      fire = true;
             
        // }
        
        if (validGameKeys.includes(e.key)){
            game.updateGame(e.key)
        } else if(e.key == 'Enter') {
            e.preventDefault();
            gameStarted = true;
            let difficulty = document.getElementById('difficulty').value;
            let multiplayer = document.getElementById('multiplayer').value;
            let multValue = multiplayer == 'true' ? true : false;
            debugger;
            switch (difficulty) {
                case 'easy':
                    game = new Game(4, 2, clouds, multValue);
                    break;
                case 'medium':
                    game = new Game(6, 4, clouds, multValue);
                    break;
                case 'hard':
                    game = new Game(8, 6, clouds, multValue);
                    break;
                case 'impossible':
                    game = new Game(10, 10, clouds, multValue);
                    break;
                default:
                    break;
            }
            // game = new Game(shots,targets,clouds);
            game.startGame();
            startAnimating(30);
            // document.getElementById('start-button').innerHTML = 'Restart';
            canvas.classList.remove('lost', 'won')
        } else {
            return;
        }



    })

    // if (gameStarted){
    //     startAnimating(30);
    // }

    //Start game button
    // const startButton = document.getElementById('start-button');
    // startButton.addEventListener('click',(e) => {
        
    //     e.preventDefault();
    //     gameStarted = true;
    //     let difficulty = document.getElementById('difficulty').value;
    //     let multiplayer = document.getElementById('multiplayer').value;
    //     let multValue = multiplayer == 'true' ? true : false;
    //     debugger;
    //     switch (difficulty) {
    //         case 'easy':
    //             game = new Game(4, 2, clouds, multValue);
    //             break;
    //         case 'medium':
    //             game = new Game(6, 4, clouds, multValue);
    //             break;
    //         case 'hard':
    //             game = new Game(8, 6, clouds, multValue);
    //             break;
    //         case 'impossible':
    //             game = new Game(10, 10, clouds, multValue);
    //             break;
    //         default:
    //             break;
    //     }
    //     // game = new Game(shots,targets,clouds);
    //     game.startGame();
    //     startAnimating(30);
    //     document.getElementById('start-button').innerHTML = 'Restart';
    //     canvas.classList.remove('lost', 'won')
    // })

   
})

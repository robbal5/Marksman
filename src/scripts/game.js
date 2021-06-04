import { Target } from "./target";
import {Cannon } from './cannon';
import { Projectile } from "./projectile";
import {Cloud} from './clouds';
import { Sound } from './sounds';

export class Game {
    constructor(numShots, numTargets, clouds, multiplayer) {
        
        this.numShots = numShots;
        this.numTargets = numTargets;
        this.cannon = new Cannon();
        this.targets = [];
        this.projectiles = {};
        this.score = 0;
        this.currentPower = 50;
        this.currentAngle = 45;
        this.previousShotsHit = 1;
        this.clouds = clouds;
        this.sun = new Image();
        this.sun.src = './images/sun.png';
        this.firing = false;
        this.gameWon = false;
        this.gameLost = false;
        this.multiplayer = multiplayer;
        this.targets2 = [];
        this.projectiles2 = [];
        this.score2 = 0;
        this.currentPlayer = 1;
        this.numTargets2 = numTargets;
        this.winner = undefined;
        this.winningScore = undefined;
        this.shoot = new Sound('cannon-sound');
        this.win = new Sound('win');
        this.lose = new Sound('gameover');
        

    }

    startGame() {
        let positionsX = [100, 130, 160, 185, 210, 230, 255, 270, 285, 265]
        let positionsY = [10, 20, 30, 40 ,50, 10, 20, 30, 40, 50]
        let target;
        for (let i = 0; i < this.numTargets; i++) {
            let xPos = positionsX.shift();
            let yPos = positionsY.shift();
            this.targets.push(new Target(xPos, yPos, 1));
            if (this.multiplayer) {
                this.targets2.push(new Target(xPos, yPos, 2));
            }
        }
    }

    updateGame(key) {
        let newAngle;
        let newPower;
        if (key == 'ArrowLeft') {
            this.cannon.rotateCannon(false);
            newAngle = this.currentAngle + 1;
            if (newAngle <=90) {
                this.currentAngle = newAngle;
            } 
        }
        if (key == 'ArrowRight') {
            this.cannon.rotateCannon(true);
            newAngle = this.currentAngle - 1;
            if (newAngle >= 0) {
                this.currentAngle = newAngle;
            }
        }
        if (key == 'ArrowUp') {
            newPower = this.currentPower + 1;
            if (newPower <= 100) {
                this.currentPower = newPower;
            }
        }
        if (key == 'ArrowDown') {
            newPower = this.currentPower - 1;
            if (newPower >= 0) {
                this.currentPower = newPower;
            }
        }
        if (key == ' ' && this.numShots > 0) {
            
            if (this.multiplayer) {
                if (Object.values(this.projectiles).filter(proj => proj.state == 1).length < 1 &&
                    Object.values(this.projectiles2).filter(proj => proj.state == 1).length < 1){
                        
                        this.shoot.play();
                        this.firing = true;
                    }
            } else{
                this.shoot.stop();
                this.shoot.play();
                this.firing = true;
            }
        }
    }

    drawGame(canvas, ctx) {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.sun, canvas.width - 45, 0, 35, 35);
        ctx.fillStyle = 'darkolivegreen';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30)
        this.clouds.forEach((cloud) => {
            cloud.moveCloud(canvas, ctx);
            cloud.drawCloud(canvas, ctx);
        })
        if (this.firing) {
            let value = this.cannon.drawCannon(canvas, ctx, this.firing);
            if (value == 10) {
                if (this.multiplayer) {
                    if (this.currentPlayer == 1) {
                        this.projectiles[this.numShots] = new Projectile(this.currentPower, this.currentAngle);
                    } else {
                        this.projectiles2[this.numShots] = new Projectile(this.currentPower, this.currentAngle);
                        this.numShots -= 1;
                    }
                } else{
                    this.projectiles[this.numShots] = new Projectile(this.currentPower, this.currentAngle);
                    this.numShots -= 1;
                }

            }
            if (value == 0) {
                this.firing = false;
            } else {
                this.firing = true;
            }
        } else {
            this.cannon.drawCannon(canvas, ctx, this.firing);
        }
        
        if (this.multiplayer) {
            if (this.currentPlayer == 1) {
                this.targets.forEach((target) => {
                    if (target.state == 1) {
                        target.drawTarget(canvas, ctx);
                    }
                })
            } else {
                this.targets2.forEach((target) => {
                    if (target.state == 1) {
                        target.drawTarget(canvas, ctx);
                    }
                })
            }

        } else {
            this.targets.forEach((target) => {
                if (target.state == 1) {
                    target.drawTarget(canvas, ctx);
                }
            })
        }
       
        let that = this;
        let collision = false;
        let result;
        if (this.multiplayer) {
            if (this.currentPlayer == 1) {
                Object.values(this.projectiles).filter(proj => proj.state == 1).forEach((projectile) => {
                    result = projectile.checkCollisions(this.targets.filter(target => target.state == 1), canvas, that);
                    if (result) {
                        collision = true;
                    }
                    if (projectile.state == 1) {
                        projectile.drawProjectile(canvas, ctx, that);
                    }
                })

                if (collision) {

                    this.score += (10);
                    // this.previousShotsHit += 1;
                    this.numTargets -= 1;
                }
            } else {
                Object.values(this.projectiles2).filter(proj => proj.state == 1).forEach((projectile) => {
                    result = projectile.checkCollisions(this.targets2.filter(target => target.state == 1), canvas, that);
                    if (result) {
                        collision = true;
                    }
                    if (projectile.state == 1) {
                        projectile.drawProjectile(canvas, ctx, that);
                    }
                })

                if (collision) {

                    this.score2 += (10);
                    // this.previousShotsHit += 1;
                    this.numTargets2 -= 1;
                }
            }

        } else {
            Object.values(this.projectiles).filter(proj => proj.state == 1).forEach((projectile) => {
                result = projectile.checkCollisions(this.targets.filter(target => target.state == 1), canvas, that);
                if (result) {
                    collision = true;
                }
                if (projectile.state == 1) {
                    projectile.drawProjectile(canvas, ctx, that);
                }
            })

            if (collision) {

                this.score += (10 * this.previousShotsHit);
                this.previousShotsHit += 1;
                this.numTargets -= 1;
            }
        }


        //TEXT
        
        ctx.font = '9px Helvetica';
        
        if (this.multiplayer) {
            let player = this.currentPlayer == 1? 'Player 1' : 'Player 2';
            let score = this.currentPlayer == 1 ? this.score : this.score2;
            ctx.fillStyle = 'darkslategray';
            ctx.fillRect(0, 0, 55, 40);
            ctx.fillStyle = 'lightgray';
            ctx.fillRect(0, 0, 50, 35)
            ctx.fillStyle = 'black';
            ctx.fillText(`Angle: ${this.currentAngle}`, 5, 10)
            
            ctx.fillText(`Power: ${this.currentPower}`, 5, 20)
            ctx.fillText(player, 5, 30)
            ctx.fillText(`Shots: ${this.numShots}`, 10, 144);
            ctx.fillText(`Player 1: ${this.numTargets} Targets`, 90, 144);
            ctx.fillText(`Player 2: ${this.numTargets2} Targets`, 210, 144);
            ctx.fillStyle = 'white'
            ctx.fillText('Multiplayer', 120, 10)
        } else {
            ctx.fillStyle = 'darkslategray';
            ctx.fillRect(0, 0, 55, 30);
            ctx.fillStyle = 'lightgray';
            ctx.fillRect(0, 0, 50, 25);
            ctx.fillStyle = 'black';
            ctx.fillText(`Angle: ${this.currentAngle}`, 5, 10)
            ctx.fillText(`Power: ${this.currentPower}`, 5, 20)
            ctx.fillText(`Shots: ${this.numShots}`, 10, 144);
            ctx.fillText(`Targets: ${this.numTargets}`, 130, 144);
            ctx.fillText(`Score: ${this.score}`, 250, 144);
            ctx.fillStyle = 'white'
            ctx.fillText('Solo', 135, 10)
        }

        if (this.multiplayer) {
            // if (this.currentPlayer == 1){
                if (this.numTargets < 1) {
                    this.win.play();
                    this.gameWon = true;
                    this.winner = 'Player 1';
                    this.winningScore = this.score;
                } else if (this.numTargets2 < 1) {
                     
                        this.win.play();
                        this.gameWon = true;
                        this.winner = 'Player 2'
                        this.winningScore = this.score2;
                    
                }
            // }

            if (this.numShots == 0 && Object.values(this.projectiles2).filter(proj => proj.state == 1).length < 1) {
                if (this.score > this.score2) {
                    this.win.play();
                    this.gameWon = true;
                    this.winner = 'Player 1';
                    this.winningScore = this.score;
                } else if(this.score < this.score2) {
                    this.win.play();
                    this.gameWon = true;
                    this.winner = 'Player 2';
                    this.winningScore = this.score2;
                } else {
                    this.gameLost = true;
                    this.winningScore = this.score;
                }
            }  
        }
        else {
            if (this.numTargets < 1) {
                this.win.play();
                this.gameWon = true;
            } else if (this.numShots < 1 && Object.values(this.projectiles).filter(proj => proj.state == 1).length < 1) {
                this.lose.play();
                this.gameLost = true;
            }
        }

    }
}
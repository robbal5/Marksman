import { Target } from "./target";
import {Cannon } from './cannon';
import { Projectile } from "./projectile";
import {Cloud} from './clouds';

export class Game {
    constructor(numShots, numTargets, clouds) {
        
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
        this.sun.src = '../src/images/sun.png';
        this.firing = false;
        this.gameWon = false;
        this.gameLost = false;

    }

    startGame() {
        for (let i = 0; i < this.numTargets; i++) {
            this.targets.push(new Target());
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
        if (key == ' ') {
            this.firing = true;
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
                this.projectiles[this.numShots] = new Projectile(this.currentPower, this.currentAngle);
                this.numShots -= 1;
            }
            if (value == 0) {
                this.firing = false;
            } else {
                this.firing = true;
            }
        } else {
            this.cannon.drawCannon(canvas, ctx, this.firing);
        }
        // this.firing = this.cannon.drawCannon(canvas, ctx, this.firing);
        this.targets.forEach((target) => {
            if (target.state == 1) {
                target.drawTarget(canvas, ctx);
            }
        })
        let that = this;
        let collision = false;
        let result;
        Object.values(this.projectiles).filter(proj => proj.state == 1).forEach((projectile) => {
            result = projectile.checkCollisions(this.targets.filter(target => target.state == 1), canvas, that);
            if (result) {
                collision = true;
            }
            if (projectile.state == 1) {
                projectile.drawProjectile(canvas, ctx);
            }
        })

        if (collision) {
            
            this.score += (10 * this.previousShotsHit);
            this.previousShotsHit += 1;
            this.numTargets -= 1;
        }

        //TEXT
        ctx.font = '9px Helvetica';
        ctx.fillStyle = 'white';
        ctx.fillText(`Angle: ${this.currentAngle}`, 5, 10)
        ctx.fillText(`Power: ${this.currentPower}`, 5, 20)
        ctx.fillText(`Score: ${this.score}`, 5, 30)
        ctx.fillText(`Shots: ${this.numShots}`, 10, 144);
        ctx.fillText(`Targets: ${this.numTargets}`, 130, 144);
        ctx.fillText(`Score: ${this.score}`, 250, 144);

        if (this.numTargets < 1) {
            this.gameWon = true;
        } else if (this.numShots < 1 && Object.values(this.projectiles).filter(proj => proj.state == 1).length < 1){
            this.gameLost = true;
        }
    }
}
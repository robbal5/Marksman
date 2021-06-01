Welcome to the Marksman wiki!

## Background and Overview
As a kid I always loved to play Tanks. The physics were always fun to play with, and I loved experience of getting better and better as the game gave me more information per shot. Marksman is a spinoff of Tanks, allowing for user input to launch water balloons at characters across the map. Other factors such as number of targets, shots allowed, etc will be available for the user to adjust as well.

## Functionality and MVPs
In Marksman, users will be able to:
* Interactively shoot at targets on the canvas
* Provide input to modify the game experience
* Track progress as they play (won/loss)

In addition, this project will include: 
* Audio accompanying the gameplay
* Flexibility to adjust the color palette 
* Links to external Github and Linkedin pages

## Wireframes and File Structure
![image info](./srsc/images/js_wireframe.png)
* src
    * scripts
         * headerBar.js
         * game.js
         * shooter.js
         * projectile.js
         * target.js
         * game.js
         * scoreboard.js
         * gameFactors.js
         * music.js
    * assets
         * audio
              * fire.mp3
              * hit.mp3
              * miss.mp3
         * images
              * shooter.png
              * projectile.png
              * target.png
   * index.js
   * styles  
       * index.scss


## Architecture and Technology
The gameplay will be set up utilizing the canvas element. All user inputs will be available in standard HTML elements and dynamically adjust the created game. No backend or data will be required for this project. No external libraries will be utilized.

## Implementation Timeline
* Day 1: Assemble base files and HTML structure for the page
* Day 2: Build out base game logic and set up canvas svgs/images
* Day 3: Build in user interactivity and inputs
* Day 4: Finalize gameplay, overflow for missed/forgotten content

## Bonus
* Create multiplayer option
* Create multiple landscapes for the game to take place
Welcome to the Marksman wiki!

## Background and Overview
As a kid I always loved to play Tanks. The physics were always fun to play with, and I loved experience of getting better and better as the game gave me more information per shot. Marksman is a spinoff of Tanks, allowing for user input to fire a cannon at targets across the map. Other factors such as number of targets, shots allowed, etc will be available for the user to adjust as well.

## Functionality and MVPs
In Marksman, users can:
* Interactively shoot at targets on the canvas
* Provide input to modify the game experience (difficulty)
* Scalable play to allow for single player or multiplayer
![image info](./images/Marksman_Shot.gif)

In addition, this project will include: 
* Audio accompanying the gameplay
* Flexibility to adjust the color palette 
* Links to external Github and Linkedin pages

## Display and File Structure
![image info](./images/marksman_display.png)
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
The gameplay utilizing the HTML canvas element. All user inputs will be available in standard HTML elements and dynamically adjust the created game. No backend or data will be required for this project. No external libraries will be utilized.

## Code Snippets

### Custom Collision Detection    
Custom collision detection equations were used to ensure in sync canvas element movement and display for the user. Both canvas elements and canvas bordering needed to be taken into account. 
![image info](./images/collision_detection.png)

### Multiplayer Scalability
Logic was added to the core gameplay file and associated objects to allow for both singleplayer and multiplayer experienced based on a flexible user input.
![image info](./images/multiplayer.png)
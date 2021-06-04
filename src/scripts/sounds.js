//RESOURCE
//https://www.w3schools.com/graphics/game_sound.asp

export class Sound  {
    constructor(id) {
        this.sound = document.getElementById(id)
    }

    play() {
        this.sound.play();
    }

    stop () {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}
export const gameOver = (game, ctx, canvas) => {
    let finalText, color,  xPos;
    if (game.gameWon) {
        finalText = 'Great shooting, you won!';
        color = 'gold';
        canvas.classList.add('won');
        xPos = 65;
    } else {
        finalText = 'Sorry, you ran out of shots';
        color = 'red';
        canvas.classList.add('lost');
        xPos = 60;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '15px Fantasy';
    ctx.fillStyle = color;
    ctx.fillText(finalText, xPos , 70);
    if (game.gameWon) {
        ctx.font = '10px Fantasy';
        ctx.fillText(`Score: ${game.score}`, xPos + 10, 85)
        ctx.fillText(`Shots remaining: ${game.numShots}`, xPos + 80, 85);

    } else {
        ctx.font = '10px Fantasy';
        ctx.fillText('Why not give it another shot?', xPos + 20, 85)
    }


    


}
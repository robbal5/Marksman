export const gameOver = (game, ctx, canvas) => {
    let finalText, color,  xPos;
    if (game.multiplayer) {
        if (game.gameLost) {
            finalText = 'Looks like it was a tie!';
            color = 'gold';
            canvas.classList.add('won');
            xPos =75;
            let highscore = document.getElementById('highscore');
            let score = parseInt(highscore.innerHTML.split(' ')[2])
            debugger;
            if (score < game.winningScore) {
                highscore.innerHTML = `High Score: ${game.winningScore}`
            }
        } else {
            finalText = `Congrats ${game.winner}, great shooting!`;
            color = 'gold';
            canvas.classList.add('won');
            xPos = 40;
            let highscore = document.getElementById('highscore');
            let score = parseInt(highscore.innerHTML.split(' ')[2])
            debugger;
            if (score < game.winningScore) {
                highscore.innerHTML = `High Score: ${game.winningScore}`
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '15px Fantasy';
        ctx.fillStyle = color;
        ctx.fillText(finalText, xPos, 70);
        if (game.gameWon) {
            ctx.font = '10px Fantasy';
            ctx.fillText(`Player 1: ${game.score} points`, xPos + 10, 85)
            ctx.fillText(`Player 2: ${game.score2} points`, xPos + 130, 85);

        } else {
            ctx.font = '10px Fantasy';
            ctx.fillText('Why not give it another shot?', xPos + 5, 85)
        }
    } else {
        if (game.gameWon) {
            
            finalText = 'Great shooting, you won!';
            color = 'gold';
            canvas.classList.add('won');
            xPos = 65;
            let highscore = document.getElementById('highscore');
            let score = parseInt(highscore.innerHTML.split(' ')[2])
            
            if (score < game.score) {
                highscore.innerHTML = `High Score: ${game.score}`
            }
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



    


}
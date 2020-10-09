var scores, roundScore, activePlayer, gamePlaying, target, timeleft;
var GT = 0, stn = 0;
var a = 5, b = 5;
var m = 1;
var audio = new Audio("../Music/roll_it.mp3");
var music = new Audio("../Music/bg_music.mpeg");
init();

/* btn-help functionality: */
document.querySelector('.btn-help').addEventListener('click', function () {
        alert("Rules: \n1. This is the two player game (Using One Dice), each player has 5 life-lines.\n" + 
              "2. Player's has to set their \"STN(Set Target Number)\" before start of game using \"Get STN\" button and after that they has to set their target score.\n" +
              "3. If he/she got the STN, then he/she will score +5 points.\n" +
              "4. In all other cases he/she will score 0 points.\n" +
              "5. Each player has one chance to roll the dice at a time.\n" +
              "6. If the player fail to roll the dice within 10sec, then he/she will lose one life-line & score updated with -2 points.\n" +
              "7. The player who loses all life-line’s first he/she will be the loser & second player will win the game. Score is not considered in this case.\n" +
              "8. The player who reach the target point first, will be the winner.\n");
});

/* Set "Set Target Number" */
document.querySelector('.btn-get').addEventListener('click', function () {
    stn = Math.floor(Math.random() * 6) + 1;    
    document.getElementById('num').value = stn;
});

/* Avoid input from user in STN box */
function disable() {
    document.getElementById('num').disabled = true;
}

/* btn-set functionality */
document.querySelector('.btn-set').addEventListener('click', function () {
    if(stn>0){
        target = document.querySelector('.target-score').value; 
        if(target<0){
            alert("Target Score should be non-zero number.")
        }
        else if(target < 30){
            alert("Sorry!!! We suggest you to enter the target score greater than or equal to 30");
        }
        else{
            document.querySelector('.btn-start').style.display = 'block';
        }
    }
    else{
        alert("We suggest you to set the STN first!!!");
    }
});

/* btn-default functionality */
document.querySelector('.btn-default').addEventListener('click', function () {
    document.querySelector('.target-score').value = 100;
    target = 100;
});

/* btn-reset functionality */
document.querySelector('.btn-reset').addEventListener('click', function () {
    document.querySelector('.target-score').value = 0; 
    document.querySelector('.STN-1').value = 0;
});

/* btn-start functionality: */
document.querySelector('.btn-start').addEventListener('click', function () {
    if(target > 30 && stn > 0) {
        document.querySelector('.btn-roll').style.display = 'block';
        this.style.display = 'none';
        //Disable button functionality:
        document.getElementById('get-stn').disabled = true;
        document.getElementById('set').disabled = true;
        document.getElementById('reset').disabled = true;
        document.getElementById('def').disabled = true;
    }
    else {
            alert("Set target score & STN first before start of the game!");
    }
});

/* btn-roll funcationality: */
document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying) {
        if(target > 0 && stn > 0) {
            // Obtaning dice number:
            var dice1 = Math.floor(Math.random() * 6) + 1;

            //2. Display the dice:
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-1').src = '../Images/dice-' + dice1 + '.png';

            //Update the score:
            if(dice1 === stn) {
                //Obtained points:
                document.querySelector('#score-' + activePlayer).textContent = '+5';

                //Updating total score points:
                scores[activePlayer] = scores[activePlayer] + 5;
                document.querySelector('#current-' + activePlayer).textContent = scores[activePlayer];
                 
                //Detecting winner:
                if(scores[activePlayer] >= target) {
                    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                    document.getElementById('dice-1').style.display = 'none';
                    document.querySelector('.player-' + activePlayer + '-board').classList.add('winner');
                    document.querySelector('.player-' + activePlayer + '-board').classList.remove('active');
                    gamePlaying = false;
                    clearInterval(GT);
                }
                //Change active player:
                nextPlayer();
            }
            else{
                //Change active player:
                nextPlayer();
            }
            document.querySelector('#score-' + activePlayer).textContent = '00';
        }
        else {
            alert("Set target score & STN first before start of the game!");
        }
    }    
});

/* Timer function */
function time() {
    timeleft = 10;
    GT = setInterval(function(){
    timeleft--;
    document.getElementById("countdowntimer").textContent = timeleft;
    if(timeleft == 1){
        if(document.getElementById('roll'). clicked == true){
            nextPlayer();
        }
        else{
            //For Player-1:
            if(activePlayer == 1){
                //Obtained points:
                document.querySelector('#score-1').textContent = '-2';

                //Updating total score points:
                scores[1] = scores[1] - 2;
                document.querySelector('#current-1').textContent = scores[1];
                
                //Remove one life:
                document.querySelector('.life1-'+a).style.display = 'none';
                a--;
                if(a == 0){
                    document.querySelector('#name-2').textContent = 'Winner!';
                    document.getElementById('dice-1').style.display = 'none';
                    document.querySelector('.player-2-board').classList.add('winner');
                    gamePlaying = false;
                    clearInterval(GT);
                }
            }
            //For Player-2:
            if(activePlayer == 2){
                //Obtained points:
                document.querySelector('#score-2').textContent = '-2';

                //Updating total score points:
                scores[2] = scores[2] - 2;
                document.querySelector('#current-2').textContent = scores[2];
                
                //Remove one life:
                document.querySelector('.life2-'+b).style.display = 'none';  
                b--;
                if(b == 0){
                    document.querySelector('#name-1').textContent = 'Winner!';
                    document.getElementById('dice-1').style.display = 'none';
                    document.querySelector('.player-1-board').classList.add('winner');
                    gamePlaying = false;
                    clearInterval(GT);
                }
            }
        }
    }
    if(timeleft > 0)
        clearInterval();
    if(timeleft == 0)
        nextPlayer();
    }, 1000);
}

/* Roll dice music: */
function play() {
    audio.play();
}

/* Background Music: */
function sound() {
    if(m == 1){
        music.play();
        m = 0;
    }
    else{
        music.pause();
        m = 1;
    }
}

/* btn-new functionality: */
document.querySelector('.btn-new').addEventListener('click', function () {
    scores = [0, 0, 0];
    activePlayer = 1;
    roundScore = 0;
    clearInterval(GT);
    timeleft = 10;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('num').value = 0;
    
    //Remove button disability:
    document.getElementById('get-stn').disabled = false;
    document.getElementById('set').disabled = false;
    document.getElementById('reset').disabled = false;
    document.getElementById('def').disabled = false;
    
    //Display complete lifeboard:
    document.querySelector('.life1-1').style.display = 'block';
    document.querySelector('.life1-2').style.display = 'block';
    document.querySelector('.life1-3').style.display = 'block';
    document.querySelector('.life1-4').style.display = 'block';
    document.querySelector('.life1-5').style.display = 'block';
    document.querySelector('.life2-1').style.display = 'block';
    document.querySelector('.life2-2').style.display = 'block';
    document.querySelector('.life2-3').style.display = 'block';
    document.querySelector('.life2-4').style.display = 'block';
    document.querySelector('.life2-5').style.display = 'block';
    
    //Set the layout for new:
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-start').style.display = 'none';
    document.querySelector('.target-score').value = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-2').textContent = '0';
    document.getElementById('score-1').textContent = '00';
    document.getElementById('score-2').textContent = '00';
    document.getElementById('name-1').textContent = 'Player 1';
    document.getElementById('name-2').textContent = 'Player 2';
    document.querySelector('.player-1-board').classList.remove('winner');
    document.querySelector('.player-2-board').classList.remove('winner');
    document.querySelector('.player-1-board').classList.remove('active');
    document.querySelector('.player-2-board').classList.remove('active');
    document.querySelector('.player-1-board').classList.add('active');
});

/* Change player activity */
function nextPlayer() {
    //Next player:
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
    roundScore = 0;
    timeleft = 10;
    
    //Shift the activity symbol:
    document.querySelector('.player-1-board').classList.toggle('active');
    document.querySelector('.player-2-board').classList.toggle('active');
}

/* Start a new game */
function init() {
    scores = [0, 0, 0];
    activePlayer = 1;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-start').style.display = 'none';

    //Set the board to initial position:
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-2').textContent = '0';
    document.getElementById('score-1').textContent = '00';
    document.getElementById('score-2').textContent = '00';
    document.getElementById('name-1').textContent = 'Player 1';
    document.getElementById('name-2').textContent = 'Player 2';
    document.querySelector('.player-1-board').classList.remove('winner');
    document.querySelector('.player-2-board').classList.remove('winner');
    document.querySelector('.player-1-board').classList.remove('active');
    document.querySelector('.player-2-board').classList.remove('active');
    document.querySelector('.player-1-board').classList.add('active');
}
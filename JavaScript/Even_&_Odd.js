var scores, roundScore, activePlayer, gamePlaying, target, timeleft;
var GT = 0;
var a = 5, b = 5 ;
var m = 1;
var audio = new Audio("../Music/roll_it.mp3");
var music = new Audio("../Music/bg_music.mpeg");
init();

/* Help button */
document.querySelector('.btn-help').addEventListener('click', function () {
        alert("Rules:\n1.Two player game (Using Two Dice). Each player has 5 life."+
        "\n2.Each player has to achieve the respective sum as Player 1 have to achieve the \"Even Sum\" and Player 2 have to achieve the \"Odd Sum\" by rolling two dice simultaneously, if he/she will get the sum, he/she will get \"+5\" points each or else he/she will get \"-2\" points."+
       "\n3.Player has only one chance to roll the dice at a time."+
       "\n4.If the player fail to roll the dice within 10sec then player will loose one life and get \"-2\" points."+
       "\n5.If player looses all of its life then the other player will be the winner."+
       "\n6.The player who reaches the target point 1st that player will be the winner."
);
});


/* Set target number */
document.querySelector('.btn-set').addEventListener('click',function(){
    
        target=document.querySelector('.target-score').value;
        if(target<0){
            alert("Target score should be non-zero number.");
        }
        else if(target<30){
            alert("Please enter the target score greater than or equal to 30.");
        }
        else{
            document.querySelector('.btn-start').style.display='block';
        }
    
    
});

/*Default button */
document.querySelector('.btn-default').addEventListener('click', function () {
    document.querySelector('.target-score').value = 50;
    target = 50;
});

/* Reset button */
document.querySelector('.btn-reset').addEventListener('click', function () {
    document.querySelector('.target-score').value = 0; 
});

/* Start button */
document.querySelector('.btn-start').addEventListener('click', function () {
    if(target > 0 ) {
        document.querySelector('.btn-roll').style.display = 'block';
        this.style.display = 'none';
        //Disable button functionality:
        document.getElementById('set').disabled = true;
        document.getElementById('reset').disabled = true;
        document.getElementById('def').disabled = true;
    }
    else {
            alert("Set target score first before start of the game!");
    }
});


/* Roll button */
document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying) {
     
            // Obtaning dice number:
            var dice1 = Math.floor(Math.random() * 6) + 1;
             var dice2 = Math.floor(Math.random() * 6) + 1;

            //2. Display the dice:
            document.getElementById('dice2').style.display = 'block';
            document.getElementById('dice6').style.display = 'block';
            document.getElementById('dice2').src = '../Images/dice-' + dice1 + '.png';
            document.getElementById('dice6').src = '../Images/dice-' + dice2 + '.png';
            
            var dice3= dice1 + dice2;
            
         
        
            //Update the score:
        
            if(activePlayer==1) {
                
                if((dice3)%(2)==0){
                   
                    //Obtained points:
                document.querySelector('#score-1').textContent = '+5';

                //Updating total score points:
                scores[1] = scores[1] + 5;
                document.querySelector('#current-1').textContent = scores[1];
                    //Detecting winner:
                if(scores[1] >= target) {
                    document.querySelector('#name-1').textContent = 'Winner!';
                    document.getElementById('dice2').style.display = 'none';
                    document.getElementById('dice6').style.display = 'none';
                    document.querySelector('.player-1-board').classList.add('winner');
                    document.querySelector('.player-1-board').classList.remove('active');
                    gamePlaying = false;
                    clearInterval(GT);
                }
                     
                    
                }
                
                 else{
                     //Obtained points:
                document.querySelector('#score-1').textContent = '-2';

                //Updating total score points:
                scores[1] = scores[1] - 2;
                document.querySelector('#current-1').textContent = scores[1];
                      
                 
                      
                 }
                       //Change active player:
                nextPlayer();  
                document.querySelector('#score-2').textContent = '00';
            }
              
        
        else
            {
                if((dice3)%(2)==1){
                     
                      //Obtained points:
                document.querySelector('#score-2').textContent = '+5';

                //Updating total score points:
                scores[2] = scores[2] + 5;
                document.querySelector('#current-2').textContent = scores[2];
                    //Detecting winner:
                if(scores[2] >= target) {
                    document.querySelector('#name-2').textContent = 'Winner!';
                    document.getElementById('dice2').style.display = 'none';
                    document.getElementById('dice6').style.display = 'none';
                    document.querySelector('.player-2-board').classList.add('winner');
                    document.querySelector('.player-2-board').classList.remove('active');
                    gamePlaying = false;
                    clearInterval(GT);
                }
                }
                
                else{
                         //Obtained points:
                document.querySelector('#score-2').textContent = '-2';

                //Updating total score points:
                scores[2] = scores[2] - 2;
                document.querySelector('#current-2').textContent = scores[2];
                      
                } 
                 //Change active player:
                nextPlayer();  
                    document.querySelector('#score-1').textContent = '00';
                }   
            }    
    });

/* Timer function */
function time() {
    timeleft = 10;
    GT = setInterval(function(){
    timeleft--;
    document.getElementById('countdowntimer').textContent = timeleft;
    if(timeleft == 1){
        if(document.getElementById('roll').clicked == true){
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
                    document.getElementById('dice2').style.display = 'none';
                     document.getElementById('dice6').style.display = 'none';
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
                    document.getElementById('dice2').style.display = 'none';
                     document.getElementById('dice6').style.display = 'none';
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

/* Music */
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


/* New button */
document.querySelector('.btn-new').addEventListener('click', function () {
    scores = [0, 0, 0];
    activePlayer = 1;
    roundScore = 0;
    clearInterval(GT);
    timeleft = 10;
    gamePlaying = true;
    
    document.querySelector('.dice-2').style.display = 'none';
    document.querySelector('.dice-6').style.display = 'none';
   
    //Remove button disability:
   
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
    
    /* Shift the activity symbol */
    document.querySelector('.player-1-board').classList.toggle('active');
    document.querySelector('.player-2-board').classList.toggle('active');
}

/* Start a new game */
function init() {
    scores = [0, 0, 0];
    activePlayer = 1;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice-2').style.display = 'none';
    document.querySelector('.dice-6').style.display = 'none';
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
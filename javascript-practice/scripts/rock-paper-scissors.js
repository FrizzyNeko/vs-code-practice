 let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        ties: 0,
        loses: 0
      };
  
  

    let isAutoPlaying = false;
    let intervalID;
    function autoPlay() {
      if (!isAutoPlaying) {
        intervalID = setInterval(function() {
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        document.querySelector(".js-autoplay-button").innerHTML = 'Stop Auto Play';
      } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
        document.querySelector(".js-autoplay-button").innerHTML = 'Auto Play';
      }

    }
    function playGame(myMove) {
        const computerMove = pickComputerMove();  
        
        let result = '';

        if(myMove === 'rock'){
          computerMove === myMove ? result = 'Tie.' : computerMove === 'scissors' ? result = 'You win!' : result = 'You lose.';
        }
        if(myMove === 'paper'){
          computerMove === myMove ? result = 'Tie.' : computerMove === 'rock' ? result = 'You win!' : result = 'You lose.';
        }
        if(myMove === 'scissors'){
          computerMove === myMove ? result = 'Tie.' : computerMove === 'rock' ? result = 'You lose.' : result = 'You win!';
        }

        if (result === 'You win!') {
          score.wins ++;
        } else if (result === 'Tie.') {
          score.ties ++;
        } else if (result === 'You lose.'){
          score.loses ++;
        }
        
        localStorage.setItem('score', JSON.stringify(score));



        updateScoreElement(); 

        const movesElement = document.querySelector('.js-moves')
        .innerHTML = `You <img src="images/${myMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;

        document.querySelector('.js-result')
        .innerHTML = result;
    }

    function updateScoreElement(){
      document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins} Ties: ${score.ties} Loses: ${score.loses}`; 
    }

    function pickComputerMove() {
          const randomNumber = Math.random();
          let computerMove = randomNumber <= 0.3 ? 'rock' : randomNumber <= 0.6 ? 'paper' : 'scissors';
          return computerMove;
    }
    function reset(){
      score.wins = 0;
      score.ties = 0;
      score.loses = 0;
      localStorage.removeItem('score');
      updateScoreElement();
    }
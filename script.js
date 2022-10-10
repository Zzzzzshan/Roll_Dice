'use strict';

//Selcting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions
const inIt = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
inIt();

const switchPlayer = function () {
  //Switch to the next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //By default here the player will be  0(which is player 1) and will change accordingly to player 1( which is player 2).
  activePlayer = activePlayer === 0 ? 1 : 0;

  //here toggle will remove the class player--active if player 0 have or if not it will add to it and vise versa for the player 1.
  //Bascally, the css properties effect will be shift from player 0 to 1 or 1 to 0. Based on the player which is playing at the moment
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);

    //2.Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //Use to display the multiple images that we have in the dice value field. As the name of the images also contains number from 1 - 6. So the value we have in dice will also be the value of the images of the dice

    //Check for rolled 1
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice; //Value of the dice will be added to the current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // This will display te current score of both the players
      // current0EL.textContent = currentScore; //This is only applicable for the player 1
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to the active player score
    //Score[1]= score[1] + currentScore
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check score is already >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document //Addding the victory colors here
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document //Here we are removing the previous colors
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Swtich the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', inIt);

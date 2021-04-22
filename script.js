"use strict";

// Selecting elements
const sectionLayerP0 = document.querySelector(".player--0");
const sectionLayerP1 = document.querySelector(".player--1");
const totalScoreP0 = document.querySelector("#score--0");
const totalScoreP1 = document.getElementById("score--1");
const roundScoreP0 = document.getElementById("current--0");
//CURRENT ROUND SCORE (Player 1)
const roundScoreP1 = document.getElementById("current--1");
//CURRENT ROUND SCORE (Player 2)
const diceIMG = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
//NEW GAME BUTTON
const btnRoll = document.querySelector(".btn--roll");
//ROLL DICE BUTTON
const btnHold = document.querySelector(".btn--hold");
//HOLD SCORE sBUTTON

let totalScoresArray, currentRoundScore, activePlayer, playing;

// Initialize the game function
function init() {
  // Position 0 = Player 0, Position 1 = Player 1
  totalScoresArray = [0, 0];
  // Score for Current Round
  currentRoundScore = 0;
  // Player0 =  activePlayer = 0, Player1 =  activePlayer = 1,
  activePlayer = 0;
  // If the game is started or not
  playing = true;

  // Reset All Scores
  totalScoreP0.textContent = 0;
  totalScoreP1.textContent = 0;
  roundScoreP0.textContent = 0;
  roundScoreP1.textContent = 0;

  // Hide Dice at beginning
  diceIMG.classList.add("hidden");

  // Remove Winner's background
  sectionLayerP0.classList.remove("player--winner");
  sectionLayerP1.classList.remove("player--winner");

  // Make player0 active player
  sectionLayerP0.classList.add("player--active");
  sectionLayerP1.classList.remove("player--active");
}
//Initialize the game
init();

function switchPlayer() {
  // Change Current Round Score of the current Active Player to 0 for the next round
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Switch to next Active Player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Reset Current Round Score
  currentRoundScore = 0;
  // Section P1 & P2 switch player-active class
  sectionLayerP0.classList.toggle("player--active");
  sectionLayerP1.classList.toggle("player--active");
}

// Rolling Dice Functional (ROLL DICE BUTTON)
btnRoll.addEventListener("click", function () {
  // 0. check if the game is finished
  if (playing) {
    // 1. Generate Random Dice Roll Num
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display Dice Roll Num
    diceIMG.classList.remove("hidden");
    diceIMG.src = `dice-${dice}.png`;
    // 3. Check if the Dice Roll Num is 1
    if (dice !== 1) {
      // Add Dice Roll Num to Current Round Score
      currentRoundScore += dice;
      // Change Current Round Score for Active Player
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentRoundScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold Score Functional (HOLD BUTTON)
btnHold.addEventListener("click", function () {
  // 0. check if the game is finished
  if (playing) {
    // 1. Add Current Round Score to Total Score (active player)
    totalScoresArray[activePlayer] += currentRoundScore;
    // 2. Display on the screen
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScoresArray[activePlayer];

    // 3. Check if current active player's score is >=100
    if (totalScoresArray[activePlayer] >= 100) {
      // Hide Dice at beginning
      diceIMG.classList.add("hidden");
      // Finish the game (Change classes)
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// New Game Button
btnNew.addEventListener("click", init);

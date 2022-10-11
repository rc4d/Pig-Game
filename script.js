'use strict';

// Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0ScoreEl = document.querySelector("#current--0");
const current1ScoreEl = document.querySelector("#current--1");

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let currentScore, activePlayer, total, isPlaying;

const init = () => {
    currentScore = 0;
    activePlayer = 0;
    total = [0,0];
    isPlaying = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0ScoreEl.textContent = 0;
    current1ScoreEl.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    currentScore = 0;
};

btnRoll.addEventListener("click", function(){
    if(isPlaying){
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove("hidden");
        diceEl.src = `images/dice-${dice}.png`;

        if(dice !== 1){
            currentScore+=dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }else{
            switchPlayer();
        }
    }
    
});

btnHold.addEventListener("click", function() {
    if(isPlaying)
    {
        total[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = total[activePlayer];
        if(total[activePlayer] >= 100){
            isPlaying = false;
            diceEl.classList.add("hidden");
            currentScore = 0;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        }else{
            switchPlayer();
        }
    }
})

btnNew.addEventListener("click", init);
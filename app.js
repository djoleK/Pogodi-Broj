/*Kako radi igra:

- Igrac mora da pogodi broj izmedju max i min
- Ima ogranicen broj pokusaja
- Igra obavestava igraca o preostalim pokusajima
- Obavestava igraca koji je tacan odgovor ako izgubi
- Omoguci igracu da igra ponovo

*/

// Game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elementi

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign Ui min i max

minNum.textContent = min;
maxNum.textContent = max;

// Play again ivent listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
    guessInput.value = "Unesi broj...";
  }
});
// Listen for guess

guessBtn.addEventListener("click", igra);
guessInput.addEventListener("keypress", igra2);

function igra() {
  let guess = parseInt(guessInput.value);

  // validacija

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Molim unesi broj između ${min} i ${max}`, "red");
  } else {
    // proveri da li je dobitni

    if (guess === winningNum) {
      //game over pobeda
      gameOver(true, `${winningNum} je tačan broj! Pobedio si!`);
    } else {
      // pogresan broj
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        //game over izgubio
        gameOver(
          false,
          `Game Over, izgubio si. Tačan broj je broj ${winningNum}.`
        );
      } else {
        // igra se nastavlja - pogresan odgovor

        // promeni border
        guessInput.style.borderColor = "red";

        // clear input
        guessInput.value = " ";
        //reci korisniku da je pogresio
        setMessage(
          `${guess} nije tačan broj. Ostalo ti je još ${guessesLeft} da pokušaš.`,
          "red"
        );
      }
    }
  }
}

function igra2(e) {
  if (e.keyCode === 13 && guessInput.value.length > 0) {
    igra();
  }
}

// game over

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // iskljuci input
  guessInput.disabled = true;
  // promeni border
  guessInput.style.borderColor = color;
  //text boja
  message.style.color = color;
  //javi korisniku da je pobedio
  setMessage(msg);

  // Igraj ponovo?
  guessBtn.value = "Igraj Ponovo";
  guessBtn.className += "play-again";
}

// dobitni broj

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//postavi poruku

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

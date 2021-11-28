// unordered list where the players guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");
//"Guess" button
const button = document.querySelector(".guess");
//Text input where player will guess the letter
const letterInput = document.querySelector (".letter");
//Empty paragraph where word will appear
const  wordInProgress = document.querySelector(".word-in-progress");
//Paragraph where remaining guesses display
const remaining = document.querySelector(".remaining");
// The span inside the paragraph where remaining guesses will appear
const remainingSpan = document.querySelector(".remaining_span");
//Empty paragraph where messages will appear when player guesses a letter
const message = document.querySelector(".message");
//Hidden button that will prompt player to play again
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const updateWord = function (word) {
    const letterArray = [];
    for (const letter of word) {
          console.log(letter);
          letterArray.push("●");
    }
        wordInProgress.innerText=letterArray.join("");
    };
    updateWord(word);

  button.addEventListener ("click", function(e) {
      e.preventDefault();
      const guess = letterInput.value;
      //console.log(guess);

    message.innerText = "";
   const goodGuess =  validateInput (guess);
   //console.log(goodGuess);
   if (goodGuess) {
     makeGuess(guess);
   }  
     letterInput.value= "";
  });  

  const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ) {
      message.innerText = "Please enter a letter";
    } else if ( input.length > 1) {
    message.innertext = "Please enter only one letter";
    } else if (!input.match(acceptedLetter)) {
      message.innerText = "Please guess a letter from A-Z";
    } else {
      return input;
    }
  };

  const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
      message.innerText = "You already guessed that letter"
    } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
    }
  }
   
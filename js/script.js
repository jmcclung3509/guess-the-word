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
const remainingSpan = document.querySelector(".remaining span");
//Empty paragraph where messages will appear when player guesses a letter
const message = document.querySelector(".message");
//Hidden button that will prompt player to play again
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await res.text();
   const wordArray = data.split("\n");
     const randomIndex = Math.floor(Math.random() * wordArray.length);
     word = wordArray[randomIndex].trim();
     updateWord(word);
};

  getWord();


const updateWord = function (word) {
    const letterArray = [];
    for (const letter of word) {
          console.log(letter);
          letterArray.push("●");
    }
        wordInProgress.innerText=letterArray.join("");
    };
    

  button.addEventListener ("click", function(e) {
      e.preventDefault();
      const guess = letterInput.value;
      console.log(guess);
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
      message.innerText = "You already guessed that letter."
    } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
      showGuessedLetters();
      countGuesses(guess);
      updatedWordInProgress(guessedLetters);
    }
  }
   
  const showGuessedLetters = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
      const li = document.createElement ("li");
      li.innerText = letter;
    guessedLettersList.append(li);
  }
};

const updatedWordInProgress  = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  //console.log(wordArray);
  const showWord = [];
  for (const letter of wordArray) {
   if (guessedLetters.includes(letter)) {
      showWord.push(letter.toUpperCase());
    } else {
      showWord.push ("●");
    }
  }
    wordInProgress.innerText = showWord.join("");
  guessedWord();
};

const countGuesses = function(guess) {
  const wordUpper = word.toUpperCase();
  if (!wordUpper.includes(guess)) {
    message.innerText = "Sorry the word does not include that letter";
    remainingGuesses -= 1;
  } else {
    message.innerText = "Yay! You guessed a correct letter";
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `I'm sorry you have no more guesses. The word was <span class = highlight> ${word}</span>`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingSpan.innerText =  `${remainingGuesses} more guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses left`;
  }
 };


const guessedWord = function () {
   if (word.toUpperCase() === wordInProgress.innerText) {
     message.classList.add("win");
     message.innerHTML = `<p class = "highlight"> You guessed the correct word! Congrats!</p>`;
   startOver();
   }
};

const startOver = function () {
  button.classList.add("hide");
  remaining.classList.add("hide");
  guessedLettersList.classList.add("hide");
  playAgain.classList.remove("hide");
};

playAgain.addEventListener ("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
   remainingGuesses = 8;
   message.innerText = "";
  guessedLettersList.innerText = "";
  remainingSpan.innerText = `${remainingGuesses} guesses left`;
  getWord();

  button.classList.remove("hide");
  remaining.classList.remove("hide");
  guessedLettersList.classList.remove("hide");
  playAgain.classList.add("hide");
  
});
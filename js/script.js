// unordered list where the players guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
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

const updateWord = function (word) {
    const wordLetters = [];
    for (const letter of word) {
        
        console.log(letter);
        wordLetters.push ("●");
       
    }
    wordInProgress.innerText = wordLetters.join("");

};
updateWord(word);

button.addEventListener ("click", function(e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";

});
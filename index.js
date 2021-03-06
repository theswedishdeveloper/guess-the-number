// Read instructions. And remove this line.

const input = document.getElementById("user-input");
const message = document.getElementById("message");
const restartBtn = document.getElementsByTagName("button")[0];
const highScore = document.getElementById("high_score");
const numbers = /^[0-9]+$/;
const correctGuessText = "You are correct!";
let wrongAttempts = 0;
let guesses = [];
let secretNumber = randomInt(101);
//call on our functions :)
setHighScore();
setDefaultMessage();
registerListeners();

function setDefaultMessage() {
    message.innerHTML = "Guess a number between 0 and 100";
}

function randomInt(n) {
    return Math.floor(Math.random() * n);
}

function setHighScore(newHighScore) {
    high_score.innerHTML = (newHighScore ? "New High Score: " : "High Score: ") + localStorage.getItem("best_result");
}

function getUserGuess() {
    const userInput = input.value;
    if (!userInput.match(numbers)) {
        alert("Only numbers allowed!");
        return;
    }
    return parseInt(input.value, 10);
}

function clearInput() {
    input.value = "";
}

function setMessage(userGuess) {
    if (userGuess > secretNumber) {
        message.innerHTML = "Too high!";
        guesses.push({ guess: userGuess, tooHigh: true });
    } else if (userGuess < secretNumber) {
        message.innerHTML = "Too low!";
        guesses.push({ guess: userGuess, tooHigh: false });
    } else {
        message.innerHTML = correctGuessText + " Wrong Attempts: " + wrongAttempts + "!<br>Attempts: "
        for (let x = 0; x < guesses.length; x++) {
            message.innerHTML += "<span style='color: " + (guesses[x].tooHigh ? "red" : "green") +
                "';>" + guesses[x].guess + ((x < guesses.length - 1) ? "," : "") + " </span>";
        }
        let newHighScore = false;
        if (!localStorage.getItem("best_result") || localStorage.getItem("best_result") > wrongAttempts) {
            localStorage.setItem("best_result", wrongAttempts);
            newHighScore = true;
        }
        setHighScore(newHighScore); //update high score :)
        restartBtn.style.visibility = "visible";
        input.disabled = true;
    }
    if (!message.innerHTML.includes(correctGuessText)) {
        wrongAttempts++;
    }
    clearInput();
}

function registerListeners() {
    document.addEventListener("keyup", function(e) {
        if (e.key === "Enter") {
            setMessage(getUserGuess());
        }
    });
    restartBtn.addEventListener("click", function() {
        resetGame();
    })
}

function resetGame() {
    clearInput();
    setDefaultMessage();
    secretNumber = randomInt(101);
    guesses = [];
    wrongAttempts = 0;
    input.disabled = false;
    restartBtn.style.visibility = "hidden";
}
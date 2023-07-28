const statusDisplay = document.querySelector(".game-status");

// Game layout
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

//Wining message
const winningMessage = () => `Player ${currentPlayer} has won!`;

//draw message
const drawMessage = () => `Game ended in a draw!`;

//turn 
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

//ways to win
const winningConditions = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

//Each box played 
function handleCellPlayed(clickedCell, clickedCellIndex) {
gameState[clickedCellIndex] = currentPlayer;
clickedCell.innerHTML = currentPlayer;
}  
function handlePlayerChange() {
currentPlayer = currentPlayer === "X" ? "O" : "X";
statusDisplay.innerHTML = currentPlayerTurn();
}


// switches between the 2 players 
function handleResultValidation() {
let roundWon = false;
for (let i = 0; i <= 7; i++) {
const winCondition = winningConditions[i];
const a = gameState[winCondition[0]];
const b = gameState[winCondition[1]];
const c = gameState[winCondition[2]];
if (a === "" || b === "" || c === "") continue;
//checks for winner
if (a === b && b === c) {
roundWon = true;
break;
}
}


if (roundWon) {
statusDisplay.innerHTML = winningMessage();
gameActive = false;
return;
}

//checks for draw
const roundDraw = !gameState.includes("");
if (roundDraw) {
statusDisplay.innerHTML = drawMessage();
gameActive = false;
return;
}

handlePlayerChange();
}
// clicked box's
function handleCellClick(clickedCellEvent) {
const clickedCell = clickedCellEvent.target;
const clickedCellIndex = parseInt(clickedCell.getAttribute("data-box-index"));

if (gameState[clickedCellIndex] !== "" || !gameActive) return;

handleCellPlayed(clickedCell, clickedCellIndex);
handleResultValidation();
}
// Reset the game 
function handleRestartGame() {
gameActive = true;
currentPlayer = "X";
gameState = ["", "", "", "", "", "", "", "", ""];
statusDisplay.innerHTML = currentPlayerTurn();
document.querySelectorAll(".box").forEach((box) => (box.innerHTML = ""));
}

document
.querySelectorAll(".box")
.forEach((cell) => cell.addEventListener("click", handleCellClick));
document
.querySelector(".game-restart")
.addEventListener("click", handleRestartGame);

//Gives a number 1 though 10 at random 
function generateMultiplicationQuestion() {
const num1 = Math.floor(Math.random() * 10) + 1;
const num2 = Math.floor(Math.random() * 10) + 1;
return `${num1} * ${num2}`;
}

// Makes sure answer is correct
function validateMultiplicationAnswer(answer, question) {
const [num1, num2] = question.split(" * ");
return parseInt(answer) === parseInt(num1) * parseInt(num2);
}
// Message if answer is correct or incorrect
function askMultiplicationQuestion() {
const question = generateMultiplicationQuestion();
const userAnswer = prompt(
`Before you play your turn, answer this: ${question}`
    );
    if (
    userAnswer === null ||
    userAnswer.trim() === "" ||
    !validateMultiplicationAnswer(userAnswer, question)
    ) {
    alert("Incorrect answer! Your turn is skipped.");
    return false;
    }
    return true;
}

function handleCellClick(clickedCellEvent) {
const clickedCell = clickedCellEvent.target;
const clickedCellIndex = parseInt(clickedCell.getAttribute("data-box-index"));

if (gameState[clickedCellIndex] !== "" || !gameActive) return;

if (askMultiplicationQuestion()) {
handleCellPlayed(clickedCell, clickedCellIndex);
handleResultValidation();
} else {
handlePlayerChange();
}
}
const X_Class = "x";
const CIRCLE_Class = "circle";
let circleTurn;
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const winningMessageText = document.getElementById("winningMessage");
const winningMessage = document.querySelector("[data-winning-message-text]");
const restartButton = document.getElementById("restartButton");

startGame();
restartButton.addEventListener("click", startGame);
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_Class);
    cell.classList.remove(CIRCLE_Class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageText.classList.remove("show");
  winningMessageText.classList.add("hide");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_Class : X_Class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_Class);
  board.classList.remove(CIRCLE_Class);
  if (!circleTurn) {
    board.classList.add(X_Class);
  } else {
    board.classList.add(CIRCLE_Class);
  }
}
function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    winningMessage.innerText = `${circleTurn ? "O`s" : "X`s"} Wins!`;
  }
  winningMessageText.classList.remove("hide");
  winningMessageText.classList.add("show");
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_Class) || cell.classList.contains(CIRCLE_Class)
    );
  });
}

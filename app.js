const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

// WINING POSITION
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// let's create a function to initialise the game.

// -> 1
function initGane() {
  // Default set current Player = X.
  currentPlayer = "X";

  // Initially game grid is empty.
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  // UI pr empty bhi karna padega boxes ko.
  boxes.forEach((box, index) => {
    box.innerText = "";

    // After update the boxes curser pointer will be active.
    boxes[index].style.pointerEvents = "all";

    // initialise box with css properties again.( remove green color.)
    // box.classList = `box boxes ${index +1}`;
    box.classList.remove("win"); // Remove the 'win' class if it's there
    box.classList.add(`box`, `boxes`, `${index + 1}`); // Add the relevant classes back
  });

  // hide new game button.
  newGameBtn.classList.remove("active");

  // Visible Current Player.
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Calling the Function.
initGane();

// Swap function.
function swapTurn() {
  // if current state is -> "X", then change the current state to -> "0", after that change the current state to -> "X".
  if (currentPlayer === "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }

  // UI Update
  gameInfo.innerText = `current Player - ${currentPlayer}`;
}

// CHECK GAME IS OVER FUNCTION.

// --> 4.
function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    // All 3 boxes should be non-Empty and exactly same in value.
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // Check if Winnwr is "X"
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "0";
      }

      // Desable pointer event.
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // now we know X/0 is a Winner.
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //   it means we have a winner.
  if (answer !== "") {
    // show the winner -> X/0.
    gameInfo.innerText = `winner player - ${answer}`;
    // Active NEW GAME button. 
    newGameBtn.classList.add("active");
    return;
  }

  // When there is no Winner. (means-> TIE).
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== ""){
      fillCount++;
    } 
     
  });

  // board is filled game is TIE
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied !";
    // Enable NEW GAME Button.
    newGameBtn.classList.add("active");
  }
}

// HANDLE CLICK EVENTS.

// --> 3
function handleClick(index) {
  // Check clicked boxed is empty or not.( if box empty then do further processing, otherwise not.)
  if (gameGrid[index] === "") {
    // Update the boxes ( X or 0). -> this uppdate is shown on the UI.
    boxes[index].innerText = currentPlayer;

    // this code is change the inner ligic.
    gameGrid[index] = currentPlayer;

    // After update the boxes curser pointer will be none.
    boxes[index].style.pointerEvents = "none";
    // swap karo turn ko
    swapTurn();

    // Check koi jeet toh nehi gaye.
    checkGameOver();
  }
}

// Add EVENT-LISTNER for all the boxex.

// -> 2
boxes.forEach((box, index) => {
  // apply event Listner onClick
  box.addEventListener("click", () => {
    // Handle the Click. ( index is for count the boxes -> which box was clicked.)
    handleClick(index);
  });
});

// THIS IS FOR NEW GAME BUTTON.

// --> 5
newGameBtn.addEventListener("click", initGane);

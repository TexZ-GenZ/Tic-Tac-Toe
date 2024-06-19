const GameBoard = (function () {
  const board = [];

  function setBoard() {
    for (let i = 0; i < 9; i++) {
      board[i] = null;
    }
  }
  setBoard();
  const getBoard = () => board;

  return {
    getBoard,
    setBoard,
  };
})();

const Game = (function () {
  const board = GameBoard.getBoard();

  ///////////////////////

  function checkWinCondition(player, board) {
    function checkSum(a, b, c) {
      let sum = 0;
      for (let j = a; j <= b; j += c) {
        if (board[j] != null) {
          sum += board[j];
        }
      }
      if (sum == 3 * player.marker) {
        return true;
      }
      return false;
    }

    for (let i = 0; i < board.length; i++) {
      if (i % 3 == 0 && checkSum(i, i + 2, 1)) {
        return true;
      }

      if (i < 3 && checkSum(i, i + 6, 3)) {
        return true;
      }

      if (i == 0 && checkSum(i, 8, 4)) {
        return true;
      }

      if (i == 2 && checkSum(i, 6, 2)) {
        return true;
      }
    }
  }
  ////////////////////////

  function hasNoSpace(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return false;
      }
    }
    return true;
  }

  //////////////////////
  return {
    checkWinCondition,
    hasNoSpace,
  };
})();

(function () {
  const board = GameBoard.getBoard();

  function Player(name, marker) {
    this.name = name;
    this.marker = marker;
  }

  const player1 = new Player();
  const player2 = new Player();
  player1.marker = 1;
  player2.marker = -1;

  while (!player1.name) {
    player1.name = prompt("Enter Player 1 Name : ", "");
  }
  while (!player2.name) {
    player2.name = prompt("Enter Player 2 Name : ", "");
  }

  const container = document.querySelectorAll(".box");

  let currentPlayer = player1;
  let gameover = -1;

  function handleClick(index) {
    board[index] = currentPlayer.marker;

    if (Game.checkWinCondition(currentPlayer, board)) {
      setTimeout(() => {
        gameover = 1;
        alert(`${currentPlayer.name} Wins!`);
        GameBoard.setBoard();
      }, 100); // 100 milliseconds delay
    }

    if (!Game.checkWinCondition(currentPlayer, board) && Game.hasNoSpace(board)) {
      setTimeout(() => {
        gameover = 1;
        GameBoard.setBoard();
        alert(`game ends in a tie!`);
      }, 100); // 100 milliseconds delay
    }
    setTimeout(() => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }, 150);
  }

  container.forEach((element, index) => {
    element.addEventListener("click", () => {
      if (board[index] === null && gameover == -1) {
        const newElement = document.createElement("p");
        if (currentPlayer == player1) {
          newElement.textContent = "x";
          newElement.classList.add("x");
        } else {
          newElement.textContent = "o";
          newElement.classList.add("o");
        }
        element.appendChild(newElement);
        handleClick(index);
      }
    });
  });

  function clearContainer() {
    container.forEach((element) => {
      element.innerHTML = "";
    });
  }

  const reset = document.querySelector(".reset");

  reset.addEventListener("click", () => {
    currentPlayer = player1;
    gameover = -1;
    clearContainer();
    GameBoard.setBoard();
  });
})();

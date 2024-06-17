const GameBoard = (function () {
  const board = [];

  function setBoard() {
    for (let i = 0; i < 9; i++) {
      board[i] = (null);
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
      if (i % 3 == 0 && checkSum(i, i + 3, 1)) {
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

  function getPlayerChoice(player) {
    const choiceCoordinate = parseInt(
      prompt(`Enter ${player.name} coordinate: `, 0)
    );

    if (board[choiceCoordinate] != null) {
      return getPlayerChoice(player);
    } 
    return {
      position: choiceCoordinate,
    };
  }

  //////////////

  function updateBoard(player) {
    choice = getPlayerChoice(player);
    if (board[choice.position] == null) {
      board[choice.position] = player.marker;
    }
  }

  /////////////////////

  function hasNoSpace(board){
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return false;
      }
    }
    return true;
  }


  //////////////////////
  function play(player) {
    updateBoard(player);
    console.log(board);

    if (checkWinCondition(player, board)) {
      alert(`${player.name} wins`);
      GameBoard.setBoard();
    }

    if (hasNoSpace(board)) {
      GameBoard.setBoard();
      console.log(board);
      alert(`game ends in a tie!`);
    }
    
  }

  return {
    play,
  };
})();

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}
const player1 = new Player("aditya", 1);
const player2 = new Player("priyanshu", -1);

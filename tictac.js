const Gameboard = (() => {
    // Private properties
    let board = [];
  
    // Public methods
    const initializeBoard = () => {
      board = Array(9).fill(null); // Initialize the board with 9 empty cells
    };
  
    const makeMove = (player, index) => {
      if (board[index] === null) {
        board[index] = player.symbol;
        return true; // Move successful
      } else {
        return false; // Cell is already occupied
      }
    };
  
    const checkWin = (player) => {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === player.symbol && board[b] === player.symbol && board[c] === player.symbol) {
          return true; // Player has won
        }
      }
  
      return false; // No winner yet
    };
  
    const isFull = () => {
      return board.every((cell) => cell !== null);
    };
  
    const resetBoard = () => {
      initializeBoard();
    };
  
    return {
      initializeBoard,
      makeMove,
      checkWin,
      isFull,
      resetBoard,
    };
  })();
  
  // Example usage:
  // Gameboard.initializeBoard();
  // Gameboard.makeMove(player1, 0);
  // Gameboard.checkWin(player1);
  // Gameboard.isFull();
  // Gameboard.resetBoard();
  
  const Player = (name, symbol) => {
    // Properties
    const playerName = name;
    const playerSymbol = symbol;
  
    // Public methods
    const getName = () => playerName;
    const getSymbol = () => playerSymbol;
  
    return {
      getName,
      getSymbol,
    };
  };
  
  // Example usage:
  // const player1 = Player("Player 1", "X");
  // const player2 = Player("Player 2", "O");
  // const playerName = player1.getName();
  // const playerSymbol = player2.getSymbol();
// Player Factory Function
const Player = (name, symbol) => {
    return {
        getName: () => name,
        getSymbol: () => symbol,
    };
};

// Gameboard Module
const Gameboard = (() => {
    let board = Array(9).fill(null);

    //Initialize board with nulls
    const initializeBoard = () => {
        board = Array(9).fill(null);
    };

    // add player symbol to board
    const makeMove = (player, index) => {
        if (board[index] === null) {
            board[index] = player.getSymbol();
            return true;
        }
        return false;
    };

    const checkWin = (player) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === player.getSymbol();
            });
        });
    };

    const isFull = () => {
        return board.every(cell => cell !== null);
    };

    const getBoard = () => {
        return [...board];
    };

    return {
        initializeBoard,
        makeMove,
        checkWin,
        isFull,
        getBoard,
    };
})();

// GameController Module
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;

    const initializeGame = (player1, player2) => {
        players = [player1, player2];
        currentPlayerIndex = 0;
        Gameboard.initializeBoard();
        DisplayController.updateStatus(`${getCurrentPlayer().getName()}'s turn`);
        DisplayController.renderBoard();
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const handleMove = (index) => {
        if (Gameboard.makeMove(getCurrentPlayer(), index)) {
            DisplayController.renderBoard();

            if (Gameboard.checkWin(getCurrentPlayer())) {
                DisplayController.showResult(`${getCurrentPlayer().getName()} wins!`);
                return;
            }

            if (Gameboard.isFull()) {
                DisplayController.showResult("It's a tie!");
                return;
            }

            switchPlayer();
            DisplayController.updateStatus(`${getCurrentPlayer().getName()}'s turn`);
        }
    };

    return {
        initializeGame,
        handleMove,
    };
})();

// DisplayController Module
const DisplayController = (() => {
    const boardContainer = document.querySelector("#board-container");
    const statusDisplay = document.querySelector("#status-display");
    const restartButton = document.querySelector("#restart-button");

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        boardContainer.innerHTML = "";

        board.forEach((cell, index) => {
            const cellElement = document.createElement("button");
            cellElement.classList.add("cell");
            cellElement.textContent = cell || "";
            cellElement.setAttribute("data-index", index);
            cellElement.addEventListener("click", () => GameController.handleMove(index));
            boardContainer.appendChild(cellElement);
        });
    };

    const updateStatus = (message) => {
        statusDisplay.textContent = message;
    };

    const showResult = (result) => {
        updateStatus(result);
        restartButton.style.display = "block";
    };

    restartButton.addEventListener("click", () => {
        restartButton.style.display = "none";
        GameController.initializeGame(player1, player2);
    });

    return {
        renderBoard,
        updateStatus,
        showResult,
    };
})();

// Initialize players and game
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

GameController.initializeGame(player1, player2);

import { useState, useEffect } from 'react';

const BOARD_SIZE = 5;
const WINNING_LENGTH = 5;

const Game = () => {
  const [board, setBoard] = useState(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares, position) => {
    const symbol = squares[position];
    if (!symbol) return null;

    const row = Math.floor(position / BOARD_SIZE);
    const col = position % BOARD_SIZE;

    // Check horizontal
    let count = 0;
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (squares[row * BOARD_SIZE + c] === symbol) {
        count++;
        if (count === WINNING_LENGTH) return symbol;
      } else {
        count = 0;
      }
    }

    // Check vertical
    count = 0;
    for (let r = 0; r < BOARD_SIZE; r++) {
      if (squares[r * BOARD_SIZE + col] === symbol) {
        count++;
        if (count === WINNING_LENGTH) return symbol;
      } else {
        count = 0;
      }
    }

    // Check diagonal (top-left to bottom-right)
    count = 0;
    let r = row - Math.min(row, col);
    let c = col - Math.min(row, col);
    while (r < BOARD_SIZE && c < BOARD_SIZE) {
      if (squares[r * BOARD_SIZE + c] === symbol) {
        count++;
        if (count === WINNING_LENGTH) return symbol;
      } else {
        count = 0;
      }
      r++;
      c++;
    }

    // Check diagonal (top-right to bottom-left)
    count = 0;
    r = row - Math.min(row, BOARD_SIZE - 1 - col);
    c = col + Math.min(row, BOARD_SIZE - 1 - col);
    while (r < BOARD_SIZE && c >= 0) {
      if (squares[r * BOARD_SIZE + c] === symbol) {
        count++;
        if (count === WINNING_LENGTH) return symbol;
      } else {
        count = 0;
      }
      r++;
      c--;
    }

    return null;
  };

  const getBotMove = (squares) => {
    // Simple bot strategy: Look for winning move or block opponent's winning move
    const opponent = 'X';
    const bot = 'O';

    // First, try to win
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const testBoard = [...squares];
        testBoard[i] = bot;
        if (checkWinner(testBoard, i)) return i;
      }
    }

    // Second, block opponent's winning move
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const testBoard = [...squares];
        testBoard[i] = opponent;
        if (checkWinner(testBoard, i)) return i;
      }
    }

    // If no critical moves, choose randomly from available spaces
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);
    
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  useEffect(() => {
    if (!isXNext && !gameOver) {
      // Bot's turn
      const botMove = getBotMove(board);
      const timeout = setTimeout(() => {
        handleClick(botMove);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isXNext, gameOver]);

  const handleClick = (i) => {
    if (board[i] || gameOver) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard, i);
    if (winner) {
      setGameOver(true);
      setWinner(winner);
      return;
    }

    if (newBoard.every(square => square !== null)) {
      setGameOver(true);
      setWinner('draw');
      return;
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  };

  const renderSquare = (i) => (
    <button
      className={`cell ${board[i]?.toLowerCase()}`}
      onClick={() => handleClick(i)}
      disabled={!isXNext || gameOver}
    >
      {board[i]}
    </button>
  );

  const getStatus = () => {
    if (winner === 'draw') return "It's a draw!";
    if (winner) return `Winner: ${winner}`;
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="game">
      <div className="status">{getStatus()}</div>
      <div className="board">
        {Array(BOARD_SIZE * BOARD_SIZE)
          .fill(null)
          .map((_, i) => renderSquare(i))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Game;
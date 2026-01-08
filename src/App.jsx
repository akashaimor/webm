import { useState } from "react";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      <div className="board">
        {board.map((value, i) => (
          <button key={i} onClick={() => handleClick(i)}>
            {value}
          </button>
        ))}
      </div>

      <h2>
        {winner
          ? `Winner: ${winner}`
          : board.every(Boolean)
          ? "Draw!"
          : `Next Player: ${xIsNext ? "X" : "O"}`}
      </h2>

      <button className="reset" onClick={resetGame}>
        Restart
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

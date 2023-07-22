import { useState } from 'react';
import Board from './Board';
export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const movesInit = history.map((squares, move) => {
      return (
        <li key={move}>
          You are at move# {move}
        </li>
      );
    })
    const [moves, setMoves] = useState(movesInit)

    const newMoves = history.map((squares, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move}>
            {move === currentMove ? 'You are at move# ' + move : <button onClick={() => jumpTo(move)}>{description}</button>}
          </li>
        );
      })

    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setMoves(newMoves)
    }
  
    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
    }
  
    function handleButtonClick() {
      let newMoves = [...moves].reverse()
      setMoves(newMoves)
    }
  
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <button onClick={() => handleButtonClick()}>sort in reverse</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
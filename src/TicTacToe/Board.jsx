import Square from './Square';
export default function Board({ xIsNext, squares, onPlay}) {
  /*props from Game.jsx:

    xIsNext = currentMove % 2 === 0;
    
    squares = currentSquares = history[currentMove] (where history is an array of each state of the board.)
    
    onPlay = handlePlay(nextSquares) {
        Adds new set of squares to nextHistory
        Changes current move to nextHistory.length - 1
        currently sets movesArray... not so sure about this.
    }
    */
    function handleClick(i) {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }
  
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  
    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }

    return (
      <>
        <div className="status">{status}</div>
        {[0,3,6].map(function (i) {
        return (<div className="board-row">
        {[i, i+1, i+2].map(x => <Square value={squares[x]} onSquareClick={() => handleClick(x)} key={x}/>)}
        </div>
        );
      })}
      </>
    );
  }
  
export default function Square({ value, onSquareClick }) {
  /*props from Board.jsx:

  value=squares[x] (where squares is an array of 9 values)
  
  onSquareClick=handleClick(x) (where handleClick checks for a winner, checks if the square is empty, and then assigns the appropriate value to the square based on xIsNext)*/
  return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
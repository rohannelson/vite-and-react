import TicTacToe from './TicTacToe/Game';
import FourInARow from './FourInARow/Game';
export default function App() {
  return <>
  <TicTacToe />
  <div className="breaker"></div>
  <FourInARow />
  </>
}
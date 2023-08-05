import TicTacToe from './TicTacToe/Game';
import FourInARow from './FourInARow/Game';
import Checkers from './Checkers/Game';
export default function App() {
  return <>
  <TicTacToe />
  <div className="breaker"></div>
  <FourInARow />
  <div className="breaker"></div>
  <Checkers />
  </>
}
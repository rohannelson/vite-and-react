import React from "react";
import { useState } from "react";

function CheckerSquare({className, value, onSquareClick}) {
    return (<button onClick={onSquareClick} className={`square ${className}`}>
        {value}
    </button>)
}

function Black() {
    return <div className="blackChecker"></div>
}

function White() {
    return <div className="whiteChecker"></div>
}

function CheckerRow({iRow, squares, onSquareClick}) {
    const checkerRow = [0,1,2,3,4,5,6,7].map((iSquare) => {
        let classname = "black";
        let offset;
        iRow % 2 === 0 ? offset = 0 : offset = 1;
        if (iSquare % 2 === offset) {classname="white"}
        let keyValue;
        offset === 0 ? keyValue = iRow*8 + iSquare : keyValue = iRow*8 + (7-iSquare);
        let valueValue;
        if (squares[keyValue] === "black") {valueValue = <Black/>}
        if (squares[keyValue] === "white") {valueValue = <White/>}
        return (<CheckerSquare className={classname} value={valueValue} key={keyValue} onSquareClick={() => onSquareClick(squares[keyValue], keyValue)}/>)

})
    return (<div className="board-row">{checkerRow}</div>)
}

function CheckerBoard({squares, onSquareClick}) {
    const checkerBoard = [0,1,2,3,4,5,6,7].map((iBoard) =><CheckerRow iRow={iBoard} squares={squares} onSquareClick={onSquareClick}/>)
    return (checkerBoard)
}

export default function Game() {
    const initialSquares = Array(64).fill(null);
    [1,3,5,7,9,11,13,15].forEach((i) => initialSquares[i] = "black");
    [49,51,53,55,57,59,61,63].forEach((i) => initialSquares[i] = "white");
    const [squares, setSquares] = useState(initialSquares);
    const [held, setHeld] = useState(false);

    function handleClick(value, index) {
        if (held && value) {
            console.log("held and value=true")
            return} 
        else if (held && value === null) {
            console.log("held and value=false")
            let nextSquares = [...squares]
            nextSquares[index] = held
            setSquares(nextSquares)
            console.log(nextSquares)
            setHeld(false)
            return
        }
        else if (value) {
            console.log("not held, value=true")
            let nextSquares = [...squares]
            nextSquares[index] = null
            setSquares(nextSquares);
            console.log(nextSquares)
            setHeld(value);
            return
        }
        console.log("clicked")
        console.log(`${held} held`)
    }

    return (<CheckerBoard squares={squares} onSquareClick={handleClick}/>)
}
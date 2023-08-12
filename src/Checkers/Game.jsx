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
        let keyValue = iRow*8 + iSquare
        let valueValue;
        if (squares[keyValue] === "black") {valueValue = <Black/>}
        if (squares[keyValue] === "white") {valueValue = <White/>}
        return (<CheckerSquare className={classname} value={valueValue} key={keyValue} onSquareClick={() => onSquareClick(squares[keyValue], keyValue, iSquare, offset)}/>)

})
    return (<div className="board-row">{checkerRow}</div>)
}

function CheckerBoard({squares, onSquareClick}) {
    const checkerBoard = [0,1,2,3,4,5,6,7].map((iBoard) =><CheckerRow iRow={iBoard} squares={squares} onSquareClick={onSquareClick}/>)
    return (checkerBoard)
}

export default function Game() {
    const initialSquares = Array(64).fill(null);
    [1,3,5,7,8,10,12,14].forEach((i) => initialSquares[i] = "black");
    [49,51,53,55,56,58,60,62].forEach((i) => initialSquares[i] = "white");
    const [squares, setSquares] = useState(initialSquares);
    const [held, setHeld] = useState(false);
    const [blacksTurn, setBlacksTurn] = useState(true);
    let turn;
    blacksTurn ? turn = "black" : turn = "white";
    let notTurn;
    blacksTurn ? notTurn = "white" : notTurn = "black";
    let turnToken;
    blacksTurn ? turnToken = 1 : turnToken = -1;

    function handleClick(value, index, iSquare, offset) {
        console.log(iSquare)
        let diagonalA;
        let diagonalB;
        let longDiagonalA;
        let longDiagonalB;
        if (value === notTurn) {
            return
        } //pickup piece 
        else if (!held && value === turn) {
            console.log("Piece picked up (not held, value=true)")
            let nextSquares = [...squares]
            nextSquares[index] = null
            setSquares(nextSquares);
            setHeld([value, index, offset]);
            return
        } else if (held) {
            diagonalA = held[1] + 7 * turnToken
            diagonalB = held[1] + 9 * turnToken
            longDiagonalA = held[1] + 14 * turnToken
            longDiagonalB = held[1] + 18 * turnToken
        } 
        //If it's a valid basic move
        if (
        held && value === null && index === diagonalA && held[2] !== offset 
        || held && value === null && index === diagonalB && held[2] !== offset
        ) {
            console.log("Basic move played")
            let nextSquares = [...squares]
            nextSquares[index] = held[0]
            setSquares(nextSquares)
            setHeld(false)
            setBlacksTurn(!blacksTurn)
            return
        }
        //If it's a valid offensive move
        else if (value === null && index === (longDiagonalB) && squares[diagonalB] === notTurn && held[2] === offset
        || value === null && index === (longDiagonalA) && squares[diagonalA] === notTurn && held[2] === offset) {
            let takenPiece;
            index === longDiagonalB ? takenPiece = diagonalB : takenPiece = diagonalA
            console.log("Offensive move played")
            let nextSquares = [...squares]
            nextSquares[index] = held[0]
            nextSquares[takenPiece] = null
            setSquares(nextSquares)
            setHeld(false)
            setBlacksTurn(!blacksTurn)
        }
        //NEED TO MAKE IT SO YOU CAN DO MULTIPLE OFFENSIVE MOVES.
        //NEED TO MAKE IT SO PIECES GET KINGED WHEN THEY REACH THE END.
        console.log("clicked")
        console.log(`${held} held`)
    } 


    return (
    <>
    <div className="status">{turn}'s turn</div>
    <CheckerBoard squares={squares} onSquareClick={handleClick}/>
    </>)
}
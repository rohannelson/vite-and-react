import React from "react";
import { useState } from "react";

function CheckerSquare({className, value, onSquareClick}) {
    return (<button onClick={onSquareClick} className={`square ${className}`}>
        {value}
    </button>)
}

function Black({king}) {
    return <div className={`blackChecker ${king}`}></div>
}

function White({king}) {
    return <div className={`whiteChecker ${king}`}></div>
}

function CheckerRow({iRow, squares, onSquareClick}) {
    const checkerRow = [0,1,2,3,4,5,6,7].map((iSquare) => {
        let classname = "black";
        let offset;
        iRow % 2 === 0 ? offset = 0 : offset = 1;
        if (iSquare % 2 === offset) {classname="white"}
        let keyValue = iRow*8 + iSquare
        let valueValue;
        if (squares[keyValue] === "black") {valueValue = <Black king=""/>}
        if (squares[keyValue] === "white") {valueValue = <White king=""/>}
        if (squares[keyValue] === "blackKing") {valueValue = <Black king="blackCheckerKing"/>}
        if (squares[keyValue] === "whiteKing") {valueValue = <White king="whiteCheckerKing"/>}
        return (<CheckerSquare className={classname} value={valueValue} key={keyValue} onSquareClick={() => onSquareClick(squares[keyValue], keyValue, offset)}/>)

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
    const [offensive, setOffensive] = useState(false);
    let turn;
    blacksTurn ? turn = "black" : turn = "white";
    let notTurn;
    blacksTurn ? notTurn = "white" : notTurn = "black";
    let turnToken;
    blacksTurn ? turnToken = 1 : turnToken = -1;

    function handleClick(value, index, offset) {
        let diagonalA;
        let diagonalB;
        let reverseDiagonalA;
        let reverseDiagonalB
        let longDiagonalA;
        let longDiagonalB;
        let reverseLongDiagonalA;
        let reverseLongDiagonalB;
        if (value?.includes(notTurn)) {
            return
        } //pickup piece 
        else if (!held && value?.includes(turn)) {
            console.log(`pickup ${value}`)
            let nextSquares = [...squares]
            nextSquares[index] = null
            setSquares(nextSquares);
            setHeld({value, index, offset});
            return
        } else if (held && index === held.index) {
            console.log(`return ${value}`)
            let nextSquares = [...squares]
            nextSquares[index] = held.value
            setSquares(nextSquares);
            setHeld(false);
        } else if (held) {
            diagonalA = held.index + 7 * turnToken
            diagonalB = held.index + 9 * turnToken
            reverseDiagonalA = held.index + 7 * turnToken * -1
            reverseDiagonalB = held.index + 9 * turnToken * -1
            longDiagonalA = held.index + 14 * turnToken
            longDiagonalB = held.index + 18 * turnToken
            reverseLongDiagonalA = held.index + 14 * turnToken * -1
            reverseLongDiagonalB = held.index + 18 * turnToken * -1
        }
        function kingCheck() {
            if (held.value === ("white") && index < 8 
            || held.value === ("black") && index > 55) {
                return `${held.value}King`} else {return held.value}
        }
        //If it's a valid basic move
        if (
        held && value === null && index === diagonalA && held[2] !== offset && !offensive
        || held && value === null && index === diagonalB && held[2] !== offset && !offensive
        || held.value?.includes("King") && value === null && index === reverseDiagonalA && held[2] !== offset && !offensive
        || held.value?.includes("King") && value === null && index === reverseDiagonalB && held[2] !== offset && !offensive) {
            console.log("basic move")
            let nextSquares = [...squares]
            nextSquares[index] = kingCheck()
            setSquares(nextSquares)
            setHeld(false)
            setBlacksTurn(!blacksTurn)
            return
        //if it's a valid offensive move
        } else if (value === null && index === (longDiagonalB) && squares[diagonalB]?.includes(notTurn) && held.offset === offset
            || value === null && index === (longDiagonalA) && squares[diagonalA]?.includes(notTurn) && held.offset === offset
            || value === null && index === (reverseLongDiagonalB) && squares[reverseDiagonalB]?.includes(notTurn) && held.offset === offset
            || value === null && index === (reverseLongDiagonalA) && squares[reverseDiagonalA]?.includes(notTurn) && held.offset === offset) {
                console.log("offensive move")
                let takenPiece;
                if (index === longDiagonalB) {
                    takenPiece = diagonalB
                } else if (index === longDiagonalA) {
                    takenPiece = diagonalA
                } else if (index === reverseLongDiagonalA) {
                    takenPiece = reverseDiagonalA
                } else if (index === reverseLongDiagonalB) {
                    takenPiece = reverseDiagonalB
                }
                let nextSquares = [...squares]
                nextSquares[index] = kingCheck()
                nextSquares[takenPiece] = null;
                nextSquares[held.index] = null;
                setSquares(nextSquares);
                //setup to check for subsequent offensive moves
                let newDiagonalA = index + 7 * turnToken
                let newDiagonalB = index + 9 * turnToken
                let newReverseDiagonalA = index + 7 * turnToken * -1
                let newReverseDiagonalB = index + 9 * turnToken * -1
                let newLongDiagonalA = index + 14 * turnToken
                let newLongDiagonalB = index + 18 * turnToken
                let newReverseLongDiagonalA = index + 14 * turnToken * -1
                let newReverseLongDiagonalB = index + 18 * turnToken * -1
                if (squares[newLongDiagonalA] === null && squares[newDiagonalA]?.includes(notTurn) && held.offset === offset
                || squares[newLongDiagonalB] === null && squares[newDiagonalB]?.includes(notTurn) && held.offset === offset
                || held.value?.includes("King") && squares[newReverseLongDiagonalA] === null && squares[newReverseDiagonalA]?.includes(notTurn) && held.offset === offset
                || held.value?.includes("King") && squares[newReverseLongDiagonalB] === null && squares[newReverseDiagonalB]?.includes(notTurn) && held.offset === offset) {
                console.log("another offensive possible")
                let newHeld = {...held}
                newHeld.index=index
                setHeld(newHeld);
                setOffensive(true)
                console.log(held);
                return
            } else {
                console.log("offensive ended")
                setOffensive(false)
                setHeld(false)
                setBlacksTurn(!blacksTurn)
            }
            console.log(`clicked ${index}`)
        }
    }

        //NEED TO MAKE IT SO YOU CAN DO MULTIPLE OFFENSIVE MOVES.
                //Could utilise index % 8 - for white longDiagonalA % 8 always needs to be < index % 8 and longDiagonalB needs to be > index % 8. Vice versa for black.
                //May need to set state for an offensive move having been taken to check whether to switch to the next player's turn or not?
                //Perhaps an offensive move needs to be it's own looping function? Yes - I think so.
        //NEED TO MAKE IT SO PIECES GET KINGED WHEN THEY REACH THE END.
        //NEED TO INTRODUCE PROMPTS TO INDICATE IF COMPULSORY MOVES ARE POSSIBLE? 


    return (
    <>
    <div className="status">{turn}'s turn</div>
    <CheckerBoard squares={squares} onSquareClick={handleClick}/>
    </>)
}
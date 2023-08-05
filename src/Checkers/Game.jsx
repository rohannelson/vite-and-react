import React from "react";
import { useState } from "react";
export default function Game() {
    const [blacks, setBlacks] = useState([1,3,5,7,9,11,13,15])
    const [whites, setWhites] = useState([49,51,53,55,57,59,61,63])
    return (<CheckerBoard blacks={blacks} whites={whites}/>)
}

function CheckerSquare({className, value}) {
    return (<button className={`square ${className}`}>
        {value}
    </button>)
}

function Black() {
    return <div className="blackChecker"></div>
}

function White() {
    return <div className="whiteChecker"></div>
}

function CheckerRow({iRow, blacks, whites}) {
    const checkerRow = [0,1,2,3,4,5,6,7].map((iSquare) => {
        let classname = "black";
        let offset;
        iRow % 2 === 0 ? offset = 0 : offset = 1;
        if (iSquare % 2 === offset) {classname="white"}
        let keyValue;
        offset === 0 ? keyValue = iRow*8 + iSquare : keyValue = iRow*8 + (7-iSquare);
        let valueValue;
        if (blacks.includes(keyValue)) {valueValue = <Black/>}
        if (whites.includes(keyValue)) {valueValue = <White/>}
        return (<CheckerSquare className={classname} value={valueValue} key={keyValue}/>)

})
    return (<div className="board-row">{checkerRow}</div>)
}

function CheckerBoard({blacks, whites}) {
    const checkerBoard = [0,1,2,3,4,5,6,7].map((iBoard) =><CheckerRow iRow={iBoard} blacks={blacks} whites={whites}/>)
    return (checkerBoard)
}
import { useState } from 'react';

function Circle({value}) {
    return (
        <div className={`circle ${value}`}>
        </div>
    )
}

function Board({circles}) {
    return (
        <div className="board">
        {[0,6,12,18,24,30,36].map(function (i) {
        return (<div className="board-column">
        {[i, i+1, i+2, i+3, i+4, i+5].map(x => <Circle value={circles[x]} key={"c"+x}/>)}
        </div>
        );
      })}
      </div>
    )
}

function Input({onInputClick}) {
    return (
        <button className="input" onClick={onInputClick}>&darr;</button>
    )
}

export default function Game() {
    const [ circles, setCircles ] = useState(Array(42).fill(null));
    const [ YIsNext, setYIsNext ] = useState(true)
    
    function onPlay(i) {
        setYIsNext(!YIsNext);
        let nextCircles = [...circles]
        for(let x=i+5; x>=i; x--) {
        if (nextCircles[x]) {null} else {
            nextCircles[x] = YIsNext ? "blue" : "green";
            setCircles(nextCircles)
            return;
        }
        }
    }
    
    return (
        <>
        <div className="inputWrapper">
            {[0,6,12,18,24,30,36].map((i) => <Input key={"i"+i} onInputClick={() => onPlay(i)}/>)}
        </div>
        <Board circles={circles}>
        </Board>
        </>
    )
}
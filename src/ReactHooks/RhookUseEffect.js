import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";

const App = () => {

    const sayHello = () => console.log("hello");

    useEffect(sayHello, [number]);

    const [number, setNumber] = useState(0);
    const [anumber, setAnumber] = useState(0);

    return (
        <div className="App">
            <div>Hi</div>
            <button onClick={() => setNumber(number +1)} >{number}</button>
            <button onClick={() => setAnumber(aNumber +1)} >{anumber}</button>
        </div>
    );
};


export default RhookUseEffect;
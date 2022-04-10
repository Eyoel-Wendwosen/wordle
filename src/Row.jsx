import React from "react";
import Cell from "./Cell";
import "./styles/Row.css";


export default function Row(props) {
    let { word, difficulty } = props;
    let cells = [];

    for (let i = 0; i < difficulty; i++) {
        if (i < word.length) {
            cells.push(<Cell key={`${i} ${word.charAt(i)}`} letter={word.charAt(i)} />);
        } else {
            cells.push(<Cell key={i} letter={""} />);
        }
    }

    return (
        <div className="row">
            {cells}
        </div>
    )
}

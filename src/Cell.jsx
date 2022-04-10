import React from "react";
import "./styles/Cell.css";

export default function Cell(props) {
    return (
        <div className="letter-box">{props.letter.toUpperCase()}</div>
    )
}

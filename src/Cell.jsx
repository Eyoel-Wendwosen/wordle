import React from "react";
import { useSelector } from "react-redux";
import "./styles/Cell.css";

export default function Cell(props) {
    return (
        <div className={props.className} id="letter-box">{props.letter.toUpperCase()}</div>
    )
}

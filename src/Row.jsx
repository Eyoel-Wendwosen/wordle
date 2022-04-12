import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import Cell from "./Cell";
import "./styles/Row.css";


export default function Row(props) {

    function getAttemptAtIndex(state, index) {
        let attempt = "#NOT_TRIED";
        if (index < state.attempts.length) {
            attempt = state.attempts[index];
        }
        return attempt;
    }

    const attempt = useSelector((state) => getAttemptAtIndex(state, props.index), shallowEqual);
    const wordLength = useSelector((state) => state.wordLength, shallowEqual);
    const currentAttemptIndex = useSelector((state) => state.currentAttemptIndex, shallowEqual);
    const selectedWord = useSelector((state) => Object.keys(state.selectedWord)[0], shallowEqual);

    const isAttemptSubmitted = props.index < currentAttemptIndex;
    let cells = [];

    const selectedWordFreq = {}
    for (const char of selectedWord) {
        if (selectedWordFreq[char] == undefined) {
            selectedWordFreq[char] = 1;
        } else {
            selectedWordFreq[char] += 1;
        }
    }

    for (let i = 0; i < wordLength; i++) {
        let letter = attempt !== "#NOT_TRIED" ? attempt.charAt(i) : "";

        let className = "default";
        if (isAttemptSubmitted) {
            if (selectedWordFreq[letter] !== undefined && selectedWordFreq[letter] > 0) {
                className = selectedWord.charAt(i) === letter ? "correct-position" : "correct-letter";
                selectedWordFreq[letter] -= 1;
            } else {
                className = "incorrect";
            }
        }
        cells.push(
            <Cell
                key={`${props.index} ${i} ${attempt.charAt(i)}`}
                letter={letter}
                className={className}
            />
        );
    }

    return (
        <div className="row">
            {cells}
        </div>
    )
}

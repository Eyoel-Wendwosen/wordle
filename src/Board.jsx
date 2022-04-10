import React from "react";
import Row from "./Row";

export default function Board(props) {

    let { tries, difficulty, words } = props
    let rows = [];

    for (let row = 0; row < tries; row++) {
        if (row < words.length) {
            rows.push(<Row key={`${row} ${words[row]}`} word={words[row]} difficulty={difficulty} />)
        } else {
            rows.push(<Row key={row} word={""} difficulty={difficulty} />)
        }
    }

    return (
        <div>
            {rows}
        </div>
    )
}

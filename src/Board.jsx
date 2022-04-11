import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import Row from "./Row";

export default function Board() {
    const tries = useSelector((state) => state.tries, shallowEqual);
    let rows = [];

    for (let row = 0; row < tries; row++) {
        rows.push(<Row key={row} index={row} />)
    }

    return (
        <div>
            {rows}
        </div>
    )
}

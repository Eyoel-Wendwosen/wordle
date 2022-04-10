import React from "react";
import { Link } from "react-router-dom";

export default function Rules() {
  return (
    <div>
      <div id="nav-bar">
        <Link to={"/"}>Home</Link>
        <Link to={"/game"}>Game</Link>
        <Link to={"/rules"}>Rules</Link>
      </div>
      <h1>Rules</h1>
    </div>
  )
}

import React from "react";
import { Link } from "react-router-dom";
import demo from './resources/demo.gif';
import "./styles/Rules.css";

export default function Rules() {
  return (
    <div className="container">
      <div id="nav-bar">
        <Link to={"/"}>Home</Link>
        <Link to={"/game"}>Game</Link>
        <Link to={"/rules"}>Rules</Link>
      </div>
      <div>
        <h1>How Do I play? </h1>
        <p>
          Well it's simple, you are given 5-7 attempts to guess a word that the game <strong>secretly </strong> chooses. The length of the word and the number of attempts you get is dependent on the difficulty you chose to play with.
        </p>
        <p>
          Because the game is so nice it will try to help you as you make attempts.
        </p>
        <div id="image-container">
          <img src={demo} alt="demo" />
        </div>
        <p>
          Try to guess of as much words as you can. 
        </p>
      </div>


    </div>
  )
}

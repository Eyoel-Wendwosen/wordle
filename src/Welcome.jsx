import React from 'react';
import { Link } from 'react-router-dom';

import "./styles/Welcome.css";
import "./styles/App.css";
import { useDispatch } from 'react-redux';


export default function Welcome() {
    const dispatch = useDispatch();
    function setGameDifficulty(wordLength, tries) {
        dispatch({
            type: 'SET_DIFFICULTY',
            wordLength,
            tries
        })
    }
    return (
        <div className='container'>
            <div id="nav-bar">
                <Link to={"/"}>Home</Link>
                <Link to={"/game"}>Game</Link>
                <Link to={"/rules"}>Rules</Link>
            </div>
            <div id="game-description">
                <h1>
                    WORDLE!
                </h1>
                <h3>The rules to play are simple. </h3>
                <p>Try to guess the word chosen by the game with the given number of attempts. The number of attempts and the length of word the game chooses depend on the difficulty level you choose.</p>
                <p> Modes: </p>
                <ul>
                    <li>
                        <Link to={"/game/easy"} >Try Easy mode now</Link> You get <strong>7 attempts</strong> to guess <strong>5 letter</strong> word.
                    </li>
                    <li>
                        <Link to={"/game/medium"} >Are you up for a challenge</Link> <strong>6 attempts</strong> to guess <strong>6 letter</strong> word.
                    </li>
                    <li>
                    <Link to={"/game/hard"} >Insanity</Link> <strong>5 attempts</strong> to guess <strong>7 letter</strong> word.
                    </li>
                </ul>
            </div>

        </div>
    )
}

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
                    Welcome to Wordle Game!
                </h1>
                <h3>The rules to play are simple. </h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit nihil cupiditate vitae ratione consequuntur obcaecati quae esse non facere veritatis temporibus adipisci accusantium, inventore illum sequi. Illum pariatur beatae obcaecati.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit nihil cupiditate vitae ratione consequuntur obcaecati quae esse non facere veritatis temporibus adipisci accusantium, inventore illum sequi. Illum pariatur beatae obcaecati.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit nihil cupiditate vitae ratione consequuntur obcaecati quae esse non facere veritatis temporibus adipisci accusantium, inventore illum sequi. Illum pariatur beatae obcaecati.</p>
            </div>
            <div>
                <Link to={"/game/easy"} >
                    <button>
                        EASY
                    </button>
                </Link>
                <Link to={"/game/medium"} >
                    <button>
                        MEDIUM
                    </button>
                </Link>
                <Link to={"/game/hard"} >
                    <button>
                        HARD
                    </button>
                </Link>
                <Link to={"/rules"} >
                    <button>
                        New
                    </button>
                </Link>

            </div>
        </div>
    )
}

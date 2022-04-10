import React from 'react';
import { Link } from 'react-router-dom';

import "./Welcome.css";


export default function Welcome() {
    return (
        <div>
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
                <Link to={"/game"} >
                    <button>
                        Play New Game
                    </button>
                </Link>
                <Link to={"/rules"} >
                    <button>
                        Check out Rules
                    </button>
                </Link>

            </div>
        </div>
    )
}

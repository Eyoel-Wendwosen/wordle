import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ReactNotifications } from "react-notifications-component";

import wordleStore from "./reducers/checkWord";
import Game from "./Game";
import Rules from "./Rules";
import "./styles/App.css";
import Welcome from "./Welcome";

const store = createStore(wordleStore);

export default function App() {
    // First call
    // ScrollHeight();

    // Redraw when viewport is modified
    window.addEventListener('resize', function (event) {
        ScrollHeight();
    });


    function ScrollHeight() {
        var content = document.querySelector('#mask');
        var container = document.querySelector('#app');

        // SVG feTurbulence can modify all others elements, that's why "parchment" is in absolute position.
        // so for a better effect, absolute height is defined by his content.
        const containerHeight = container.offsetHeight;
        console.log(containerHeight);
        console.log(window.visualViewport.height);
        let val = window.visualViewport.height - (window.visualViewport.height * (12 / 100));
        if (containerHeight > val) {
            val = containerHeight - (window.visualViewport.height * (16 / 100));
        }
        content.style.height = val + 'px';
    }
    useEffect(() => {
        ScrollHeight();
    }, [])
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ReactNotifications />
                <div id="mask"></div>
    
                <div id="app">
                    <Routes>
                        <Route path={"/"} element={<Welcome />} />
                        <Route path={"/game/"} element={<Game />} />
                        <Route path={"/game/:difficulty"} element={<Game />} />
                        <Route path={"/rules"} element={<Rules />} />
                    </Routes>
                </div>
                <svg style={{ height: 0 }} >
                    <filter id="wavy2">
                        <feTurbulence x="0" y="0" baseFrequency="0.03" numOctaves="9" seed="3"></feTurbulence>
                        <feDisplacementMap in="SourceGraphic" scale="20" />
                    </filter>
                </svg>
            </Provider>
        </BrowserRouter>
    )
}

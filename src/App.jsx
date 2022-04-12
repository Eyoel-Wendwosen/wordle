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
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ReactNotifications />
                <div id="app">
                    <Routes>
                        <Route path={"/"} element={<Welcome />} />
                        <Route path={"/game/"} element={<Game />} />
                        <Route path={"/game/:difficulty"} element={<Game />} />
                        <Route path={"/rules"} element={<Rules />} />
                    </Routes>
                </div>
            </Provider>
        </BrowserRouter>
    )
}

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
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
                <Routes>
                    <Route path={"/"} element={<Welcome />} />
                    <Route path={"/game"} element={<Game />} />
                    <Route path={"/rules"} element={<Rules />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    )
}

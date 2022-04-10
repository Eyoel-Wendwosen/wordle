import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Board from "./Board";
import "./styles/Game.css";


export default function Game() {
  let words = useSelector((state) => state.words);
  const attempts = ["world", "focus", "lea", "index", "react", "redux"]
  const dispatch = useDispatch();

  // let [selectedWord, setSelectedWord] = useState("camry");
  // let [words, setWords] = useState(attempts);
  let [currentWordIndex, setCurrentWordIndex] = useState(words.length - 1);
  let [difficulty, setDifficulty] = useState(5);
  let [tries, setTries] = useState(5);

  const setWords = (words) => {
    dispatch({
      type: 'SET_WORDS',
      words: words
    });
  }

  useEffect(() => {
    setHiddenInputFocus();
    let storedData = localStorage.getItem("wordle-data");
    let data = JSON.parse(storedData);
    setWords(data.words);
    setCurrentWordIndex(data.currentWordIndex);
    setDifficulty(data.difficulty);
    setTries(data.tries);
  }, []);

  useEffect(() => {
    let data = {
      difficulty: difficulty,
      tries: tries,
      words: words,
      currentWordIndex: currentWordIndex
    };
    localStorage.setItem("wordle-data", JSON.stringify(data));
  }, [words]);


  const setHiddenInputFocus = () => {
    let input = document.querySelector("#hidden-input-field");
    input.focus();
  }

  const checkWord = (e) => {
    e.preventDefault();
    if (currentWordIndex < words.length) {
      const lastWord = words[currentWordIndex];
      if (lastWord.length === difficulty && currentWordIndex < tries) {
        // check the word validity here 
        const newList = [...words];
        if (currentWordIndex + 1 < tries) {
          newList.push("");
        } else {
          // check if the user won 
        }
        setCurrentWordIndex(currentWordIndex + 1);
        setWords(newList);
      }
    } else {
      // TODO: user probably lost 
    }

  }

  const handleKeyPress = (e) => {
    e.preventDefault();
    if (currentWordIndex < words.length) {
      const newList = [...words];
      let newWord = words[currentWordIndex];

      if (e.key === "Backspace") {
        if (newWord.length > 0) {
          newWord = newWord.substring(0, newWord.length - 1);
          newList.pop()
          newList.push(newWord);
          setWords(newList);
        }
      } else if (e.key.length === 1 && /^[a-zA-Z]/.test(e.key) && currentWordIndex <= tries) {
        if (newWord.length < difficulty) {
          newList.pop();
          newWord += e.key;
          newList.push(newWord);
        }
      }
      setWords(newList);
    }
    e.target.value = "";
  }

  const initializeNewGame = () => {
    setWords([""]);
    setCurrentWordIndex(0);
    // TODO: randomly choose new word
  }

  return (
    <div className="game" onClick={setHiddenInputFocus}>
      <div id="nav-bar">
        <Link to={"/"}>Home</Link>
        <Link to={"/game"}>Game</Link>
        <Link to={"/rules"}>Rules</Link>
      </div>
      <div id="game-header">
        <h1>
          Welcome to the Wordle game!
        </h1>
      </div>
      <div className="game-board">
        <Board words={words} difficulty={difficulty} tries={tries} />
      </div>
      <form onSubmit={(e) => checkWord(e)}>
        <input id="hidden-input-field" type="" onKeyUp={(e) => handleKeyPress(e)} />
      </form>
      <button onClick={initializeNewGame}>
        New Game
      </button>
    </div>

  )
}
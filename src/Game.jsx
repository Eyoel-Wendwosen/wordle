import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { ReactNotifications, Store } from 'react-notifications-component';
import { useParams } from "react-router";
import 'animate.css';
import 'react-notifications-component/dist/theme.css';

import { GAME_STATUS } from "./utility";
import Board from "./Board";
import "./styles/Game.css";


export default function Game(props) {

  const notifications = {
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
    }
  };

  const gameStatus = useSelector((state) => state.gameStatus, shallowEqual);
  const attempts = useSelector((state) => state.attempts, shallowEqual);
  const currentAttemptIndex = useSelector((state) => state.currentAttemptIndex, shallowEqual);
  const listOfWords = useSelector((state) => state.listOfWords, shallowEqual);
  const wordLength = useSelector((state) => state.wordLength, shallowEqual);
  const tries = useSelector((state) => state.tries, shallowEqual);
  const selectedWord = useSelector((state) => state.selectedWord, shallowEqual);

  const dispatch = useDispatch();
  const params = useParams()

  function setAttempts(attempts) {
    dispatch({
      type: 'SET_ATTEMPTS',
      attempts: attempts
    });
  }

  function updateGameStatus(gameStatus) {
    dispatch({
      type: 'UPDATE_GAME_STATUS',
      gameStatus: gameStatus
    });
  }

  function updateAttempt(attempt) {
    dispatch({
      type: 'UPDATE_ATTEMPT',
      attempt: attempt,
      index: currentAttemptIndex
    });
  }

  function setCurrentAttemptIndex(index) {
    dispatch({
      type: 'SET_CURRENT_INDEX',
      index: index
    });
  }

  function setGameDifficulty(wordLength, tries) {
    dispatch({
      type: 'SET_DIFFICULTY',
      wordLength,
      tries
    })
  }

  function setRandomWord() {
    dispatch({
      type: "SET_RANDOM_WORD",
    })
  }

  useEffect(() => {
    let storedData = localStorage.getItem("wordle-data");
    if (params.difficulty !== undefined) {
      switch (params.difficulty.toLowerCase()) {
        case "easy": {
          setGameDifficulty(5, 7);
          initializeNewGame();
          break;
        }
        case "medium": {
          setGameDifficulty(6, 6);
          initializeNewGame();
          break;
        }
        case "hard": {
          setGameDifficulty(7, 5);
          initializeNewGame();
          break;
        }
        default:
          break;
      }
    } else {
      if (storedData !== null) {
        let data = JSON.parse(storedData);
        if (data.tries === tries && data.wordLength === wordLength) {
          dispatch({
            type: 'LOAD_FROM_STORAGE',
            ...data
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    let data = {
      selectedWord: selectedWord,
      gameStatus: gameStatus,
      wordLength: wordLength,
      tries: tries,
      attempts: attempts,
      currentAttemptIndex: currentAttemptIndex
    };
    localStorage.setItem("wordle-data", JSON.stringify(data));
  }, [attempts, currentAttemptIndex, gameStatus, wordLength, selectedWord, tries]);

  function setHiddenInputFocus() {
    let input = document.querySelector("#hidden-input-field");
    input.focus();
  }

  function checkWord(attempt) {
    return Object.keys(selectedWord)[0].toLowerCase() === attempt.toLowerCase();
  }

  function isValidWord(attempt) {
    return listOfWords[attempt] !== undefined;
  }

  function showNotification(title, message, type, duration = 2000, container = "top-center") {
    Store.addNotification({
      ...notifications,
      type,
      title,
      message,
      container,
      dismiss: {
        duration
      }
    }
    );
  }

  function checkUserSubmission(e) {
    e.preventDefault();
    if (gameStatus === GAME_STATUS.STARTED) {
      const currentAttempt = attempts[currentAttemptIndex];
      if (currentAttempt.length === wordLength && isValidWord(currentAttempt)) {
        const newList = [...attempts];
        if (checkWord(currentAttempt)) {
          updateGameStatus(GAME_STATUS.WIN);
          showNotification("Congratulations!", "You have won this game, try another round!", "success");
        } else if (currentAttemptIndex + 1 < tries) {
          newList.push("");
        } else {
          updateGameStatus(GAME_STATUS.LOST);
          showNotification("Opps!", "You have lost this game, try another round!", "danger");
        }
        setAttempts(newList);
        setCurrentAttemptIndex(currentAttemptIndex + 1);
      } else {
        // TODO: is not valid word
        showNotification("Invalid word", "Word is not valid, please try a new word", "info", 2000, "top-center");

      }
    } else if (gameStatus === GAME_STATUS.WIN) {
      const word = Object.keys(selectedWord)[0];
      const definition = selectedWord[word];
      showNotification("Congratulations!", `You have won this game, try another round! The word was ${word}: ${definition}`, "success", 7000);
    } else {

      const word = Object.keys(selectedWord)[0];
      const definition = selectedWord[word];
      showNotification("Opps!", `You have lost this game, try another round! The word was ${word}: ${definition}`, "warning", 7000);
    }

  }

  function handleKeyPress(e) {
    e.preventDefault();
    if (gameStatus === GAME_STATUS.STARTED) {
      // const newList = [...attempts];
      let newAttempt = attempts[currentAttemptIndex];
      if (e.key === "Backspace" && newAttempt.length > 0) {
        newAttempt = newAttempt.substring(0, newAttempt.length - 1);
        updateAttempt(newAttempt.toLowerCase());
      } else if (e.key.length === 1 && /^[a-zA-Z]/.test(e.key) && newAttempt.length < wordLength) {
        newAttempt += e.key;
        updateAttempt(newAttempt.toLowerCase());
      }
    }
    e.target.value = "";
  }

  function initializeNewGame() {
    setRandomWord();
    setAttempts([""]);
    setCurrentAttemptIndex(0);
    updateGameStatus(GAME_STATUS.STARTED);
    showNotification("Good Luck", `You have started a new game, try to find the ${wordLength} letter word with ${tries} attempts!`, "info", 3000);
  }

  return (
    <div className="game" >
      <div className="container" >
        <div id="nav-bar">
          <Link to={"/"}>Home</Link>
          <Link to={"/game"}>Game</Link>
          <Link to={"/rules"}>Rules</Link>
        </div>
        <div onClick={setHiddenInputFocus}>
          <div id="game-header" >
            <h1>
              Guess the word!
            </h1>
          </div>
          <div>
            Attempts: {tries - currentAttemptIndex}
          </div>
          <form onSubmit={(e) => checkUserSubmission(e)}>
            <input id="hidden-input-field" type="" onKeyUp={(e) => handleKeyPress(e)} />
          </form>
          <div className="game-board">
            <Board />
          </div>

          <button type="reset" onClick={initializeNewGame}>
            New Game
          </button>
        </div>

      </div>
    </div>

  )
}
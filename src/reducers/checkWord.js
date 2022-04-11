import { GAME_STATUS } from "../utility";
import dictionary from "../resources/words-def.json";

const initialState = {
    wordLength: 5,
    tries: 7,
    gameStatus: GAME_STATUS.STARTED,
    isCurrentAttemptValid: false,
    currentAttemptIndex: 0,
    attempts: [""],
    selectedWord: ""
}

function checkWord(state = initialState, action) {
    switch (action.type) {
        case 'CHECK_ATTEMPT':
            return state

        case 'SET_ATTEMPTS': {
            return {
                ...state,
                attempts: action.attempts
            };
        }

        case 'UPDATE_ATTEMPT': {
            state.attempts[action.index] = action.attempt;
            return {
                ...state,
                attempts: [...state.attempts]
            }
        }
        case 'SET_DIFFICULTY': {
            return {
                ...state,
                wordLength: action.wordLength,
                tries: action.tries
            }
        }
        case 'SET_CURRENT_INDEX': {
            return {
                ...state,
                currentAttemptIndex: action.index
            }
        }

        case 'LOAD_FROM_STORAGE': {
            return {
                ...state,
                ...action
            }
        }
        case 'UPDATE_GAME_STATUS': {
            return {
                ...state,
                gameStatus: action.gameStatus
            }
        }
        case "SET_RANDOM_WORD": {
            const difficultyLevel = `${state.wordLength}Letter`;
            const options = Object.keys(dictionary[difficultyLevel]);
            const index = Math.floor(Math.random() * options.length)
            const key = options[index];
            const word = {}
            word[key] = dictionary[difficultyLevel][key]
            return {
                ...state,
                selectedWord: word,
                listOfWords: dictionary[difficultyLevel]
            }
        }

        default:
            const difficultyLevel = `${state.wordLength}Letter`;
            const options = Object.keys(dictionary[difficultyLevel]);
            const index = Math.floor(Math.random() * options.length)
            const key = options[index];
            const word = {}
            word[key] = dictionary[difficultyLevel][key]

            return {
                ...state,
                selectedWord: word,
                listOfWords: dictionary[difficultyLevel]
            }
    }
}


export default checkWord;
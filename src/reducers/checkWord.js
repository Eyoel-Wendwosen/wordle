const initialState = {
    difficulty: "EASY",
    tries: 6,
    words: []
    // words: ["world", "focus", "lea", "index", "react", "redux"]
}

function checkWord(state = initialState, action) {
    switch (action.type) {
        case 'CHECK_WORD':
            return state

        case 'SET_WORDS':{
            return {
                ...state,
                words: action.words
            };
        }
            
        default:
            return state;
    }
}


export default checkWord;
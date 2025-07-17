// src/redux/reducers.js
import { GUESS_LETTER, RESET_GAME, SET_NEXT_WORD } from './actions';

const wordsList = ['REACT', 'JAVASCRIPT', 'REDUX', 'FRAMER', 'MOTION' , 'game'  , 'play'  , 'football' , 'basketball'];

const initialState = {
  word: wordsList[0],
  guessedLetters: [],
  incorrectGuesses: 0,
  maxGuesses: 6,
  words: wordsList,
  currentWordIndex: 0,
};

const hangmanReducer = (state = initialState, action) => {
  switch (action.type) {
    case GUESS_LETTER:
      const letter = action.payload;
      const isCorrect = state.word.includes(letter);
      const guessedLetters = [...state.guessedLetters, letter];
      const incorrectGuesses = isCorrect
        ? state.incorrectGuesses
        : state.incorrectGuesses + 1;
      const isWordComplete = state.word.split('').every(l => guessedLetters.includes(l));
      return {
        ...state,
        guessedLetters,
        incorrectGuesses,
        ...(isWordComplete && {
          word: state.words[(state.currentWordIndex + 1) % state.words.length],
          guessedLetters: [],
          incorrectGuesses: 0,
          currentWordIndex: (state.currentWordIndex + 1) % state.words.length,
        }),
      };
    case SET_NEXT_WORD:
      return {
        ...state,
        word: state.words[(state.currentWordIndex + 1) % state.words.length],
        guessedLetters: [],
        incorrectGuesses: 0,
        currentWordIndex: (state.currentWordIndex + 1) % state.words.length,
      };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
};

export default hangmanReducer;

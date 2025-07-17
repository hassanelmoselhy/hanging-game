// src/redux/actions.js
export const GUESS_LETTER = 'GUESS_LETTER';
export const RESET_GAME = 'RESET_GAME';
export const SET_NEXT_WORD = 'SET_NEXT_WORD';

export const guessLetter = (letter) => ({
  type: GUESS_LETTER,
  payload: letter,
});

export const resetGame = () => ({
  type: RESET_GAME,
});
export const setNextWord = () => ({
    type: SET_NEXT_WORD,
  });
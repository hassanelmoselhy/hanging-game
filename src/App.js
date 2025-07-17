import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { guessLetter, resetGame } from './redux/actions';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const App = () => {
  const { word, guessedLetters, incorrectGuesses, maxGuesses } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleGuess = (letter) => {
    dispatch(guessLetter(letter));
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  const displayWord = word.split('').map((letter) => (
    guessedLetters.includes(letter) ? (
      <div className="letter-box" key={letter}>{letter}</div>
    ) : (
      <div className="letter-box" key={letter}></div>
    )
  ));

  const renderKeyboard = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return (
      <div className="keyboard">
        {letters.map((letter) => (
          <motion.button
            key={letter}
            className="key"
            onClick={() => handleGuess(letter)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {letter}
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Word: {displayWord}</h2>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          Incorrect Guesses: {incorrectGuesses}/{maxGuesses}
        </motion.p>
      </AnimatePresence>

      {incorrectGuesses >= maxGuesses && (
        <AnimatePresence>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            Game Over
          </motion.h2>
        </AnimatePresence>
      )}

      <div className="controls">
        {renderKeyboard()}
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Reset Game
        </motion.button>
      </div>
    </div>
  );
};

export default App;
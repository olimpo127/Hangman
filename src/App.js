import React, { useState, useEffect } from 'react';

const HangmanGame = () => {
  const [secretWord, setSecretWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState('player1');

  const handleNewGame = () => {
    if (currentPlayer === 'player1') {
      const newSecretWord = prompt(`${player2Name}, enter the secret word:`).toLowerCase();
      setSecretWord(newSecretWord);
    } else {
      const newSecretWord = prompt(`${player1Name}, enter the secret word:`).toLowerCase();
      setSecretWord(newSecretWord);
    }

    setGuessedLetters([]);
    setRemainingAttempts(6);
    setGameOver(false);

    setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
  };

  const handleGuess = (letter) => {
    if (gameOver) {
      alert('The game is over. Please start a new game.');
      return;
    }

    if (guessedLetters.includes(letter)) {
      alert('You already guessed that letter!');
      return;
    }

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (!secretWord.includes(letter)) {
      setRemainingAttempts(remainingAttempts - 1);
    }

    checkGameStatus();
  };

  const checkGameStatus = () => {
    if (remainingAttempts === 0) {
      setGameOver(true);
      alert('Game over! The secret word was: ' + secretWord);
      if (currentPlayer === 'player1') {
        incrementPlayer1Wins();
      } else {
        incrementPlayer2Wins();
      }
    } else if (isWordGuessed()) {
      setGameOver(true);
      alert('Congratulations! You won!');
      if (currentPlayer === 'player1') {
        incrementPlayer2Wins();
      } else {
        incrementPlayer1Wins();
      }
    }
  };

  useEffect(() => {
    if (remainingAttempts === 0) {
      setGameOver(true);
      alert('Game over! The secret word was: ' + secretWord);
      if (currentPlayer === 'player1') {
        incrementPlayer1Wins();
      } else {
        incrementPlayer2Wins();
      }
    }
  }, [remainingAttempts]);

  const isWordGuessed = () => {
    for (let i = 0; i < secretWord.length; i++) {
      if (!guessedLetters.includes(secretWord[i])) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (secretWord.length > 0 && isWordGuessed()) {
      setGameOver(true);
      alert('Congratulations! You won!');
      if (currentPlayer === 'player1') {
        incrementPlayer2Wins();
      } else {
        incrementPlayer1Wins();
      }
    }
  }, [secretWord, guessedLetters]);
  
  

  const incrementPlayer1Wins = () => {
    setPlayer1Wins(player1Wins + 1);
  };

  const incrementPlayer2Wins = () => {
    setPlayer2Wins(player2Wins + 1);
  };

  const getDisplayWord = () => {
    let displayWord = '';
    for (let i = 0; i < secretWord.length; i++) {
      const letter = secretWord[i];
      if (guessedLetters.includes(letter)) {
        displayWord += letter + ' ';
      } else {
        displayWord += '_ ';
      }
    }
    return displayWord.trim();
  };

  const getAlphabetButtons = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.split('').map((letter) => (
      <button
        key={letter}
        onClick={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter) || gameOver}
        style={{
          backgroundColor: guessedLetters.includes(letter) ? 'gray' : 'blue',
          color: guessedLetters.includes(letter) ? 'white' : 'black',
          margin: '5px',
          padding: '5px 10px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {letter}
      </button>
    ));
  };

  const handlePlayer1NameChange = (event) => {
    setPlayer1Name(event.target.value);
  };

  const handlePlayer2NameChange = (event) => {
    setPlayer2Name(event.target.value);
  };

  const handleReset = () => {
    setSecretWord("");
    setGuessedLetters([]);
    setRemainingAttempts(6);
    setGameOver(false);
    setPlayer1Name("Player 1");
    setPlayer2Name('Player 2');
    setPlayer1Wins(0);
    setPlayer2Wins(0);
    setCurrentPlayer('player1');
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: "lightblue"
      }}
    >
      <h1 style={{ color: 'darkblue', textAlign: 'center' }}>Hangman Game</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <label style={{ marginRight: '10px'}}>
          Player 1 Name:
          <input type="text" value={player1Name} onChange={handlePlayer1NameChange} />
        </label>
        <label>
          Player 2 Name:
          <input type="text" value={player2Name} onChange={handlePlayer2NameChange} />
        </label>
      </div>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>Guess the word:</p>
      <p style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{getDisplayWord()}</p>
      <p style={{ textAlign: 'center' }}>Remaining attempts: {remainingAttempts}</p>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        {getAlphabetButtons()}
      </div>
      <button
        onClick={handleNewGame}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        New Game
      </button>
      <button 
      onClick={handleReset}
      style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '5px',
        }}>
        Reset
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <p style={{ marginRight: '20px', textAlign: 'center', background: "yellow", fontWeight: "bold", padding: "5px" }}>
          {player1Name} Wins: {player1Wins}
        </p>
        <p style={{ textAlign: 'center', background: "yellow", fontWeight: "bold", padding: "5px" }}>
          {player2Name} Wins: {player2Wins}
        </p>
      </div>
    </div>
  );
};

export default HangmanGame;
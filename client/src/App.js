import './App.css';
import React, { useState } from 'react';
import Menu from './components/Menu/Menu';
import Trivia from './components/Trivia/Trivia';
import Scores from './components/Scores/Scores';

const App = () => {
  const [gameState, setGameState] = useState('menu');
  const[score, setScore] = useState(0);

  const startTrivia = () => {
    setGameState('trivia');
  };

  const endTrivia = () => {
    setGameState('scoreboard');
  };

  const returnToMenu = () => {
    setGameState('menu');
    setScore(0);
  };

  const setPlayerScore = (score) => {
    setScore(score)
  }

  return (
    <div id="screen">
      {gameState === 'menu' && (
        <Menu startTrivia={startTrivia} />
      )}
      {gameState === 'trivia' && (
        <Trivia endTrivia={endTrivia} setPlayerScore={setPlayerScore} />
      )}
      {gameState === 'scoreboard' && (
        <Scores score={score} returnToMenu={returnToMenu} />
      )}
    </div>
  );
}

export default App;
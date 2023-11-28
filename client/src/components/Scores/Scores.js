import './Scores.css';
import React from 'react';
import Scoreboard from './Scoreboard/Scoreboard';

const Scores = ({ score, returnToMenu }) => {

  return (
    <div>
      <Scoreboard />
      <button onClick={returnToMenu}>Return to Main Menu</button>
    </div>
  );
}

export default Scores;

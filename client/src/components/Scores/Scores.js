import './Scores.css';
import React from 'react';
import Scoreboard from './Scoreboard/Scoreboard';

const Scores = ({ score, returnToMenu }) => {
  return (
    <div className="scores-container">
      <Scoreboard score={score}/>
      <button onClick={returnToMenu} className="menu-button">Return to Main Menu</button>
    </div>
  );
}


export default Scores;

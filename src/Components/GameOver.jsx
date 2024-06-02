// GameOver.js
import React from 'react';
import './game.css'; // Import your CSS file for styling

const GameOver = ({ score, onRestart }) => {
  return (
    <div className="game-over-tab">
      <h1 id='hed'>Game Over</h1>
      <p>Your score: {score}</p>
      <br />
      <button id='ico' onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameOver;

import React, { useEffect, useRef, useState } from 'react';
import GameOver from './GameOver.jsx';
import './dino.css';

const restartPage = () => {
  window.location.reload();
};

function Dino() {
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space' && !isJumping && !isGameOver) {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isJumping, isGameOver]);

  useEffect(() => {
    if (!isGameOver) {
      const timerInterval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
      }, 200);

      return () => clearInterval(timerInterval);
    }
  }, [isGameOver]);

  const jump = () => {
    setIsJumping(true);

    setTimeout(() => {
      setIsJumping(false);
    }, 2800);
  };

  const handleCollision = () => {
    setIsGameOver(true);
  };

  useEffect(() => {
    const checkCollision = () => {
      const dino = dinoRef.current;
      const obstacle = obstacleRef.current;

      if (dino && obstacle && !isGameOver) {
        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        const dinoMiddleX = dinoRect.left + dinoRect.width / 2;
        const obstacleMiddleX = obstacleRect.left + obstacleRect.width / 2;

        const dinoMiddleY = dinoRect.top + dinoRect.height / 2;
        const obstacleMiddleY = obstacleRect.top + obstacleRect.height / 2;

        // Set thresholds for collision (adjust as needed)
        const collisionThresholdX = Math.min(dinoRect.width, obstacleRect.width) / 4;
        const collisionThresholdY = Math.min(dinoRect.height, obstacleRect.height) / 4;

        if (
          Math.abs(dinoMiddleX - obstacleMiddleX) < collisionThresholdX &&
          Math.abs(dinoMiddleY - obstacleMiddleY) < collisionThresholdY
        ) {
          handleCollision();
        }
      }
    };

    const collisionInterval = setInterval(checkCollision, 10);

    return () => clearInterval(collisionInterval);
  }, [isGameOver]);

  return (
    <div className='container'>
      {isGameOver && <GameOver score={score} onRestart={restartPage} />}
      

      <div className='sky'>
      <h6>Your score: {score}</h6>
      </div>


      <div className={`jumping-image-container ${isJumping ? 'jump' : ''}`}>
        <img src="/images/dino.gif" width={"600px"} alt="" ref={dinoRef} />
      </div>

      <div id='cactus'>
        <img src="https://freepngimg.com/save/19438-cactus-png-4/1024x1365" id='cactuspic' height={'200px'} alt="Obstacle" ref={obstacleRef} />
      </div>
      <div className='land'>
        <img src="/imagel/land.gif" alt="" />
      </div>
    </div>
  );
}

export default Dino;

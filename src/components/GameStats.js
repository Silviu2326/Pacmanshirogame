import React from 'react';
import protagonistaImg from '../protagonista.png';

const GameStats = ({ score, highScore, lives, level, gameTime, isMobile }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isMobile) {
    return (
      <>
        <div className="mobile-header">
          <div className="avatar-container">
            <img src={protagonistaImg} alt="Shiro Neko" className="avatar-img" />
          </div>
        </div>

        <div className="mobile-stats">
          <div className="stat-bar score-bar">
            <span className="stat-label">Puntuación:</span>
            <span className="stat-value">{score.toLocaleString()}</span>
          </div>
          <div className="stat-bar record-bar">
            <span className="stat-label">Récord:</span>
            <span className="stat-value">{highScore.toLocaleString()}</span>
          </div>
          <div className="stat-bar lives-bar">
            <span className="stat-label">Vidas:</span>
            <span className="stat-value">{'❤️'.repeat(Math.max(0, lives))}</span>
          </div>
          <div className="stat-bar level-bar">
            <span className="stat-label">Nivel:</span>
            <span className="stat-value">{level}</span>
          </div>
          <div className="stat-bar time-bar">
            <span className="stat-label">Tiempo:</span>
            <span className="stat-value">{formatTime(gameTime)}</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="game-info">
      <h1>🐱 Shiro Neko Pacman 🐱</h1>
      <div className="game-stats">
        <div className="score">Puntuación: {score.toLocaleString()}</div>
        <div className="high-score">Récord: {highScore.toLocaleString()}</div>
        <div className="lives">Vidas: {'❤️'.repeat(Math.max(0, lives))}</div>
        <div className="level">Nivel: {level}</div>
        <div className="time">Tiempo: {formatTime(gameTime)}</div>
      </div>
    </div>
  );
};

export default GameStats;
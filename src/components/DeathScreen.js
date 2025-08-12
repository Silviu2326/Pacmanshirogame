import React from 'react';

const DeathScreen = ({ score, highScore, resetGame, gameTime }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isNewHighScore = score > highScore;

  return (
    <div className="death-screen-overlay">
      <div className="death-screen">
        <div className="death-header">
          <div className="skull-icon">💀</div>
          <h1 className="death-title">GAME OVER</h1>
          <div className="death-subtitle">¡Los fantasmas te atraparon!</div>
        </div>

        <div className="death-stats">
          <div className="death-stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-label">Puntuación Final</div>
            <div className="stat-value final-score">{score.toLocaleString()}</div>
          </div>

          {isNewHighScore && (
            <div className="death-stat-card new-record">
              <div className="stat-icon">🌟</div>
              <div className="stat-label">¡NUEVO RÉCORD!</div>
              <div className="stat-value record-score">{score.toLocaleString()}</div>
            </div>
          )}

          <div className="death-stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-label">Tiempo Jugado</div>
            <div className="stat-value">{formatTime(gameTime)}</div>
          </div>

          <div className="death-stat-card">
            <div className="stat-icon">🥇</div>
            <div className="stat-label">Mejor Puntuación</div>
            <div className="stat-value high-score">{Math.max(score, highScore).toLocaleString()}</div>
          </div>
        </div>

        <div className="death-actions">
          <button className="restart-btn" onClick={resetGame}>
            <span className="btn-icon">🔄</span>
            <span className="btn-text">JUGAR DE NUEVO</span>
          </button>
          <div className="death-hint">
            <span className="hint-icon">⌨️</span>
            <span>Presiona R para reiniciar rápidamente</span>
          </div>
        </div>

        <div className="death-footer">
          <div className="ghost-parade">
            <span className="ghost-float">👻</span>
            <span className="ghost-float">🟣</span>
            <span className="ghost-float">🔵</span>
            <span className="ghost-float">🟠</span>
          </div>
          <div className="death-message">"Mejor suerte la próxima vez, Shiro Neko"</div>
        </div>
      </div>
    </div>
  );
};

export default DeathScreen;
import React from 'react';
import { GAME_STATES } from '../constants/gameConstants';

const MobileControls = ({ setDirection, gameState, setGameState, resetGame }) => {
  return (
    <div className="mobile-controls-new">
      <div className="controls-header">
        <div className="controls-title">🎮 Controles</div>
      </div>
      
      <div className="d-pad-container">
        <div className="d-pad-section">
          <div className="d-pad">
            <div className="d-pad-row">
              <button 
                className="d-pad-btn up"
                onTouchStart={(e) => {
                  e.preventDefault();
                  if (gameState === GAME_STATES.READY) {
                    setGameState(GAME_STATES.PLAYING);
                  }
                  setDirection({ x: 0, y: -1 });
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (gameState === GAME_STATES.READY) {
                    setGameState(GAME_STATES.PLAYING);
                  }
                  setDirection({ x: 0, y: -1 });
                }}
              >
                <span className="direction-icon">▲</span>
              </button>
            </div>
            <div className="d-pad-middle">
              <button 
                className="d-pad-btn left"
                onTouchStart={(e) => {
                  e.preventDefault();
                  if (gameState === GAME_STATES.READY) {
                    setGameState(GAME_STATES.PLAYING);
                  }
                  setDirection({ x: -1, y: 0 });
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (gameState === GAME_STATES.READY) {
                    setGameState(GAME_STATES.PLAYING);
                  }
                  setDirection({ x: -1, y: 0 });
                }}
              >
                <span className="direction-icon">◀</span>
              </button>
              <div className="d-pad-center">
                <span className="center-icon">🐱</span>
              </div>
              <button 
                className="d-pad-btn right"
                onTouchStart={(e) => {
                  e.preventDefault();
                  if (gameState === GAME_STATES.READY) {
                    setGameState(GAME_STATES.PLAYING);
                  }
                  setDirection({ x: 1, y: 0 });
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (gameState === GAME_STATES.READY) {
                    setGameState(GAME_STATES.PLAYING);
                  }
                  setDirection({ x: 1, y: 0 });
                }}
              >
                <span className="direction-icon">▶</span>
              </button>
            </div>
            <div className="d-pad-row">
              <button 
                className="d-pad-btn down"
                onTouchStart={(e) => {
                  e.preventDefault();
                  if (gameState === GAME_STATES.READY) {
                    setGameState(GAME_STATES.PLAYING);
                  }
                  setDirection({ x: 0, y: 1 });
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (gameState === GAME_STATES.READY) {
                    setGameState(GAME_STATES.PLAYING);
                  }
                  setDirection({ x: 0, y: 1 });
                }}
              >
                <span className="direction-icon">▼</span>
              </button>
            </div>
          </div>
          <div className="control-label">
            <span className="label-icon">👆</span>
            Toca para mover
          </div>
        </div>

        <div className="action-section">
          <div className="action-buttons">
            <button 
              className="action-btn pause-btn-new"
              onClick={() => {
                if (gameState === GAME_STATES.PLAYING) {
                  setGameState(GAME_STATES.PAUSED);
                } else if (gameState === GAME_STATES.PAUSED) {
                  setGameState(GAME_STATES.PLAYING);
                } else if (gameState === GAME_STATES.READY) {
                  setGameState(GAME_STATES.PLAYING);
                }
              }}
            >
              <span className="action-icon">
                {gameState === GAME_STATES.PLAYING ? '⏸' : '▶'}
              </span>
            </button>
            
            <button 
              className="action-btn reset-btn-new"
              onClick={() => {
                resetGame();
              }}
            >
              <span className="action-icon">🔄</span>
            </button>
          </div>
          <div className="action-labels">
            <div className="action-label">Pausa</div>
            <div className="action-label">Reiniciar</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileControls;
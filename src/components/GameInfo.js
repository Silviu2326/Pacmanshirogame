import React from 'react';
import { GAME_STATES, GHOST_TYPES } from '../constants/gameConstants';

const GameInfo = ({ gameState, powerMode, powerModeTimer, isMobile }) => {
  const getGameStateMessage = () => {
    switch (gameState) {
      case GAME_STATES.READY:
        return "¡Presiona ESPACIO para comenzar!";
      case GAME_STATES.PAUSED:
        return "PAUSADO - Presiona ESPACIO para continuar";
      case GAME_STATES.GAME_OVER:
        return "GAME OVER - Presiona R para reiniciar";
      default:
        return "";
    }
  };

  if (isMobile) {
    return (
      <>
        <div className="mobile-message">
          <div className="mobile-instruction">📱 Desliza para mover | Toca botones para controlar</div>
          <div className="mobile-description">Come todos los puntos y evita los fantasmas!</div>
          {powerMode && <div className="power-info-mobile">¡MODO PODER ACTIVO!</div>}
        </div>
        
        {gameState !== GAME_STATES.PLAYING && gameState !== GAME_STATES.PAUSED && (
          <div className="mobile-game-message">
            {getGameStateMessage()}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {powerMode && (
        <div className="power-timer">
          🌟 Power Mode: {Math.ceil(powerModeTimer / 1000)}s
        </div>
      )}

      <div className="game-state-message">
        {getGameStateMessage()}
      </div>

      <div className="controls">
        <div>🎮 Flechas: Mover | ESPACIO: Pausa | R: Reiniciar</div>
        <div>Come todos los puntos y evita los fantasmas!</div>
        {powerMode && <div className="power-info">¡MODO PODER ACTIVO!</div>}
      </div>

      <div className="game-footer">
        <div className="ghost-info">
          <div className="ghost-legend">
            <div className="ghost-card">
              <span>👻 {GHOST_TYPES.BLINKY.name}</span>
            </div>
            <div className="ghost-card">
              <span>🟣 {GHOST_TYPES.PINKY.name}</span>
            </div>
            <div className="ghost-card">
              <span>🔵 {GHOST_TYPES.INKY.name}</span>
            </div>
            <div className="ghost-card">
              <span>🟠 {GHOST_TYPES.CLYDE.name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameInfo;
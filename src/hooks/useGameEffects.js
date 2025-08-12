import { useEffect } from 'react';
import { GAME_STATES } from '../constants/gameConstants';

export const useGameEffects = ({
  gameState,
  direction,
  moveShiro,
  moveGhosts,
  powerMode,
  powerModeTimer,
  setPowerMode,
  setPowerModeTimer,
  setGhosts,
  setGameTime,
  gameLoopRef,
  powerModeRef,
  ghostLoopRef
}) => {
  // Game loop principal
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      gameLoopRef.current = setInterval(() => {
        if (direction.x !== 0 || direction.y !== 0) {
          moveShiro(direction);
        }
      }, 150);
    } else {
      clearInterval(gameLoopRef.current);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [gameState, direction, moveShiro, gameLoopRef]);

  // Game loop para fantasmas
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      ghostLoopRef.current = setInterval(() => {
        moveGhosts();
      }, 300); // Los fantasmas se mueven más lento que el jugador
    } else {
      clearInterval(ghostLoopRef.current);
    }
    return () => clearInterval(ghostLoopRef.current);
  }, [gameState, moveGhosts, ghostLoopRef]);

  // Timer del juego
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      const timer = setInterval(() => setGameTime(t => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, setGameTime]);

  // Timer del modo poder
  useEffect(() => {
    if (powerMode && powerModeTimer > 0) {
      powerModeRef.current = setTimeout(() => {
        setPowerModeTimer(t => t - 100);
      }, 100);
    } else if (powerMode && powerModeTimer <= 0) {
      setPowerMode(false);
      setGhosts(prevGhosts => 
        prevGhosts.map(ghost => ({ ...ghost, mode: 'chase' }))
      );
    }
    return () => clearTimeout(powerModeRef.current);
  }, [powerMode, powerModeTimer, setPowerMode, setPowerModeTimer, setGhosts, powerModeRef]);
};
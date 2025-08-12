import { useState, useEffect, useCallback } from 'react';
import { GAME_STATES } from '../constants/gameConstants';

export const useGameControls = (gameState, setGameState, setDirection, resetGame) => {
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  // Detectar dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                           window.innerWidth <= 768 ||
                           ('ontouchstart' in window);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Controles táctiles
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 30;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        setDirection(deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        setDirection(deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
      }
    }
  }, [touchStart, setDirection]);

  // Controles del teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!e || !e.key) return;
      e.preventDefault();
      
      switch(e.key) {
        case 'ArrowUp': 
          setDirection({ x: 0, y: -1 }); 
          break;
        case 'ArrowDown': 
          setDirection({ x: 0, y: 1 }); 
          break;
        case 'ArrowLeft': 
          setDirection({ x: -1, y: 0 }); 
          break;
        case 'ArrowRight': 
          setDirection({ x: 1, y: 0 }); 
          break;
        case ' ':
          if (gameState === GAME_STATES.READY) {
            setGameState(GAME_STATES.PLAYING);
          } else if (gameState === GAME_STATES.PLAYING) {
            setGameState(GAME_STATES.PAUSED);
          } else if (gameState === GAME_STATES.PAUSED) {
            setGameState(GAME_STATES.PLAYING);
          }
          break;
        case 'r':
          if (gameState === GAME_STATES.GAME_OVER) {
            resetGame();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, setGameState, setDirection, resetGame]);

  return {
    isMobile,
    touchStart,
    handleTouchStart,
    handleTouchEnd
  };
};
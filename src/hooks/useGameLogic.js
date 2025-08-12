import { useState, useEffect, useCallback, useRef } from 'react';
import { MAZE, GAME_STATES, INITIAL_GHOSTS, INITIAL_PLAYER_POSITION } from '../constants/gameConstants';

export const useGameLogic = () => {
  const [shiroPosition, setShiroPosition] = useState(INITIAL_PLAYER_POSITION);
  const [maze, setMaze] = useState(MAZE);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('shiroNekoHighScore') || '0'));
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState(GAME_STATES.READY);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [powerMode, setPowerMode] = useState(false);
  const [powerModeTimer, setPowerModeTimer] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [ghosts, setGhosts] = useState(INITIAL_GHOSTS);
  const [totalDots, setTotalDots] = useState(0);
  const [dotsEaten, setDotsEaten] = useState(0);
  
  const gameLoopRef = useRef();
  const powerModeRef = useRef();
  const ghostLoopRef = useRef();

  // Inicializar puntos totales
  useEffect(() => {
    const dots = MAZE.flat().filter(cell => cell === 2 || cell === 3).length;
    setTotalDots(dots);
  }, []);

  // Verificar colisiones con fantasmas
  const checkGhostCollision = useCallback((position) => {
    return ghosts.some(ghost => ghost.x === position.x && ghost.y === position.y);
  }, [ghosts]);

  // Mover fantasmas
  const moveGhosts = useCallback(() => {
    if (gameState !== GAME_STATES.PLAYING) return;
    
    setGhosts(prevGhosts => 
      prevGhosts.map(ghost => {
        const possibleDirections = [
          { x: 0, y: -1 }, // arriba
          { x: 0, y: 1 },  // abajo
          { x: -1, y: 0 }, // izquierda
          { x: 1, y: 0 }   // derecha
        ];
        
        // Filtrar direcciones válidas (no paredes)
        const validDirections = possibleDirections.filter(dir => {
          const newX = ghost.x + dir.x;
          const newY = ghost.y + dir.y;
          return newX >= 0 && newX < 20 && newY >= 0 && newY < 20 && maze[newY][newX] !== 1;
        });
        
        if (validDirections.length === 0) return ghost;
        
        // Elegir dirección basada en el modo del fantasma
        let chosenDirection;
        if (ghost.mode === 'frightened') {
          // Modo asustado: movimiento aleatorio
          chosenDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
        } else {
          // Modo persecución: intentar acercarse al jugador
          const playerDistance = (dir) => {
            const newX = ghost.x + dir.x;
            const newY = ghost.y + dir.y;
            return Math.abs(newX - shiroPosition.x) + Math.abs(newY - shiroPosition.y);
          };
          
          // Encontrar la dirección que más acerca al fantasma al jugador
          chosenDirection = validDirections.reduce((best, current) => 
            playerDistance(current) < playerDistance(best) ? current : best
          );
        }
        
        return {
          ...ghost,
          x: ghost.x + chosenDirection.x,
          y: ghost.y + chosenDirection.y,
          direction: chosenDirection
        };
      })
    );
  }, [gameState, maze, shiroPosition]);

  // Mover Shiro Neko
  const moveShiro = useCallback((newDirection) => {
    if (gameState !== GAME_STATES.PLAYING) return;
    
    setShiroPosition(prev => {
      const newX = prev.x + newDirection.x;
      const newY = prev.y + newDirection.y;
      
      if (newX < 0 || newX >= 20 || newY < 0 || newY >= 20) return prev;
      if (maze[newY][newX] === 1) return prev;
      
      const newPosition = { x: newX, y: newY };
      
      // Verificar colisión con fantasmas
      if (checkGhostCollision(newPosition)) {
        if (powerMode) {
          setScore(s => s + 200);
          setGhosts(prevGhosts => 
            prevGhosts.map(ghost => 
              ghost.x === newX && ghost.y === newY 
                ? { ...ghost, x: 9, y: 9, mode: 'frightened' }
                : ghost
            )
          );
        } else {
          const newLives = lives - 1;
          setLives(newLives);
          if (newLives <= 0) {
            if (score > highScore) {
              setHighScore(score);
              localStorage.setItem('shiroNekoHighScore', score.toString());
            }
            setGameState(GAME_STATES.GAME_OVER);
          } else {
            setShiroPosition(INITIAL_PLAYER_POSITION);
            setGhosts(INITIAL_GHOSTS);
          }
          return prev;
        }
      }
      
      // Comer comida
      if (maze[newY][newX] === 2 || maze[newY][newX] === 3) {
        const isPowerPellet = maze[newY][newX] === 3;
        const points = isPowerPellet ? 50 : 10;
        setScore(s => s + points);
        setDotsEaten(d => d + 1);
        
        if (isPowerPellet) {
          setPowerMode(true);
          setPowerModeTimer(8000);
          setGhosts(prevGhosts => 
            prevGhosts.map(ghost => ({ ...ghost, mode: 'frightened' }))
          );
        }
        
        setMaze(prevMaze => {
          const newMaze = [...prevMaze];
          newMaze[newY] = [...newMaze[newY]];
          newMaze[newY][newX] = 0;
          return newMaze;
        });
      }
      
      return newPosition;
    });
  }, [gameState, maze, ghosts, powerMode, lives, checkGhostCollision, score, highScore]);

  // Reiniciar juego
  const resetGame = useCallback(() => {
    setShiroPosition(INITIAL_PLAYER_POSITION);
    setMaze(MAZE);
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameState(GAME_STATES.READY);
    setDirection({ x: 0, y: 0 });
    setPowerMode(false);
    setPowerModeTimer(0);
    setDotsEaten(0);
    setGameTime(0);
    setGhosts(INITIAL_GHOSTS);
  }, []);

  return {
    // Estado del juego
    shiroPosition,
    maze,
    score,
    highScore,
    lives,
    level,
    gameState,
    direction,
    powerMode,
    powerModeTimer,
    gameTime,
    ghosts,
    totalDots,
    dotsEaten,
    
    // Referencias
    gameLoopRef,
    powerModeRef,
    ghostLoopRef,
    
    // Funciones
    setGameState,
    setDirection,
    moveShiro,
    moveGhosts,
    resetGame,
    checkGhostCollision,
    setGhosts,
    setPowerMode,
    setPowerModeTimer,
    setGameTime
  };
};
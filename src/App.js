import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameStats from './components/GameStats';
import GameInfo from './components/GameInfo';
import MobileControls from './components/MobileControls';
import DeathScreen from './components/DeathScreen';
import { useGameLogic } from './hooks/useGameLogic';
import { useGameControls } from './hooks/useGameControls';
import { useGameEffects } from './hooks/useGameEffects';
import { GAME_STATES } from './constants/gameConstants';

function App() {
  // Usar hooks personalizados
  const gameLogic = useGameLogic();
  const gameControls = useGameControls(
    gameLogic.gameState,
    gameLogic.setGameState,
    gameLogic.setDirection,
    gameLogic.resetGame
  );

  // Efectos del juego
  useGameEffects({
    gameState: gameLogic.gameState,
    direction: gameLogic.direction,
    moveShiro: gameLogic.moveShiro,
    moveGhosts: gameLogic.moveGhosts,
    powerMode: gameLogic.powerMode,
    powerModeTimer: gameLogic.powerModeTimer,
    setPowerMode: gameLogic.setPowerMode,
    setPowerModeTimer: gameLogic.setPowerModeTimer,
    setGhosts: gameLogic.setGhosts,
    setGameTime: gameLogic.setGameTime,
    gameLoopRef: gameLogic.gameLoopRef,
    powerModeRef: gameLogic.powerModeRef,
    ghostLoopRef: gameLogic.ghostLoopRef
  });

  // Renderizar interfaz móvil
  if (gameControls.isMobile) {
    return (
      <div className="mobile-app">
        <GameStats
          score={gameLogic.score}
          highScore={gameLogic.highScore}
          lives={gameLogic.lives}
          level={gameLogic.level}
          gameTime={gameLogic.gameTime}
          isMobile={true}
        />
        
        <GameInfo
          gameState={gameLogic.gameState}
          powerMode={gameLogic.powerMode}
          powerModeTimer={gameLogic.powerModeTimer}
          isMobile={true}
        />
        
        <GameBoard
          maze={gameLogic.maze}
          shiroPosition={gameLogic.shiroPosition}
          ghosts={gameLogic.ghosts}
          powerMode={gameLogic.powerMode}
          handleTouchStart={gameControls.handleTouchStart}
          handleTouchEnd={gameControls.handleTouchEnd}
          isMobile={true}
        />
        
        <MobileControls
          setDirection={gameLogic.setDirection}
          gameState={gameLogic.gameState}
          setGameState={gameLogic.setGameState}
          resetGame={gameLogic.resetGame}
        />
        
        {gameLogic.gameState === GAME_STATES.GAME_OVER && (
          <DeathScreen
            score={gameLogic.score}
            highScore={gameLogic.highScore}
            resetGame={gameLogic.resetGame}
            gameTime={gameLogic.gameTime}
          />
        )}
      </div>
    );
  }

  // Renderizar interfaz desktop
  return (
    <div className="App">
      <GameStats
        score={gameLogic.score}
        highScore={gameLogic.highScore}
        lives={gameLogic.lives}
        level={gameLogic.level}
        gameTime={gameLogic.gameTime}
        isMobile={false}
      />
      
      <GameInfo
        gameState={gameLogic.gameState}
        powerMode={gameLogic.powerMode}
        powerModeTimer={gameLogic.powerModeTimer}
        isMobile={false}
      />
      
      <GameBoard
        maze={gameLogic.maze}
        shiroPosition={gameLogic.shiroPosition}
        ghosts={gameLogic.ghosts}
        powerMode={gameLogic.powerMode}
        handleTouchStart={gameControls.handleTouchStart}
        handleTouchEnd={gameControls.handleTouchEnd}
        isMobile={false}
      />
      
      {gameLogic.gameState === GAME_STATES.GAME_OVER && (
        <DeathScreen
          score={gameLogic.score}
          highScore={gameLogic.highScore}
          resetGame={gameLogic.resetGame}
          gameTime={gameLogic.gameTime}
        />
      )}
    </div>
  );
}

export default App;
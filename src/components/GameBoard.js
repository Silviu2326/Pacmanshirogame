import React from 'react';
import protagonistaImg from '../protagonista.png';

const GameBoard = ({ maze, shiroPosition, ghosts, powerMode, handleTouchStart, handleTouchEnd, isMobile }) => {
  const renderCell = (cell, x, y) => {
    let className = 'cell';
    let content = '';
    
    if (cell === 1) className += ' wall';
    else if (cell === 2) content = '·';
    else if (cell === 3) content = '●';
    
    if (shiroPosition.x === x && shiroPosition.y === y) {
      content = <img src={protagonistaImg} alt="Shiro Neko" className="protagonist-img" />;
      className += ' shiro';
      if (powerMode) className += ' power-mode';
    }
    
    const ghostAtPosition = ghosts.find(ghost => ghost.x === x && ghost.y === y);
    if (ghostAtPosition && !(shiroPosition.x === x && shiroPosition.y === y)) {
      content = ghostAtPosition.type.emoji;
      className += ` ghost ${ghostAtPosition.mode}`;
    }
    
    return (
      <div key={`${x}-${y}`} className={className}>
        {content}
      </div>
    );
  };

  const boardClassName = isMobile ? 'mobile-game-board' : 'game-board';
  const containerClassName = isMobile ? 'mobile-game-container' : 'game-container';

  return (
    <div className={containerClassName}>
      <div 
        className={boardClassName}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        {maze.map((row, y) =>
          row.map((cell, x) => renderCell(cell, x, y))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
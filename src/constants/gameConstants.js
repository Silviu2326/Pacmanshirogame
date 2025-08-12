// Configuración del juego
export const GRID_SIZE = 20;
export const CELL_SIZE = 30;

// Configuración de sonidos
export const SOUNDS = {
  DOT: '🔊 Chomp!',
  POWER_PELLET: '🔊 Power Up!',
  GHOST_EATEN: '🔊 Ghost Eaten!',
  DEATH: '🔊 Oh no!',
  LEVEL_COMPLETE: '🔊 Level Complete!',
  GAME_START: '🔊 Game Start!'
};

// Laberinto mejorado
export const MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 3, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
  [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
  [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 3, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 3, 1],
  [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Estados del juego
export const GAME_STATES = {
  READY: 'ready',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'game_over'
};

// Tipos de enemigos
export const GHOST_TYPES = {
  BLINKY: { emoji: '👻', color: '#ff0000', speed: 180, name: 'Blinky' },
  PINKY: { emoji: '🟣', color: '#ffb8ff', speed: 200, name: 'Pinky' },
  INKY: { emoji: '🔵', color: '#00ffff', speed: 220, name: 'Inky' },
  CLYDE: { emoji: '🟠', color: '#ffb852', speed: 240, name: 'Clyde' }
};

// Configuración inicial de fantasmas
export const INITIAL_GHOSTS = [
  { id: 'blinky', x: 9, y: 9, direction: { x: 1, y: 0 }, type: GHOST_TYPES.BLINKY, mode: 'chase' },
  { id: 'pinky', x: 10, y: 9, direction: { x: -1, y: 0 }, type: GHOST_TYPES.PINKY, mode: 'chase' },
  { id: 'inky', x: 9, y: 10, direction: { x: 0, y: 1 }, type: GHOST_TYPES.INKY, mode: 'chase' },
  { id: 'clyde', x: 10, y: 10, direction: { x: 0, y: -1 }, type: GHOST_TYPES.CLYDE, mode: 'chase' }
];

// Posición inicial del jugador
export const INITIAL_PLAYER_POSITION = { x: 9, y: 15 };
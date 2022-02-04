import {GameMode} from './models/game-mode.js';
import {initializeNavigation} from './navigator.js';

// DOM

// GLOBAL VARIABLES
let gameMode = GameMode.AI_VS_AI;
let boardSize = 3;

// GLOBAL FUNCTIONS
const play = (selectedGameMode, selectedBoardSize) => {
    gameMode = selectedGameMode;
    boardSize = selectedBoardSize;

    console.log('play!');
};

// MAIN
const main = async () => {
    initializeNavigation(play);
};

main().then();

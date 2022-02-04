import {GameMode} from './models/game-mode.js';

// DOM
const letsGoButton = document.querySelector('#lets-go-button');
const playerVsAiButton = document.querySelector('#player-vs-ai-button');
const aiVsAiButton = document.querySelector('#ai-vs-ai-button');
const playButton = document.querySelector('#play-button');

const boardSizeInput = document.querySelector('#board-size-input');

// GLOBAL VARIABLES
let gameMode = GameMode.AI_VS_AI;
let boardSize = 3;

// GLOBAL FUNCTIONS
const initializeNavigation = (generateBoard) => {
    letsGoButton.addEventListener('click', () => navigate(2));

    playerVsAiButton.addEventListener('click', () => {
        gameMode = GameMode.PLAYER_VS_AI;
        navigate(3);
    });

    aiVsAiButton.addEventListener('click', () => {
        gameMode = GameMode.AI_VS_AI;
        navigate(3);
    });

    playButton.addEventListener('click', () => {
        boardSize = boardSizeInput.value || 3;
        generateBoard(gameMode, boardSize);
        navigate(4);
    });
};

const navigate = (step) => {
    document.body.style.transform = `translateX(${(step - 1) * -100}%)`;
};

// EXPORTS
export {initializeNavigation};

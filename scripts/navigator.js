import {GameMode} from './models/game-mode.js';

// DOM
const letsGoButton = document.querySelector('#lets-go-button');
const playerVsPlayerButton = document.querySelector('#player-vs-player-button');
const playerVsAiButton = document.querySelector('#player-vs-ai-button');
const aiVsAiButton = document.querySelector('#ai-vs-ai-button');
const playButton = document.querySelector('#play-button');

const boardSizeInput = document.querySelector('#board-size-input');
const maximumSearchableDepthByAiInput = document.querySelector('#maximum-searchable-depth-by-ai-input');
const aiDelayInput = document.querySelector('#ai-delay-input');

const winnerIndicator = document.querySelector('#winner-indicator');
const playAgainButton = document.querySelector('#play-again-button');

// GLOBAL VARIABLES
let gameMode = GameMode.AI_VS_AI;
let boardSize = 3;
let maximumSearchableDepthByAi = 2;
let aiDelay = 1000;

// GLOBAL FUNCTIONS
const initializeNavigation = (generateBoard) => {
    letsGoButton.addEventListener('click', () => navigate(2));

    playerVsPlayerButton.addEventListener('click', () => {
        gameMode = GameMode.PLAYER_VS_PLAYER;
        navigate(3);
    });

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
        maximumSearchableDepthByAi = maximumSearchableDepthByAiInput.value || 2;
        aiDelay = aiDelayInput.value || 0;

        generateBoard({
            gameMode,
            boardSize,
            maximumSearchableDepthByAi,
            aiDelay,
        });

        navigate(4);
    });

    playAgainButton.addEventListener('click', () => location.reload());
};

const navigate = (step) => {
    document.body.style.transform = `translateX(${(step - 1) * -100}%)`;
};

const gameOver = (winner) => {
    if (winner) {
        winnerIndicator.innerHTML = `${winner} Won!`;
        winnerIndicator.className = winner.toLowerCase();
    } else {
        winnerIndicator.innerHTML = "It's a Tie!";
        winnerIndicator.className = '';
    }

    navigate(5);
};

// EXPORTS
export {initializeNavigation, gameOver};

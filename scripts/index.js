import {GameMode} from './models/game-mode.js';
import {Player} from './models/player.js';
import {gameOver, initializeNavigation} from './navigator.js';

// DOM
const currentPlayerIndicator = document.querySelector('#current-player-indicator');
const board = document.querySelector('#board');

// GLOBAL VARIABLES
let gameMode = GameMode.AI_VS_AI;
let boardSize = 3;
let currentPlayer = Player.O;

// GLOBAL FUNCTIONS
const play = (selectedGameMode, selectedBoardSize) => {
    gameMode = selectedGameMode;
    boardSize = selectedBoardSize;

    generateBoard();
    initializeEventListeners();
    syncCurrentPlayerIndicator();
};

const generateBoard = () => {
    const rows = [];

    for (let i = 1; i <= boardSize; i++) {
        const cells = [];
        for (let j = 1; j <= boardSize; j++) {
            const isInPrimaryDiagonal = i === j;
            const isInSecondaryDiagonal = i + j === boardSize + 1;

            cells.push(`<td
							data-row="${i}"
							data-col="${j}"
							data-is-in-primary-diagonal="${isInPrimaryDiagonal}"
							data-is-in-secondary-diagonal="${isInSecondaryDiagonal}"
						>
							&nbsp;
						</td>`);
        }

        rows.push(`<tr>${cells.join('\n')}</tr>`);
    }

    board.innerHTML = rows.join('\n');
};

const initializeEventListeners = () => {
    const cells = board.querySelectorAll('td');
    cells.forEach((cell) => {
        cell.addEventListener('click', cellClickListener);
    });
};

const changePlayer = () => {
    currentPlayer = currentPlayer === Player.O ? Player.X : Player.O;
    syncCurrentPlayerIndicator();
};

const syncCurrentPlayerIndicator = () => {
    currentPlayerIndicator.innerHTML = `${currentPlayer}'s turn ...`;
    currentPlayerIndicator.className = currentPlayer.toLowerCase();
};

// EVENT LISTENERS
const cellClickListener = (e) => {
    const cell = e.target.closest('td');

    const row = +cell.dataset['row'];
    const col = +cell.dataset['col'];
    const isInPrimaryDiagonal = cell.dataset['isInPrimaryDiagonal'] === 'true';
    const isInSecondaryDiagonal = cell.dataset['isInSecondaryDiagonal'] === 'true';

    cellClickHandler(cell, row, col, isInPrimaryDiagonal, isInSecondaryDiagonal);
};

// EVENT HANDLERS
const cellClickHandler = (cell, row, col, isInPrimaryDiagonal, isInSecondaryDiagonal) => {
    cell.removeEventListener('click', cellClickListener);

    cell.innerHTML = currentPlayer;
    cell.className = currentPlayer.toLowerCase();

    const isRowFilled = checkCells(`td[data-row="${row}"]`);
    const isColFilled = checkCells(`td[data-col="${col}"]`);
    const isPrimaryDiagonalFilled = isInPrimaryDiagonal && checkCells(`td[data-is-in-primary-diagonal="true"]`);
    const isSecondaryDiagonalFilled = isInSecondaryDiagonal && checkCells(`td[data-is-in-secondary-diagonal="true"]`);

    console.log({
        isRowFilled,
        isColFilled,
        isPrimaryDiagonalFilled,
        isSecondaryDiagonalFilled,
    });

    if (isRowFilled || isColFilled || isPrimaryDiagonalFilled || isSecondaryDiagonalFilled) gameOver(currentPlayer);
    else if (board.querySelectorAll('td:not(.x, .o)').length === 0) gameOver();
    else changePlayer();
};

const checkCells = (selector) => {
    return [...board.querySelectorAll(selector)].every((td) => td.textContent === currentPlayer);
};

// MAIN
const main = () => {
    initializeNavigation(play);

    // TODO: remove this
    play(GameMode.AI_VS_AI, 3);
};

main();
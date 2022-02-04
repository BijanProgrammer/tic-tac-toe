import {Player} from './models/player.js';
import {GameStatus} from './models/game-status.js';

let board;
let boardSize;
let maximumSearchableDepthByAi;

const computeBestNextMove = (settings) => {
    const {matrix, currentPlayer} = settings;
    ({maximumSearchableDepthByAi} = settings);

    board = matrix;
    boardSize = matrix.length;

    return currentPlayer === Player.O ? alphaBetaMax(-2, 2, 0) : alphaBetaMin(-2, 2, 0);
};

const alphaBetaMax = (alpha, beta, depth) => {
    if (depth > maximumSearchableDepthByAi) return {score: 0};

    const status = gameStatus();
    if (status === GameStatus.X_WON) return {score: -1};
    else if (status === GameStatus.O_WON) return {score: 1};
    else if (status === GameStatus.TIE) return {score: 0};

    let maxScore = -2;
    let row;
    let col;

    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === Player.X || board[r][c] === Player.O) continue;

            board[r][c] = Player.O;

            const {score} = alphaBetaMin(alpha, beta, depth + 1);
            if (maxScore < score) {
                maxScore = score;
                row = r;
                col = c;
            }

            board[r][c] = '';

            if (maxScore >= beta) return {row, col, score: maxScore};

            if (maxScore > alpha) alpha = maxScore;
        }
    }

    return {row, col, score: maxScore};
};

const alphaBetaMin = (alpha, beta, depth) => {
    if (depth > maximumSearchableDepthByAi) return {score: 0};

    const status = gameStatus();
    if (status === GameStatus.X_WON) return {score: -1};
    else if (status === GameStatus.O_WON) return {score: 1};
    else if (status === GameStatus.TIE) return {score: 0};

    let minScore = 2;
    let row;
    let col;

    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === Player.X || board[r][c] === Player.O) continue;

            board[r][c] = Player.X;

            const {score} = alphaBetaMax(alpha, beta, depth + 1);
            if (minScore > score) {
                minScore = score;
                row = r;
                col = c;
            }

            board[r][c] = '';

            if (minScore <= alpha) return {row, col, score: minScore};

            if (minScore < beta) beta = minScore;
        }
    }

    return {row, col, score: minScore};
};

const gameStatus = () => {
    const rowStatus = gameStatusBasedOnRows(board);
    if (rowStatus !== null) return rowStatus;

    const colStatus = gameStatusBasedOnCols(board);
    if (colStatus !== null) return colStatus;

    const primaryDiagonalStatus = gameStatusBasedOnPrimaryDiagonal(board);
    if (primaryDiagonalStatus !== null) return primaryDiagonalStatus;

    const secondaryDiagonalStatus = gameStatusBasedOnSecondaryDiagonal(board);
    if (secondaryDiagonalStatus !== null) return secondaryDiagonalStatus;

    const hasEmptyCell = board.some((row) => row.some((cell) => cell !== Player.X && cell !== Player.O));
    return hasEmptyCell ? GameStatus.ONGOING : GameStatus.TIE;
};

const gameStatusBasedOnRows = () => {
    for (let row = 0; row < boardSize; row++) {
        let xCount = 0;
        let oCount = 0;

        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === Player.X) xCount++;
            else if (board[row][col] === Player.O) oCount++;
            else break;
        }

        if (xCount === boardSize) return GameStatus.X_WON;
        if (oCount === boardSize) return GameStatus.O_WON;
    }

    return null;
};

const gameStatusBasedOnCols = () => {
    for (let col = 0; col < boardSize; col++) {
        let xCount = 0;
        let oCount = 0;

        for (let row = 0; row < boardSize; row++) {
            if (board[row][col] === Player.X) xCount++;
            else if (board[row][col] === Player.O) oCount++;
            else break;
        }

        if (xCount === boardSize) return GameStatus.X_WON;
        if (oCount === boardSize) return GameStatus.O_WON;
    }

    return null;
};

const gameStatusBasedOnPrimaryDiagonal = () => {
    let xCount = 0;
    let oCount = 0;

    for (let row = 0; row < boardSize; row++) {
        if (board[row][row] === Player.X) xCount++;
        else if (board[row][row] === Player.O) oCount++;
        else break;
    }

    if (xCount === boardSize) return GameStatus.X_WON;
    if (oCount === boardSize) return GameStatus.O_WON;
    return null;
};

const gameStatusBasedOnSecondaryDiagonal = () => {
    let xCount = 0;
    let oCount = 0;

    for (let row = 0; row < boardSize; row++) {
        const col = boardSize - 1 - row;

        if (board[row][col] === Player.X) xCount++;
        else if (board[row][col] === Player.O) oCount++;
        else break;
    }

    if (xCount === boardSize) return GameStatus.X_WON;
    if (oCount === boardSize) return GameStatus.O_WON;
    return null;
};

export {computeBestNextMove};

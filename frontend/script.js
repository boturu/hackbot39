// script.js

document.addEventListener('DOMContentLoaded', () => {
    let gameState = initializeGameState();

    const player1Button = document.getElementById('player1-button');
    const player2Button = document.getElementById('player2-button');
    const player1Score = document.getElementById('player1-score');
    const player2Score = document.getElementById('player2-score');
    const currentServer = document.getElementById('current-server');
    const gameStatus = document.getElementById('game-status');

    player1Button.addEventListener('click', () => {
        scorePoint(gameState, 1);
        updateUI();
    });

    player2Button.addEventListener('click', () => {
        scorePoint(gameState, 2);
        updateUI();
    });

    function updateUI() {
        player1Score.textContent = gameState.player1_score;
        player2Score.textContent = gameState.player2_score;
        currentServer.textContent = `Player ${gameState.current_server}`;
        gameStatus.textContent = gameState.game_status === 0 ? 'Ongoing' : gameState.game_status === 1 ? 'Player 1 Wins' : 'Player 2 Wins';
    }

    function initializeGameState() {
        return {
            player1_score: 0,
            player2_score: 0,
            current_server: 1,
            game_status: 0,
            server_switch_count: 0
        };
    }

    function scorePoint(gameState, player) {
        if (player !== 1 && player !== 2 || gameState.game_status !== 0) return;

        if (player === 1) gameState.player1_score++;
        else gameState.player2_score++;

        if (gameState.player1_score >= 11 && gameState.player1_score - gameState.player2_score >= 2) {
            gameState.game_status = 1;
        } else if (gameState.player2_score >= 11 && gameState.player2_score - gameState.player1_score >= 2) {
            gameState.game_status = 2;
        }

        gameState.server_switch_count++;
        if (gameState.server_switch_count >= 5) {
            gameState.current_server = gameState.current_server === 1 ? 2 : 1;
            gameState.server_switch_count = 0;
        }
    }

    updateUI();
});


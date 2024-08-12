const API_BASE_URL = 'http://localhost:4000'; // Replace with your actual backend URL

async function createPlayer() {
    const accountId = document.getElementById('create-account-id').value;
    const name = document.getElementById('create-name').value;
    try {
        const response = await fetch(`${API_BASE_URL}/create_player`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountId, name }),
        });
        if (!response.ok) {
            throw new Error('Failed to create player');
        }
        alert('Player created!');
    } catch (error) {
        alert(error.message);
    }
}

async function updateScore() {
    const accountId = document.getElementById('update-account-id').value;
    const score = document.getElementById('update-score').value;
    try {
        const response = await fetch(`${API_BASE_URL}/update_score`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountId, score: Number(score) }),
        });
        if (!response.ok) {
            throw new Error('Failed to update score');
        }
        alert('Score updated!');
    } catch (error) {
        alert(error.message);
    }
}

async function getScore() {
    const accountId = document.getElementById('get-account-id').value;
    try {
        const response = await fetch(`${API_BASE_URL}/get_score`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountId }),
        });
        if (!response.ok) {
            throw new Error('Failed to get score');
        }
        const data = await response.json();
        document.getElementById('player-score').innerText = `Score: ${data.score}`;
    } catch (error) {
        alert(error.message);
    }
}

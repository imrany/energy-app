async function loadLeaderboard() {
    const response = await fetch('/leaderboard');
    const leaderboardData = await response.json();
    renderLeaderboard(leaderboardData);
}

function renderLeaderboard(data) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';

    data.forEach((entry, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${entry.locationName}</td>
            <td>${entry.totalEnergy} watts</td>
            <td>
                <button onclick="deleteEntry(${index})">Delete</button>
            </td>
        `;
        leaderboardBody.appendChild(tr);
    });
}

async function deleteEntry(index) {
    const response = await fetch(`/leaderboard/${index}`, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        loadLeaderboard();  // Reload leaderboard after deletion
    } else {
        alert('Error deleting entry');
    }
}

// Load leaderboard on page load
document.addEventListener('DOMContentLoaded', loadLeaderboard);

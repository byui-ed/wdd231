const spotlightsContainer = document.getElementById('spotlights-container');
const membersURL = 'data/members.json'; // Path to your local JSON file

async function getSpotlights() {
    try {
        const response = await fetch(membersURL);
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
        spotlightsContainer.innerHTML = '<p>Could not load member spotlights.</p>';
    }
}

function displaySpotlights(members) {
    // 1. Filter for Gold or Silver members
    const premiumMembers = members.filter(
        member => member.level === 'Gold' || member.level === 'Silver'
    );

    // 2. Randomly select 2 or 3 members
    const numToDisplay = Math.floor(Math.random() * 2) + 2; // Randomly 2 or 3
    const shuffledMembers = premiumMembers.sort(() => 0.5 - Math.random());
    const selectedSpotlights = shuffledMembers.slice(0, numToDisplay);

    spotlightsContainer.innerHTML = ''; // Clear 'Loading...'

    // 3. Display the selected members
    selectedSpotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <h4>${member.name}</h4>
            <img src="${member.logo}" alt="${member.name} Logo">
            <p><strong>Level:</strong> ${member.level}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;

        spotlightsContainer.appendChild(card);
    });
}

// Execute the function
getSpotlights();
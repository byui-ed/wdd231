const memberDisplay = document.getElementById('member-display');
const gridButton = document.getElementById('grid-view');
const listButton = document.getElementById('list-view');
const menuToggle = document.getElementById('menu-toggle');
const navigation = document.querySelector('.navigation');

// --- Helper function to map membership level to text ---
const getLevelText = (level) => {
    switch (level) {
        case 1:
            return 'Basic Member';
        case 2:
            return 'Silver Member';
        case 3:
            return 'Gold Member';
        default:
            return 'Associate';
    }
};

// --- 1. Member Card Creation ---
const createMemberCard = (member) => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    card.innerHTML = `
        <img src="images/${member.imagefile}" alt="Logo of ${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <p class="address">${member.address}</p>
        <p class="phone">${member.phone}</p>
        <a href="${member.website}" target="_blank" class="website-link">${member.website.replace('https://', '').replace('http://', '')}</a>
        <p class="membership-level">**Membership:** ${getLevelText(member.membershiplevel)}</p>
        <p class="other-info">${member.otherinfo}</p>
    `;

    return card;
};

// --- 2. Data Fetching and Display ---
const fetchMembers = async () => {
    try {
        // Use async/await and fetch to retrieve JSON data
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Could not fetch members data:', error);
        memberDisplay.innerHTML = '<p>Error loading member directory.</p>';
    }
};

const displayMembers = (members) => {
    memberDisplay.innerHTML = ''; // Clear existing content
    members.forEach(member => {
        memberDisplay.appendChild(createMemberCard(member));
    });
};

// --- 3. View Toggle Logic ---
const setView = (viewType) => {
    const cards = document.querySelectorAll('.member-card');

    if (viewType === 'list') {
        memberDisplay.classList.add('list');
        memberDisplay.classList.remove('grid');
        cards.forEach(card => card.classList.add('list-item'));
    } else { // 'grid' view
        memberDisplay.classList.add('grid');
        memberDisplay.classList.remove('list');
        cards.forEach(card => card.classList.remove('list-item'));
    }
};

// Attach listeners for view switching
gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

// --- 4. Footer Date Updates ---
const updateFooterDates = () => {
    // Current Year for Copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Last Modification Date
    const lastModified = document.lastModified;
    document.getElementById('last-modified').textContent = lastModified;
};

// --- 5. Mobile Menu Toggle (Basic functionality for responsive navigation) ---
menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('open'); 
    menuToggle.textContent = navigation.classList.contains('open') ? '✕' : '☰';
});

// --- Execution on Load ---
document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();
    updateFooterDates();
    // Set default view on load
    setView('grid'); 
});

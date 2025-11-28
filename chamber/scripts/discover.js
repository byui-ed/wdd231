// 1. Import the data module
import discoverData from '../data/discover.mjs';

const itemGallery = document.getElementById('item-gallery');
const visitorMessageContainer = document.getElementById('visitor-message');
const LAST_VISIT_KEY = 'lastVisit';

// --- Card Generation Function ---
const generateGallery = (data) => {
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('discover-card');

        // Note: Using h2 as required
        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="images/${item.imagefile}" alt="${item.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p class="description">${item.description}</p>
            <button class="learn-more">Learn More</button>
        `;
        itemGallery.appendChild(card);
    });
};

// --- localStorage Visitor Message Function ---
const getDaysBetween = (date1, date2) => {
    // Calculate difference in milliseconds
    const diffTime = Math.abs(date2 - date1);
    // Convert to days: (1000 ms/s * 60 s/min * 60 min/hr * 24 hr/day)
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

const checkLastVisit = () => {
    const today = Date.now();
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    let message = '';

    if (!lastVisit) {
        // First Visit
        message = "Welcome! Let us know if you have any questions. 👋";
    } else {
        const lastVisitDate = Number(lastVisit);
        const daysDifference = getDaysBetween(today, lastVisitDate);

        if (daysDifference < 1) {
            // Less than a day
            message = "Back so soon! Awesome! 😊";
        } else {
            // More than a day
            const dayText = daysDifference === 1 ? "day" : "days";
            message = `You last visited **${daysDifference} ${dayText} ago**.`;
        }
    }

    // Display the message
    visitorMessageContainer.innerHTML = `<p>${message}</p>`;

    // Update the last visit date for the next visit
    localStorage.setItem(LAST_VISIT_KEY, today);
};


// --- Execution on Load ---
document.addEventListener('DOMContentLoaded', () => {
    generateGallery(discoverData);
    checkLastVisit();
});
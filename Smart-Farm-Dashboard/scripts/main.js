// js/main.js (ES Module)

// --- DOM Element Selection (Required) ---
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const getLocationBtn = document.getElementById('get-location-btn');
const currentLocationP = document.getElementById('current-location');

// --- Modal Elements ---
const modal = document.getElementById('alert-modal');
const modalCloseBtn = document.querySelector('.modal-close');

import { fetchWeatherData } from './weather.js';

// --- Initialization and Event Listeners ---
function setupEventListeners() {
    menuToggle.addEventListener('click', toggleMenu);
    if (getLocationBtn) {
        getLocationBtn.addEventListener('click', getFarmLocation);
    }
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        });
    }
}

// --- Local Storage & Page View Tracking (Required 9) ---
function trackPageView() {
    let visitCount = localStorage.getItem('siteVisits') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('siteVisits', visitCount);
    
    // DOM Manipulation: Update visit counter in footer
    const footerSpan = document.getElementById('visit-counter');
    if (footerSpan) {
        footerSpan.textContent = `| Site Views: ${visitCount}`;
    }
}

// --- Hamburger Menu Toggle ---
function toggleMenu() {
    // DOM Manipulation: Toggle class
    mainNav.classList.toggle('nav-open');
    // DOM Manipulation: Toggle ARIA attributes for accessibility
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !isExpanded);
}

// --- Geolocation API Function ---
function getFarmLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(2);
                const lon = position.coords.longitude.toFixed(2);
                
                // Persist coordinates locally (Local Storage)
                localStorage.setItem('farmLat', lat);
                localStorage.setItem('farmLon', lon);

                currentLocationP.textContent = `Location: Lat ${lat}, Lon ${lon} (Saved)`;
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    fetchWeatherData(lat, lon);
                }
            },
            (error) => {
                console.error("Geolocation Error:", error.message);
                currentLocationP.textContent = 'Error getting location. Check permissions.';
                displayAlertModal("Location Error", "Could not determine your location. Please enable geolocation in your browser.", "error");
            }
        );
    } else {
        displayAlertModal("Location Error", "Geolocation is not supported by this browser.", "error");
    }
}

// --- Modal Dialog Implementation (Required 10) ---
export function displayAlertModal(title, message, type) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').textContent = message;
    
    // Modify element style/class based on alert type (DOM Manipulation)
    const modalContent = modal.querySelector('.modal-content');
    modalContent.className = `modal-content ${type}`; 

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === "Escape") {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Main initialization function
export function initializeDashboard() {
    setupEventListeners();
    trackPageView();
    
    // Check saved location only on the dashboard page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const savedLat = localStorage.getItem('farmLat');
        const savedLon = localStorage.getItem('farmLon');
        if (savedLat && savedLon) {
            currentLocationP.textContent = `Location: Lat ${savedLat}, Lon ${savedLon} (Saved)`;
            fetchWeatherData(savedLat, savedLon);
        }
    }
}
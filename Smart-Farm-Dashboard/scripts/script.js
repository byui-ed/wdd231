// js/script.js

// --- DOM Element Variables ---
const getLocationBtn = document.getElementById('get-location-btn');
const currentLocationP = document.getElementById('current-location');
const weatherDataDiv = document.getElementById('weather-data');
const alertsDiv = document.getElementById('alerts');

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', initializeDashboard);
getLocationBtn.addEventListener('click', getFarmLocation);

// --- Initialization Function ---
function initializeDashboard() {
    // 1. Check for saved location in localStorage
    const savedLat = localStorage.getItem('farmLat');
    const savedLon = localStorage.getItem('farmLon');

    if (savedLat && savedLon) {
        currentLocationP.textContent = `Location: Lat ${savedLat}, Lon ${savedLon} (Saved)`;
        fetchWeatherData(savedLat, savedLon);
    } else {
        currentLocationP.textContent = 'No saved location. Please click the button.';
    }
}

// --- Geolocation API Function ---
function getFarmLocation() {
    if (navigator.geolocation) {
        // Use the browser's Geolocation API
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(2);
                const lon = position.coords.longitude.toFixed(2);
                
                // Save coordinates locally
                localStorage.setItem('farmLat', lat);
                localStorage.setItem('farmLon', lon);

                currentLocationP.textContent = `Location: Lat ${lat}, Lon ${lon}`;
                fetchWeatherData(lat, lon);
            },
            (error) => {
                console.error("Geolocation Error:", error.message);
                currentLocationP.textContent = 'Error getting location. Check permissions.';
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// --- Remote API (fetch) Function ---
async function fetchWeatherData(lat, lon) {
    weatherDataDiv.innerHTML = '<p>Fetching data...</p>';

    // --- SIMULATED API CALL ---
    // In a real application, you would use 'fetch' with a real weather API:
    // const API_KEY = "YOUR_API_KEY";
    // const URL = `https://api.weather.com/data?lat=${lat}&lon=${lon}&key=${API_KEY}`;
    
    // Simulate a successful JSON response
    const mockData = {
        temp_c: 18,
        condition: "Partly Cloudy",
        humidity: 65,
        rain_prob: 0.15,
        wind_kph: 12
    };

    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        // Process the (simulated) JSON data
        displayWeatherData(mockData);
        checkAlerts(mockData);

    } catch (error) {
        weatherDataDiv.innerHTML = '<p style="color:red;">Failed to fetch weather data.</p>';
        console.error("Fetch Error:", error);
    }
}

// --- Data Display and Alert Logic ---
function displayWeatherData(data) {
    weatherDataDiv.innerHTML = `
        <p><strong>Temperature:</strong> ${data.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.condition}</p>
        <p><strong>Humidity:</strong> ${data.humidity}%</p>
        <p><strong>Rain Chance:</strong> ${data.rain_prob * 100}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind_kph} kph</p>
    `;
}

function checkAlerts(data) {
    let alertMessage = 'No immediate alerts.';

    if (data.temp_c < 5) {
        alertMessage = '⚠️ **FROST WARNING:** Temperatures are critically low. Protect vulnerable crops!';
    } else if (data.rain_prob < 0.10 && data.temp_c > 25) {
        alertMessage = '💧 **IRRIGATION SUGGESTED:** Low rain chance and high heat. Water plants soon.';
    } else if (data.wind_kph > 30) {
        alertMessage = '💨 **HIGH WIND ALERT:** Secure structures and stakes.';
    }

    alertsDiv.innerHTML = alertMessage;
}
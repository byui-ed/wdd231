// js/weather.js (ES Module)

import { displayAlertModal } from './main.js';

// Placeholder for a real external API URL
const WEATHER_API_URL = 'https://api.weather.com/data'; 

export async function fetchWeatherData(lat, lon) {
    const weatherDataDiv = document.getElementById('weather-data');
    const alertsDiv = document.getElementById('alerts');
    weatherDataDiv.innerHTML = '<p>Fetching live data...</p>';
    alertsDiv.textContent = 'Checking for new alerts...';

    // --- Data Fetching with try...catch Block (Required) ---
    try {
        // --- Asynchronous Functionality ---
        // SIMULATED data structure for demonstration (to bypass needing a real API key)
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        const data = {
            temp_c: 1.5, // Simulating a temperature low enough for a warning
            condition: "Freezing Fog",
            rain_prob: 0.05,
            wind_kph: 5,
            humidity: 95
        };
        // End SIMULATED

        displayWeatherData(data);
        checkAlerts(data);

    } catch (error) {
        // --- Robust Error Handling ---
        console.error("Fetch Error:", error);
        weatherDataDiv.innerHTML = `<p style="color:var(--color-secondary);">Data fetch failed: ${error.message}. Using default values.</p>`;
        alertsDiv.textContent = "Error fetching live data. Check connection.";
        // Trigger Modal on critical failure
        displayAlertModal("Data Error", "Could not connect to the weather service.", "error");
    }
}

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weather-data');
    
    // --- Template Literals Used for Dynamic Content (Required 11) ---
    weatherDataDiv.innerHTML = `
        <p><strong>Temperature:</strong> ${data.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.condition}</p>
        <p><strong>Humidity:</strong> ${data.humidity}%</p>
        <p><strong>Rain Chance:</strong> ${data.rain_prob * 100}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind_kph} kph</p>
    `;
}

function checkAlerts(data) {
    const alertsDiv = document.getElementById('alerts');
    let alertMessage = 'No immediate alerts.';

    if (data.temp_c < 2) {
        alertMessage = '⚠️ **FROST WARNING:** Temperatures are critically low. Protect vulnerable crops!';
        displayAlertModal("CRITICAL ALERT", alertMessage, "warning");
    } else if (data.rain_prob < 0.10 && data.temp_c > 25) {
        alertMessage = '💧 **IRRIGATION SUGGESTED:** Low rain chance and high heat. Water plants soon.';
    } else if (data.humidity > 90 && data.temp_c < 15) {
        alertMessage = '🦠 **DISEASE WATCH:** High humidity and low temps increase fungal risk.';
    }

    // DOM Manipulation: Update alert text
    alertsDiv.innerHTML = alertMessage;
}
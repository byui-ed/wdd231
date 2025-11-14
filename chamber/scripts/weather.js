const currentUrl = `https://api.openweathermap.org/data/2.5/weather?id=YOUR_CITY_ID&units=imperial&appid=YOUR_API_KEY`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?id=YOUR_CITY_ID&units=imperial&appid=YOUR_API_KEY`;

const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast-weather');

async function getWeatherData() {
    try {
        // Fetch Current Weather
        const currentResponse = await fetch(currentUrl);
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        // Fetch 3-Day Forecast
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        currentWeatherDiv.innerHTML = '<p>Could not load weather data.</p>';
        forecastDiv.innerHTML = '';
    }
}

function displayCurrentWeather(data) {
    if (!data.main || !data.weather) return;

    const temp = data.main.temp.toFixed(0);
    const desc = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const iconCode = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;

    currentWeatherDiv.innerHTML = `
        <img src="${iconSrc}" alt="${desc} icon">
        <p class="temperature">Current Temp: <strong>${temp}°F</strong></p>
        <p class="description">${desc}</p>
    `;
}

function displayForecast(data) {
    // Filter the list to get one entry per day, roughly around noon
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    // Select the next 3 days
    const threeDayForecast = forecastList.slice(0, 3);
    
    forecastDiv.innerHTML = ''; // Clear 'Loading forecast...'

    threeDayForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = day.main.temp.toFixed(0);
        const iconCode = day.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;
        const desc = day.weather[0].description;

        const dayElement = document.createElement('div');
        dayElement.classList.add('day-forecast');
        dayElement.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <img src="${iconSrc}" alt="${desc} icon">
            <p>${temp}°F</p>
        `;
        forecastDiv.appendChild(dayElement);
    });
}

// Execute the weather fetch function
getWeatherData();
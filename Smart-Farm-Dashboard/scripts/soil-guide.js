// js/soil-guide.js (ES Module)

export async function loadSoilData() {
    const container = document.getElementById('soil-data-container');
    container.innerHTML = '<p>Loading soil database...</p>';

    try {
        // Fetch local JSON file (Required 8)
        const response = await fetch('./scripts/data/soil-data.json');
        if (!response.ok) throw new Error('Failed to load local JSON file.');
        const soilData = await response.json();

        // --- Array Method (map) for Dynamic Content Generation (Required 11) ---
        // Displaying 15+ items, each with 4+ properties
        const guideHTML = soilData.map(item => {
            // --- Template Literals Used for HTML Construction (Required 11) ---
            return `
                <div class="soil-card">
                    <h3>${item.name}</h3>
                    <p><strong>Best Crop:</strong> ${item.best_crop}</p>
                    <p><strong>pH Range:</strong> ${item.ph_range}</p>
                    <p><strong>Drainage:</strong> ${item.drainage}</p>
                    <p><strong>Water Retention:</strong> ${item.water_retention}</p>
                    <p class="texture">Texture: ${item.texture}</p>
                </div>
            `; // 5 distinct properties displayed per item
        }).join(''); 

        container.innerHTML = guideHTML;

    } catch (error) {
        container.innerHTML = `<p style="color:red;">Error loading soil guide: ${error.message}</p>`;
    }
}
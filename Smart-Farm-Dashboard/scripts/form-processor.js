// js/form-processor.js (ES Module)

// --- Display Form Data (Required 7) ---
document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters from the form submission
    const params = new URLSearchParams(window.location.search);
    const dataDisplay = document.getElementById('display-data');
    
    let html = '<h3>Submission Details:</h3>';
    
    // Iterate through all URL Search Params (DOM Interaction)
    if (Array.from(params).length > 0) {
        for (const [key, value] of params.entries()) {
            // Template literal used for clean output
            html += `<p><strong>${key}:</strong> ${decodeURIComponent(value) || 'Not provided'}</p>`;
        }
    } else {
        html += '<p>No form data found in the URL. Submission may have failed.</p>';
    }
    
    dataDisplay.innerHTML = html;
});
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const town = document.getElementById('town').value;
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    const bedrooms = document.getElementById('bedrooms').value;

    // Show loading message
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<p>Loading results...</p>';

    // Replace with actual API call or scraping logic
    fetch(`/search?town=${town}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}`)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = ''; // Clear loading message

            data.results.forEach(result => {
                const item = document.createElement('div');
                item.className = 'result-item';

                item.innerHTML = `
                    <h3>${result.title}</h3>
                    <p>${result.description}</p>
                    <p>Price: $${result.price}</p>
                    <p>Contact: ${result.contact}</p>
                    <a href="${result.link}" target="_blank">View Listing</a>
                `;

                resultsContainer.appendChild(item);
            });
        })
        .catch(error => {
            resultsContainer.innerHTML = '<p>Sorry, something went wrong. Please try again.</p>';
            console.error('Error:', error);
        });
});

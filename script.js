document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const town = document.getElementById('town').value;
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    const bedrooms = document.getElementById('bedrooms').value;

    const API_KEY = 'AIzaSyBG_bUAYW0vUh6xqcDocPs1saueCpX7b1w';
    const CX = 'your_custom_search_engine_id'; // Replace with your Custom Search Engine ID

    const query = `${town} apartments ${bedrooms} bedrooms price between ${minPrice} and ${maxPrice}`;
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${CX}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results

            data.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'result-item';
                itemElement.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.snippet}</p>
                    <a href="${item.link}" target="_blank">View Listing</a>
                `;
                resultsContainer.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '<p>Sorry, something went wrong. Please try again.</p>';
        });
});

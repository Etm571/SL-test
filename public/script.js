async function searchAPI() {
    const searchText = document.getElementById('searchInput').value;
    const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchText })
    });

    if (!response.ok) {
        console.error('Failed to fetch data from API');
        return;
    }

    const data = await response.json();
    console.log('API Response:', data);

    //frontend
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = JSON.stringify(data);
}

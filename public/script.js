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

    const resultsDiv = document.getElementById('items');
    resultsDiv.innerHTML = ""; // Rensa tidigare resultat

    if (searchText == "") {
        resultsDiv.innerHTML = "";
    } else {
        const placeNames = data.ResponseData.map(place => place.Name);

        // Skapa <p> element för varje platsnamn och lägg till i resultsDiv
        placeNames.forEach(name => {
            const p = document.createElement('p');
            p.textContent = name;
            resultsDiv.appendChild(p);
        });
    }
}

document.getElementById('fromInput').addEventListener('input', function() {
    nuvarandeBox = 'frånPlats';
    searchAPI();
});

document.getElementById('toInput').addEventListener('input', function() {
    nuvarandeBox = 'tillPlats';
    searchAPI();
});

async function searchAPI() {
    const frånPlats = document.getElementById('fromInput').value;
    const tillPlats = document.getElementById('toInput').value;
    
    const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nuvarandeBox: nuvarandeBox == 'frånPlats' ? frånPlats : tillPlats })
    });

    if (!response.ok) {
        console.error('Failed to fetch data from API');
        return;
    }

    const data = await response.json();
    console.log('API Response:', data);

    const resultsDiv = document.getElementById('items');
    resultsDiv.innerHTML = "";

    if ((nuvarandeBox == 'frånPlats' && frånPlats == "") || (nuvarandeBox == 'tillPlats' && tillPlats == "")) {
        resultsDiv.innerHTML = "";
    } else {
        const nuvarandeBoxArray = data.ResponseData.map(place => place.Name);
        nuvarandeBoxArray.forEach(name => {
            const p = document.createElement('p');
            p.textContent = name;
            p.addEventListener('click', () => {
                if (nuvarandeBox == 'tillPlats') {
                    document.getElementById('toInput').value = name;
                    resultsDiv.innerHTML = "";
                } else {
                    document.getElementById('fromInput').value = name;
                    resultsDiv.innerHTML = "";
                }
            });
            resultsDiv.appendChild(p);
        });
    }
}

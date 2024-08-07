
async function searchAPI() {
    const frånPlats = document.getElementById('fromInput').value;
    const tillPlats = document.getElementById('toInput').value;
    var nuvarandeBox = "";
    if (frånPlats == "")    {
        nuvarandeBox = tillPlats;
    }
    else{
        nuvarandeBox = frånPlats;
    }
    const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nuvarandeBox })
    });

    if (!response.ok) {
        console.error('Failed to fetch data from API');
        return;
    }

    const data = await response.json();
    console.log('API Response:', data);

    const resultsDiv = document.getElementById('items');
    resultsDiv.innerHTML = "";

    if (nuvarandeBox == "") {
        resultsDiv.innerHTML = "";
    } else {
        const nuvarandeBox = data.ResponseData.map(place => place.Name);
        nuvarandeBox.forEach(name => {
            const p = document.createElement('p');
            p.textContent = name;
            resultsDiv.appendChild(p);
        });
    }
}
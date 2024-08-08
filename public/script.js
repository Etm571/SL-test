let frånPlatsSiteId = null;
let tillPlatsSiteId = null;

document.getElementById('fromInput').addEventListener('input', function() {
    nuvarandeBox = 'frånPlats';
    stopLookup();
});

document.getElementById('toInput').addEventListener('input', function() {
    nuvarandeBox = 'tillPlats';
    stopLookup();
});

async function stopLookup() {
    const frånPlats = document.getElementById('fromInput').value;
    const tillPlats = document.getElementById('toInput').value;
    
    const response = await fetch('/api/stoplookup', {
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
        const places = data.ResponseData;
        places.forEach(place => {
            const p = document.createElement('p');
            p.textContent = place.Name;
            p.addEventListener('click', () => {
                if (nuvarandeBox == 'tillPlats') {
                    document.getElementById('toInput').value = place.Name;
                    tillPlatsSiteId = place.SiteId; // Spara SiteId
                    resultsDiv.innerHTML = "";
                } else {
                    document.getElementById('fromInput').value = place.Name;
                    frånPlatsSiteId = place.SiteId; // Spara SiteId
                    resultsDiv.innerHTML = "";
                }
            });
            resultsDiv.appendChild(p);
        });
    }
}

async function kalkyleraRutt() {
    if (!frånPlatsSiteId || !tillPlatsSiteId) {
        console.error("Vänligen välj både från- och tillplatser.");
        return;
    }

    try {
        const response = await fetch('/api/calculateRoute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ frånPlatsSiteId, tillPlatsSiteId })
        });

        if (!response.ok) {
            console.error('Failed to fetch route from API');
            return;
        }

        const data = await response.json();
        console.log('Route API Response:', data);

        displayRoute(data);

    } catch (error) {
        console.error('Error:', error);
    }
}

function displayRoute(data) {
    const routeDiv = document.getElementById('routeResults');
    routeDiv.innerHTML = "";

    if (!data.Trip || data.Trip.length === 0) {
        routeDiv.textContent = "Ingen rutt hittades.";
        return;
    }

    data.Trip.forEach(trip => {
        const tripElement = document.createElement('div');
        tripElement.textContent = `Resa från ${trip.LegList.Leg[0].Origin.name} till ${trip.LegList.Leg[trip.LegList.Leg.length - 1].Destination.name}`;
        routeDiv.appendChild(tripElement);
    });
}

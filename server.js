const express = require('express');
const axios = require('axios');
const dotenv = require("dotenv")
dotenv.config()


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/api/stoplookup', async (req, res) => {
    try {
        const nuvarandeBox = req.body.nuvarandeBox;

        
        const apiKey = process.env.SL_StopLookup_KEY;
        const searchString = nuvarandeBox;
        const maxResults = 5;
        const stationsOnly = false;


        //sl platsuppslag API
        const apiUrl = `https://journeyplanner.integration.sl.se/v1/typeahead.json?key=${apiKey}&searchstring=${searchString}&maxresults=${maxResults}`;
        const apiResponse = await axios.get(apiUrl);

        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.post('/api/calculateRoute', async (req, res) => {
    try {
        const { frånPlats, tillPlats } = req.body;
        const apiKey = process.env.SL_CalculateRoute_KEY;
        const { frånPlatsSiteId, tillPlatsSiteId } = req.body;
        const apiUrl = `https://journeyplanner.integration.sl.se/v1/TravelplannerV3_1/trip.json?key=${apiKey}&amp;&lang=se&originextid=${frånPlatsSiteId}&destExtId=${tillPlatsSiteId}`;

        const apiResponse = await axios.get(apiUrl);

        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error fetching route from API:', error);
        res.status(500).json({ error: 'Error fetching route from API' });
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
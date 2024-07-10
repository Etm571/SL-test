const express = require('express');
const axios = require('axios');
const dotenv = require("dotenv")
dotenv.config()


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/api/search', async (req, res) => {
    try {
        const searchText = req.body.searchText;

        
        const apiKey = process.env.SL_API_KEY;
        const searchString = searchText;
        const maxResults = 5;


        //sl platsuppslag API
        const apiUrl = `https://journeyplanner.integration.sl.se/v1/typeahead.json?key=${apiKey}&searchstring=${searchString}&maxresults=${maxResults}`;
                const apiResponse = await axios.get(apiUrl);

        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

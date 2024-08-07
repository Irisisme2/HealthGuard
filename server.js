const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

app.get('/api/place-details', async (req, res) => {
  const placeId = req.query.place_id;
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
      params: {
        place_id: placeId,
        key: apiKey
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching place details' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

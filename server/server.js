// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const generateContent = require('./ai'); // Import funkcji z ai.js
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  try {
    const query = req.body.query;
    const response = await generateContent(query);
    res.json({ response });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

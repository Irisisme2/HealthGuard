const express = require('express');
const bodyParser = require('body-parser');
const { VertexAI } = require('@google-cloud/vertexai');
const cors = require('cors');

const app = express();
const port = 3001; // Możesz zmienić port zgodnie z własnymi potrzebami

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Inicjalizacja Vertex AI
const vertex_ai = new VertexAI({
  project: 'healthguard-431701', // Twój ID projektu
  location: 'us-central1' // Lokalizacja
});

const model = 'gemini-1.5-pro-001'; // Model AI

const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    // Twoje ustawienia bezpieczeństwa
  ],
  systemInstruction: {
    parts: [{ "text": "You are an AI interface to a web application. You have answers to patients' questions." }]
  },
});

app.post('/api/ask', async (req, res) => {
  const query = req.body.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const request = {
      contents: [
        { role: 'user', parts: [{ text: query }] }
      ],
    };

    const streamingResp = await generativeModel.generateContentStream(request);

    let response = '';
    for await (const item of streamingResp.stream) {
      if (item.candidates && item.candidates[0].content.parts[0].text) {
        response += item.candidates[0].content.parts[0].text;
      }
    }

    if (!response) {
      return res.status(500).json({ error: 'No response received from model' });
    }

    return res.json({ answer: response });
  } catch (error) {
    console.error("Error during AI query:", error.message);
    return res.status(500).json({ error: 'Failed to get response from model' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

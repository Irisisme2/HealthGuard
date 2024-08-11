// src/services/apiService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY; // Access the API key

export const fetchHealthData = async () => {
  try {
    const response = await axios.get('https://api.gemini.com/health-data', {
      headers: {
        'Authorization': `Bearer ${API_KEY}` // Use the API key for authentication
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching health data', error);
    throw error;
  }
};

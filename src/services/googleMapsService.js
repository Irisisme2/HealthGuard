// services/googleMapsService.js
export const fetchHospitals = async (query) => {
    const apiKey = 'AIzaSyCffZW2Kjn2mj0RYZED-gejwjD5BzE_-uo'; 
    const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    const url = `${endpoint}?query=hospitals+${encodeURIComponent(query)}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.status !== 'OK') {
        throw new Error(`API error! status: ${data.status}`);
      }
  
      return data.results.map(result => ({
        place_id: result.place_id,
        name: result.name,
        address: result.formatted_address,
      }));
    } catch (error) {
      console.error('Failed to fetch hospitals:', error);
      throw error; 
    }
  };
  
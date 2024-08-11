import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Spinner, Text } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the path as needed

const fetchChartData = async () => {
  try {
    // Fetch data from each chart API
    const [stressResponse, sleepResponse, heartRateResponse] = await Promise.all([
      axios.get('/api/data?type=stress_level'),
      axios.get('/api/data?type=sleep_quality'),
      axios.get('/api/data?type=heart_rate')
    ]);

    return {
      stressLevelData: stressResponse.data,
      sleepQualityData: sleepResponse.data,
      heartRateData: heartRateResponse.data
    };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
};

const HealthExplanationCard = () => {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await fetchChartData();

        const response = await axios.post('http://localhost:5000/generate-explanation', {
          heart_rate: chartData.heartRateData,
          stress_level: chartData.stressLevelData,
          sleep_quality: chartData.sleepQualityData
        });

        setExplanation(response.data.explanation);
      } catch (error) {
        setError('Error fetching explanation.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="lg" />
        <Text mt={4}>Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center" color="red.500">
        <Text>{error}</Text>
      </Box>
    );
  }

  return (
    <Card>
      <Box p={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Health Data Explanation
        </Text>
        <Text>{explanation}</Text>
      </Box>
    </Card>
  );
};

export default HealthExplanationCard;

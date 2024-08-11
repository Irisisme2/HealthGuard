import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the path as needed
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const HeartRateAndBloodPressureChart = () => {
  // Example data for the heart rate
  const heartRate = 85;
  const maxHeartRate = 100; // Example maximum heart rate
  
  // Example data for the blood pressure
  const systolicPressure = 120;
  const diastolicPressure = 80;

  return (
    <HStack spacing={6} p={5} align="center">
      <Card>
        <Box p={4} textAlign="center">
          <Text fontSize="lg" mb={2}>Heart Rate</Text>
          <CircularProgressbar
            value={heartRate}
            maxValue={maxHeartRate}
            text={`${heartRate} bpm`}
            styles={buildStyles({
              textSize: '14px',
              pathColor: '#FF6384',
              textColor: '#333',
              trailColor: '#e0e0e0',
              backgroundColor: '#fff',
            })}
          />
        </Box>
      </Card>
      <Card>
        <Box p={4} textAlign="center">
          <Text fontSize="lg" mb={2}>Blood Pressure</Text>
          <CircularProgressbar
            value={systolicPressure}
            maxValue={160} // Example maximum value for systolic pressure
            text={`${systolicPressure}/${diastolicPressure}`}
            styles={buildStyles({
              textSize: '14px',
              pathColor: '#36A2EB',
              textColor: '#333',
              trailColor: '#e0e0e0',
              backgroundColor: '#fff',
            })}
          />
        </Box>
      </Card>
    </HStack>
  );
};

export default HeartRateAndBloodPressureChart;

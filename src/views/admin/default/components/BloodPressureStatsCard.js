import React, { useState } from 'react';
import { Box, Card, Flex, Heading, Text, useColorModeValue, Button, HStack, Spacer } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement 
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const BloodPressureStatsCard = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const data = {
    '24h': {
      labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      datasets: [
        {
          label: 'Systolic Pressure',
          data: [120, 122, 125, 128, 130, 127, 123, 121],
          borderColor: '#B03A2E', 
          backgroundColor: 'rgba(255, 76, 76, 0.2)', 
          borderWidth: 2,
          fill: true,
          pointStyle: 'circle', 
        },
        {
          label: 'Diastolic Pressure',
          data: [80, 82, 85, 88, 90, 87, 83, 81],
          borderColor: '#4C8FFF', 
          backgroundColor: 'rgba(76, 143, 255, 0.2)', 
          fill: true,
          pointStyle: 'circle', 
        }
      ],
    },
    '3d': {
      labels: ['Day 1', 'Day 2', 'Day 3'],
      datasets: [
        {
          label: 'Systolic Pressure',
          data: [122, 125, 128],
          borderColor: '#B03A2E',
          backgroundColor: 'rgba(255, 76, 76, 0.2)', 
          borderWidth: 2,
          fill: true,
          pointStyle: 'circle',
        },
        {
          label: 'Diastolic Pressure',
          data: [82, 85, 88],
          borderColor: '#4C8FFF',
          backgroundColor: 'rgba(76, 143, 255, 0.2)', 
          borderWidth: 2,
          fill: true,
          pointStyle: 'circle',
        }
      ],
    },
    '1w': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Systolic Pressure',
          data: [120, 122, 125, 128, 130, 127, 123],
          borderColor: '#B03A2E',
          backgroundColor: 'rgba(255, 76, 76, 0.2)',
          borderWidth: 2,
          fill: true,
          pointStyle: 'circle',
        },
        {
          label: 'Diastolic Pressure',
          data: [80, 82, 85, 88, 90, 87, 83],
          borderColor: '#4C8FFF', 
          backgroundColor: 'rgba(76, 143, 255, 0.2)', 
          borderWidth: 2,
          fill: true,
          pointStyle: 'circle',
        }
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card bg={cardBg} p={5} borderRadius='lg' shadow='md'>
      <Flex direction='column' w='100%'>
        <Flex align='center' mb={4}>
          <Heading size='md' color={textColor}>
            Blood Pressure
          </Heading>
          <Spacer />
          <HStack spacing={4}>
            <Button
              colorScheme={timeRange === '24h' ? 'blue' : 'gray'}
              onClick={() => setTimeRange('24h')}
            >
              Last 24h
            </Button>
            <Button
              colorScheme={timeRange === '3d' ? 'blue' : 'gray'}
              onClick={() => setTimeRange('3d')}
            >
              Last 3 Days
            </Button>
            <Button
              colorScheme={timeRange === '1w' ? 'blue' : 'gray'}
              onClick={() => setTimeRange('1w')}
            >
              Last Week
            </Button>
          </HStack>
        </Flex>
        <Box w='100%' h='300px'>
          <Line data={data[timeRange]} options={options} />
        </Box>
      </Flex>
    </Card>
  );
};

export default BloodPressureStatsCard;

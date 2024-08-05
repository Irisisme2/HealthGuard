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

const HeartRate = () => {
  const [timeRange, setTimeRange] = useState('24h');


  const data = {
    '24h': {
      labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      datasets: [
        {
          label: 'Heart Rate',
          data: [70, 72, 75, 78, 80, 77, 73, 71],
          borderColor: '#FF5733',
          backgroundColor: 'rgba(255, 87, 51, 0.2)',
          borderWidth: 2,
          fill: true,
        }
      ],
    },
    '3d': {
      labels: ['Day 1', 'Day 2', 'Day 3'],
      datasets: [
        {
          label: 'Heart Rate',
          data: [72, 75, 78],
          borderColor: '#FF5733',
          backgroundColor: 'rgba(255, 87, 51, 0.2)',
          borderWidth: 2,
          fill: true,
        }
      ],
    },
    '1w': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Heart Rate',
          data: [70, 72, 75, 78, 80, 77, 73],
          borderColor: '#FF5733',
          backgroundColor: 'rgba(255, 87, 51, 0.2)',
          borderWidth: 2,
          fill: true,
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
            Heart Rate
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

export default HeartRate;


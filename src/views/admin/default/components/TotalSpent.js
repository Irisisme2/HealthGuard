import React from 'react';
import { Box, Card, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement // Import PointElement for the points on the line chart
} from 'chart.js';

// Register the components used by Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const HealthStatsCard = () => {
  // Sample data for the line chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // x-axis labels
    datasets: [
      {
        label: 'Heart Rate',
        data: [70, 75, 80, 85, 90, 95, 100], // y-axis data
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Temperature',
        data: [98.1, 98.3, 98.5, 98.2, 98.4, 98.6, 98.7], // y-axis data
        borderColor: '#33B5FF',
        backgroundColor: 'rgba(51, 181, 255, 0.2)',
        borderWidth: 2,
        fill: true,
      }
    ],
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

  // Define Chakra UI colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card bg={cardBg} p={5} borderRadius='lg' shadow='md'>
      <Flex direction='column' align='center'>
        <Heading size='md' mb={4} color={textColor}>
          Health Statistics
        </Heading>
        <Text mb={4} color={textColor}>
          Overview of health metrics like heart rate and temperature over time.
        </Text>
        <Box w='100%' h='300px'>
          <Line data={data} options={options} />
        </Box>
      </Flex>
    </Card>
  );
};

export default HealthStatsCard;

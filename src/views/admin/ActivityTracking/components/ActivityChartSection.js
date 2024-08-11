import React, { useState } from 'react';
import {
  VStack,
  Stack,
  Text,
  Button,
  Box,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';  
import Card from 'components/card/Card';

const data = {
  daily: [
    { name: 'Mon', steps: 4000, calories: 300, distance: 3.2, activeTime: 45 },
    { name: 'Tue', steps: 3000, calories: 200, distance: 2.5, activeTime: 30 },
    { name: 'Wed', steps: 5000, calories: 350, distance: 4.0, activeTime: 60 },
    { name: 'Thu', steps: 6000, calories: 400, distance: 5.0, activeTime: 75 },
    { name: 'Fri', steps: 7000, calories: 450, distance: 6.0, activeTime: 90 },
    { name: 'Sat', steps: 8000, calories: 500, distance: 7.0, activeTime: 105 },
    { name: 'Sun', steps: 9000, calories: 550, distance: 8.0, activeTime: 120 },
  ],
  weekly: [
    { name: 'Week 1', steps: 25000, calories: 2000, distance: 20, activeTime: 315 },
    { name: 'Week 2', steps: 30000, calories: 2500, distance: 25, activeTime: 375 },
    { name: 'Week 3', steps: 27000, calories: 2200, distance: 22, activeTime: 340 },
    { name: 'Week 4', steps: 32000, calories: 2800, distance: 30, activeTime: 400 },
  ],
  monthly: [
    { name: 'Jan', steps: 100000, calories: 8000, distance: 90, activeTime: 1350 },
    { name: 'Feb', steps: 120000, calories: 9000, distance: 100, activeTime: 1500 },
    { name: 'Mar', steps: 110000, calories: 8500, distance: 95, activeTime: 1400 },
    { name: 'Apr', steps: 130000, calories: 9500, distance: 110, activeTime: 1600 },
  ],
};

const ActivityChartSection = () => {
  const [timeRange, setTimeRange] = useState('daily');
  const [chartType, setChartType] = useState('line');


  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const chartData = data[timeRange];
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  return (
    <VStack spacing={6} align="stretch">
       <Card
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        bg={bgColor}
        border="1px"
        borderColor={borderColor}
        maxH="615px" 
        overflowY="auto" 
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Activity Chart</Text>
        <Text fontSize="md" mb={6}>Track your progress with various chart options.</Text>

        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mb={6}>
          <Select value={timeRange} onChange={handleTimeRangeChange} width="200px">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
          <Select value={chartType} onChange={handleChartTypeChange} width="200px">
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </Select>
        </Stack>

        <Box height="400px" width="100%">
          <ResponsiveContainer>
            {chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="steps" stroke="#8884d8" />
                <Line type="monotone" dataKey="calories" stroke="#82ca9d" />
                <Line type="monotone" dataKey="distance" stroke="#ffc658" />
                <Line type="monotone" dataKey="activeTime" stroke="#ff7300" />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="steps" fill="#8884d8" />
                <Bar dataKey="calories" fill="#82ca9d" />
                <Bar dataKey="distance" fill="#ffc658" />
                <Bar dataKey="activeTime" fill="#ff7300" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </Card>
    </VStack>
  );
};

export default ActivityChartSection;
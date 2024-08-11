import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  Stack,
  Button,
  Select,
  useColorModeValue,
  useBreakpointValue,
  Input,
  Tooltip,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the path as needed
import { Line } from 'react-chartjs-2'; // Example chart library
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

// Register components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  ChartTooltip,
  Legend
);

// Helper functions
const getDateLabels = (range) => {
  const today = new Date();
  const labels = [];
  for (let i = range === '7d' ? 7 : 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    labels.push(date.toDateString());
  }
  return labels;
};

const getDataForRange = (range, data) => {
  const length = range === '7d' ? 7 : 30;
  return data.slice(-length);
};

// Example data for patterns
const activityData = {
  totalSteps: 8000,
  stepsToday: 5000,
  stepsYesterday: 3000,
  stepsGoal: 10000,
  stepsOverTime: [3000, 4000, 5000, 6000, 7000, 8000, 9000],
};

const sleepData = {
  averageSleep: 7.5, // hours
  sleepToday: 8.0, // hours
  sleepYesterday: 7.0, // hours
  sleepGoal: 8.0, // hours
  sleepOverTime: [7.0, 7.5, 7.8, 8.0, 8.2, 8.5, 8.0],
};

const HealthPatternsAnalysis = () => {
  const [selectedRange, setSelectedRange] = useState('7d');
  const [userStepsGoal, setUserStepsGoal] = useState(activityData.stepsGoal);
  const [userSleepGoal, setUserSleepGoal] = useState(sleepData.sleepGoal);
  const cardBg = useColorModeValue('gray.50', 'gray.800');
  const chartHeight = useBreakpointValue({ base: '300px', md: '350px', lg: '420px' });

  // Chart data configuration
  const activityChartData = {
    labels: getDateLabels(selectedRange),
    datasets: [
      {
        label: 'Steps Over Time',
        data: getDataForRange(selectedRange, activityData.stepsOverTime),
        fill: false,
        borderColor: '#4A90E2',
        tension: 0.1,
      },
    ],
  };

  const sleepChartData = {
    labels: getDateLabels(selectedRange),
    datasets: [
      {
        label: 'Sleep Over Time',
        data: getDataForRange(selectedRange, sleepData.sleepOverTime),
        fill: false,
        borderColor: '#E94E77',
        tension: 0.1,
      },
    ],
  };

  const handleStepsGoalChange = (e) => {
    setUserStepsGoal(e.target.value);
  };

  const handleSleepGoalChange = (e) => {
    setUserSleepGoal(e.target.value);
  };

  const exportData = () => {
    // Simulate exporting data (e.g., download CSV)
    console.log('Exporting data...');
  };

  return (
    <Card>
      <Box p={6} bg={cardBg} borderRadius="md" shadow="lg">
        <VStack spacing={8} align="stretch">
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            Health Patterns Analysis
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Physical Activity Card */}
            <Box p={4} bg="white" borderRadius="lg" shadow="md">
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                Physical Activity
              </Text>
              <Stat mb={4}>
                <StatLabel>Total Steps</StatLabel>
                <StatNumber>{activityData.totalSteps}</StatNumber>
                <StatHelpText>
                  <StatArrow type={activityData.stepsToday > activityData.stepsYesterday ? 'increase' : 'decrease'} />
                  {activityData.stepsToday - activityData.stepsYesterday} steps from yesterday
                </StatHelpText>
                <Text fontSize="md" fontWeight="bold" mt={2}>
                  Goal: {userStepsGoal} steps
                </Text>
                <StatHelpText>
                  <StatArrow type={activityData.totalSteps >= userStepsGoal ? 'increase' : 'decrease'} />
                  {activityData.totalSteps >= userStepsGoal ? 'Goal met' : 'Goal not met'}
                </StatHelpText>
              </Stat>
              <Text fontSize="md" mb={4}>
                Steps Today: {activityData.stepsToday} steps
              </Text>
              <Text fontSize="md" mb={4}>
                Steps Yesterday: {activityData.stepsYesterday} steps
              </Text>
              <Divider mb={4} />
              <Text fontSize="md" fontWeight="bold" mb={2}>
                Steps Over Time
              </Text>
              <Select mb={4} value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)} placeholder="Select date range">
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </Select>
              <Box h={chartHeight}>
                <Line
                  data={activityChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} steps`,
                        },
                      },
                    },
                  }}
                />
              </Box>
              <Divider mt={4} />
              <Stack spacing={4} mt={4}>
                <Text fontSize="md" fontWeight="bold">
                  Set Your Steps Goal
                </Text>
                <Input
                  type="number"
                  value={userStepsGoal}
                  onChange={handleStepsGoalChange}
                  placeholder="Enter your steps goal"
                />
              </Stack>
            </Box>

            {/* Sleep Patterns Card */}
            <Box p={4} bg="white" borderRadius="lg" shadow="md">
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                Sleep Patterns
              </Text>
              <Stat mb={4}>
                <StatLabel>Average Sleep</StatLabel>
                <StatNumber>{sleepData.averageSleep} hours</StatNumber>
                <StatHelpText>
                  <StatArrow type={sleepData.sleepToday > sleepData.sleepYesterday ? 'increase' : 'decrease'} />
                  {sleepData.sleepToday - sleepData.sleepYesterday} hours from yesterday
                </StatHelpText>
                <Text fontSize="md" fontWeight="bold" mt={2}>
                  Goal: {userSleepGoal} hours
                </Text>
                <StatHelpText>
                  <StatArrow type={sleepData.averageSleep >= userSleepGoal ? 'increase' : 'decrease'} />
                  {sleepData.averageSleep >= userSleepGoal ? 'Goal met' : 'Goal not met'}
                </StatHelpText>
              </Stat>
              <Text fontSize="md" mb={4}>
                Sleep Today: {sleepData.sleepToday} hours
              </Text>
              <Text fontSize="md" mb={4}>
                Sleep Yesterday: {sleepData.sleepYesterday} hours
              </Text>
              <Divider mb={4} />
              <Text fontSize="md" fontWeight="bold" mb={2}>
                Sleep Over Time
              </Text>
              <Select mb={4} value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)} placeholder="Select date range">
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </Select>
              <Box h={chartHeight}>
                <Line
                  data={sleepChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} hours`,
                        },
                      },
                    },
                  }}
                />
              </Box>
              <Divider mt={4} />
              <Stack spacing={4} mt={4}>
                <Text fontSize="md" fontWeight="bold">
                  Set Your Sleep Goal
                </Text>
                <Input
                  type="number"
                  value={userSleepGoal}
                  onChange={handleSleepGoalChange}
                  placeholder="Enter your sleep goal (hours)"
                />
              </Stack>
            </Box>
          </SimpleGrid>

          {/* Detailed View */}
          <Box p={4} bg="white" borderRadius="lg" shadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Detailed View
            </Text>
            <Stack spacing={4}>
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Steps Breakdown
                </Text>
                <Text fontSize="sm">
                  Analyze the distribution of steps throughout the day and compare with historical data. Use insights to set or adjust goals.
                </Text>
                <Button mt={4} colorScheme="blue" onClick={exportData}>
                  Export Steps Data
                </Button>
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Sleep Analysis
                </Text>
                <Text fontSize="sm">
                  View detailed sleep patterns, including duration and quality. Compare with goals to optimize sleep habits and improve overall well-being.
                </Text>
                <Button mt={4} colorScheme="blue" onClick={exportData}>
                  Export Sleep Data
                </Button>
              </Box>
            </Stack>
          </Box>
        </VStack>
      </Box>
    </Card>
  );
};

export default HealthPatternsAnalysis;

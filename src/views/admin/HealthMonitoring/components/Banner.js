import React, { useState } from 'react';
import { Box, Heading, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import Card from 'components/card/Card'; // Adjust import according to your setup
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

// Sample heart rate data for today and the week
const dataToday = {
  labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'],
  datasets: [
    {
      label: 'Heart Rate (bpm)',
      data: [72, 74, 76, 78, 77, 79, 80, 82, 81],
      fill: false,
      borderColor: '#4FD1C5',
      tension: 0.1,
    },
  ],
};

const dataWeek = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Heart Rate (bpm)',
      data: [72, 75, 78, 73, 80, 85, 79],
      fill: false,
      borderColor: '#4FD1C5',
      tension: 0.1,
    },
  ],
};

const HeartRateChart = () => {
  const [selectedTab, setSelectedTab] = useState('today');

  // Determine which data to show based on selected tab
  const chartData = selectedTab === 'today' ? dataToday : dataWeek;

  return (
    <Card p={6} borderRadius="lg" shadow="lg" bg="white" maxW="700px" mx="auto">
      <Heading mb={4} fontSize="2xl" fontWeight="bold" textAlign="center">
        Heart Rate
      </Heading>
      <Text mb={4} textAlign="center" fontSize="md" color="gray.600">
        View your heart rate data for the selected time period.
      </Text>
      <Tabs isLazy variant="enclosed" colorScheme="teal" mb={6} onChange={(index) => setSelectedTab(index === 0 ? 'today' : 'week')}>
        <TabList>
          <Tab>Today</Tab>
          <Tab>Over the Week</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          return `${tooltipItem.dataset.label}: ${tooltipItem.raw} bpm`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: selectedTab === 'today' ? 'Hour of Day' : 'Day',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Heart Rate (bpm)',
                      },
                      min: 60,
                      max: 100,
                    },
                  },
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          return `${tooltipItem.dataset.label}: ${tooltipItem.raw} bpm`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: selectedTab === 'today' ? 'Hour of Day' : 'Day',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Heart Rate (bpm)',
                      },
                      min: 60,
                      max: 100,
                    },
                  },
                }}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default HeartRateChart;

import React, { useState } from 'react';
import { Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import Card from 'components/card/Card'; // Adjust the path as needed
import { CSVLink } from 'react-csv';
import axios from 'axios';

// Register required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Example data for different time periods
const dataSets = {
  today: {
    labels: ['12 AM', '6 AM', '12 PM', '6 PM', '12 AM'],
    datasets: [
      {
        label: 'Stress Level',
        data: [4, 6, 5, 7, 3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  },
  weekly: {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Stress Level',
        data: [5, 6, 7, 4, 5, 6, 7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  },
  monthly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Stress Level',
        data: [6, 7, 5, 6],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  },
};

const StressLevelChart = () => {
  const [selectedTab, setSelectedTab] = useState('today');

  const data = {
    labels: dataSets[selectedTab].labels,
    datasets: dataSets[selectedTab].datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Stress Level: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const csvData = data.datasets.flatMap(dataset => 
    dataset.data.map((value, index) => ({
      Time: data.labels[index],
      [dataset.label]: value
    }))
  );

  const sendDataToAPI = async () => {
    try {
      await axios.post('http://localhost:5000/api/data', {
        type: 'stress_level',
        period: selectedTab,
        data: csvData,
      });
      alert('Data sent successfully');
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Failed to send data');
    }
  };

  return (
    <Box width="100%" p={4}>
      <Card>
        <Heading size="lg" mb={4}>Stress Level Overview</Heading>
        <Tabs
          variant="enclosed"
          onChange={(index) => {
            if (index === 0) setSelectedTab('today');
            if (index === 1) setSelectedTab('weekly');
            if (index === 2) setSelectedTab('monthly');
          }}
        >
          <TabList>
            <Tab>Today</Tab>
            <Tab>Weekly</Tab>
            <Tab>Monthly</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Line data={data} options={options} />
            </TabPanel>
            <TabPanel>
              <Line data={data} options={options} />
            </TabPanel>
            <TabPanel>
              <Line data={data} options={options} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Button mt={4} onClick={sendDataToAPI}>
          Send Data to API
        </Button>
        <CSVLink data={csvData} filename={`stress_level_${selectedTab}.csv`}>
          <Button mt={4} ml={4}>Export Data</Button>
        </CSVLink>
      </Card>
    </Box>
  );
};

export default StressLevelChart;
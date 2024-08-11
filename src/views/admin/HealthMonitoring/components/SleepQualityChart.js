import React, { useState } from 'react';
import { Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import Card from 'components/card/Card'; // Adjust the path as needed
import { CSVLink } from 'react-csv';
import axios from 'axios';

// Register required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const dataSets = {
  today: {
    labels: ['12 AM', '6 AM', '12 PM', '6 PM', '12 AM'],
    datasets: [
      {
        label: 'Deep Sleep (hrs)',
        data: [0.5, 0.8, 1.0, 0.5, 0.3],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'REM Sleep (hrs)',
        data: [0.3, 0.5, 0.4, 0.2, 0.1],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
      {
        label: 'Wake Time (hrs)',
        data: [0.2, 0.3, 0.5, 0.7, 0.9],
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
        label: 'Deep Sleep (hrs)',
        data: [1.5, 2, 1.8, 2.2, 2.5, 2.0, 1.7],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'REM Sleep (hrs)',
        data: [1.0, 1.2, 1.1, 1.3, 1.0, 1.2, 1.1],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
      {
        label: 'Wake Time (hrs)',
        data: [2.0, 1.5, 1.8, 1.2, 1.5, 1.8, 2.0],
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
        label: 'Deep Sleep (hrs)',
        data: [10, 12, 14, 11],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'REM Sleep (hrs)',
        data: [8, 9, 10, 7],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
      {
        label: 'Wake Time (hrs)',
        data: [5, 6, 7, 4],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  },
};

const SleepQualityChart = () => {
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
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} hrs`;
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
      await axios.post('/api/data', {
        type: 'sleep_quality',
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
        <Heading size="lg" mb={4}>Sleep Quality Overview</Heading>
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
        <CSVLink data={csvData} filename={`sleep_quality_${selectedTab}.csv`}>
          <Button mt={4} ml={4}>Export Data</Button>
        </CSVLink>
      </Card>
    </Box>
  );
};

export default SleepQualityChart;
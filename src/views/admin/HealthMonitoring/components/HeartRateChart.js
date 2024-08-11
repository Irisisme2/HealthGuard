import React, { useState } from 'react';
import { Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import Card from 'components/card/Card'; // Adjust the path as needed
import { CSVLink } from 'react-csv';
import axios from 'axios';

// Register required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const dataOptions = {
  today: {
    labels: [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
      '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ],
    data: [72, 74, 70, 71, 69, 75, 72, 73, 74, 76, 77, 75, 74, 72, 70, 69, 73, 75, 76, 74, 73, 72, 71, 70]
  },
  weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [72, 75, 73, 74]
  },
  monthly: {
    labels: ['August 2024', 'September 2024', 'October 2024'],
    data: [72, 75, 74]
  }
};

const HeartRateChart = () => {
  const [viewOption, setViewOption] = useState('today');

  const data = {
    labels: dataOptions[viewOption].labels,
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: dataOptions[viewOption].data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
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
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} bpm`;
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
        type: 'heart_rate',
        period: viewOption,
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
        <Heading size="lg" mb={4}>Heart Rate Variability</Heading>
        <Tabs
          variant="enclosed"
          colorScheme="blue"
          onChange={(index) => {
            const views = ['today', 'weekly', 'monthly'];
            setViewOption(views[index]);
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
        <CSVLink data={csvData} filename={`heart_rate_${viewOption}.csv`}>
          <Button mt={4} ml={4}>Export Data</Button>
        </CSVLink>
      </Card>
    </Box>
  );
};

export default HeartRateChart;
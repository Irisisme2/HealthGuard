import React from 'react';
import { Box, Text, Button, VStack, SimpleGrid, Tooltip, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the path as needed
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip as ChartTooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, ChartTooltip);

const WeightMeasurement = () => {
  // Example data
  const currentWeight = 70; // in kg
  const weightHistory = [
    { date: '2024-07-01', weight: 68 },
    { date: '2024-07-15', weight: 69 },
    { date: '2024-08-01', weight: 70 },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const weightData = {
    labels: weightHistory.map(entry => entry.date),
    datasets: [{
      label: 'Weight (kg)',
      data: weightHistory.map(entry => entry.weight),
      borderColor: '#3182ce',
      backgroundColor: 'rgba(49, 130, 206, 0.2)',
      borderWidth: 2,
      tension: 0.1,
    }],
  };

  const viewHistory = () => {
    onOpen();
  };

  return (
    <Card>
      <Box p={4}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Current Weight
          </Text>
          <Text fontSize="4xl" fontWeight="bold" textAlign="center" mb={4}>
            {currentWeight} kg
          </Text>
          
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Latest Measurements
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {weightHistory.map((entry, index) => (
              <Tooltip key={index} label={`Weight on ${entry.date}`} fontSize="md">
                <Box borderWidth={1} borderRadius="md" p={3} bg="gray.50">
                  <Text fontSize="md" fontWeight="bold">{entry.date}</Text>
                  <Text fontSize="md">{entry.weight} kg</Text>
                </Box>
              </Tooltip>
            ))}
          </SimpleGrid>

          <Button colorScheme="blue" onClick={viewHistory} mt={4}>
            View History
          </Button>
          
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Weight History</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Line data={weightData} options={{ responsive: true }} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
      </Box>
    </Card>
  );
};

export default WeightMeasurement;


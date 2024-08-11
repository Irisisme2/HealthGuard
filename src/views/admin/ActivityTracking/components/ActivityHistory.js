import React from 'react';
import {
  VStack,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  useColorModeValue,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import running from 'assets/img/activities/running.png';
import cycling from 'assets/img/activities/cycling.png';
import swimming from 'assets/img/activities/swimming.png';
import hiking from 'assets/img/activities/hiking.png';
import gym from 'assets/img/activities/gym.png';
import dancing from 'assets/img/activities/dancing.png';
import Card from 'components/card/Card';

const activityIcons = {
  running,
  cycling,
  swimming,
  hiking,
  gym,
  dancing,
};

const activities = [
  {
    id: 1,
    date: '2024-08-10',
    type: 'running',
    duration: '30 minutes',
    calories: 300,
  },
  {
    id: 2,
    date: '2024-08-09',
    type: 'cycling',
    duration: '45 minutes',
    calories: 450,
  },
  {
    id: 3,
    date: '2024-08-08',
    type: 'swimming',
    duration: '1 hour',
    calories: 600,
  },
  {
    id: 4,
    date: '2024-08-07',
    type: 'hiking',
    duration: '2 hours',
    calories: 800,
  },
  {
    id: 5,
    date: '2024-08-06',
    type: 'gym',
    duration: '1.5 hours',
    calories: 500,
  },
  {
    id: 6,
    date: '2024-08-05',
    type: 'dancing',
    duration: '1 hour',
    calories: 400,
  },
  {
    id: 7,
    date: '2024-08-04',
    type: 'running',
    duration: '40 minutes',
    calories: 350,
  },
];


const ActivityHistory = () => {
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
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          My History
        </Text>
        <Text fontSize="md" mb={6}>
          Browse the history of your logged activities.
        </Text>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Duration</Th>
                <Th>Calories</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {activities.map((activity) => (
                <Tr key={activity.id}>
                  <Td>{activity.date}</Td>
                  <Td>
                    <HStack spacing={2} align="center">
                      <img
                        src={activityIcons[activity.type]}
                        alt={activity.type}
                        width="24"
                        height="24"
                      />
                      <Text>{activity.type}</Text>
                    </HStack>
                  </Td>
                  <Td>{activity.duration}</Td>
                  <Td>{activity.calories} kcal</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Tooltip label="Edit" aria-label="Edit Activity">
                        <IconButton
                          icon={<EditIcon />}
                          aria-label="Edit"
                          variant="outline"
                          colorScheme="teal"
                          size="sm"
                        />
                      </Tooltip>
                      <Tooltip label="Delete" aria-label="Delete Activity">
                        <IconButton
                          icon={<DeleteIcon />}
                          aria-label="Delete"
                          variant="outline"
                          colorScheme="red"
                          size="sm"
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </VStack>
  );
};

export default ActivityHistory;

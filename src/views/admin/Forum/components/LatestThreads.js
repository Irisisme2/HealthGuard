import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Button,
  Card,
  Divider,
} from '@chakra-ui/react';
import ThreadDetails from './ThreadDetails'; // Import the ThreadDetails component

// Example data for latest threads
const latestThreads = [
  {
    title: 'How to Improve Your Workout Routine',
    date: '2024-08-10',
    time: '15:30',
    author: 'FitnessFan99',
    replies: 12,
    preview: 'Looking for tips on how to make my workout routine more effective. Any suggestions?',
  },
  {
    title: 'Best Practices for Healthy Eating',
    date: '2024-08-09',
    time: '10:00',
    author: 'HealthGuru',
    replies: 8,
    preview: 'What are some of the best practices for maintaining a balanced diet? Share your tips!',
  },
  {
    title: 'Managing Stress with Exercise',
    date: '2024-08-08',
    time: '18:20',
    author: 'ZenMaster',
    replies: 5,
    preview: 'How can regular exercise help in managing stress levels? Looking for some effective methods.',
  },
];

const LatestThreads = () => {
  const [selectedThread, setSelectedThread] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <VStack spacing={6} align="stretch">
      {!selectedThread ? (
        <Card
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          bg={bgColor}
          border="1px"
          borderColor={borderColor}
          width="1565px"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Latest Threads
          </Text>
          <Text fontSize="md" mb={6}>
            Check out the latest discussions on the forum.
          </Text>

          <VStack spacing={4} align="stretch">
            {latestThreads.map((thread, index) => (
              <Box
                key={index}
                p={4}
                borderRadius="md"
                boxShadow="md"
                bg={bgColor}
                border="1px"
                borderColor={borderColor}
              >
                <HStack spacing={3} mb={3}>
                  <Box flex="1">
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {thread.title}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {thread.date} at {thread.time}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Author: {thread.author}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Replies: {thread.replies}
                    </Text>
                  </Box>
                </HStack>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  {thread.preview}
                </Text>
                <Button
                  colorScheme="blue"
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedThread(thread)}
                >
                  Read More
                </Button>
              </Box>
            ))}
          </VStack>
        </Card>
      ) : (
        <ThreadDetails thread={selectedThread} onBack={() => setSelectedThread(null)} />
      )}
    </VStack>
  );
};

export default LatestThreads;

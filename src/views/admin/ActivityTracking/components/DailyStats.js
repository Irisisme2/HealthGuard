import React from 'react';
import { VStack, Stack, Text, useColorModeValue, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import Card from 'components/card/Card';

const data = {
  steps: 7500,
  calories: 450,
  distance: 5.2,
  activityTime: 60,
  hydration: 1.5, // in liters
  sleep: 6, // in hours
  activeMinutes: 45,
  workouts: 2, // number of workouts
};

const DailyStats = () => {
  return (
    <VStack spacing={4} align="stretch">
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} align="center">
        <StatCard
          label="Steps"
          value={data.steps}
          goal={10000}
          progress={(data.steps / 10000) * 100}
          color="teal"
        />
        <StatCard
          label="Calories Burned"
          value={data.calories}
          goal={500}
          progress={(data.calories / 500) * 100}
          color="orange"
        />
      </Stack>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} align="center">
        <StatCard
          label="Distance Covered"
          value={`${data.distance} km`}
          goal={10}
          progress={(data.distance / 10) * 100}
          color="blue"
        />
        <StatCard
          label="Activity Time"
          value={`${data.activityTime} min`}
          goal={90}
          progress={(data.activityTime / 90) * 100}
          color="purple"
        />
      </Stack>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} align="center">
        <StatCard
          label="Hydration"
          value={`${data.hydration} L`}
          goal={2}
          progress={(data.hydration / 2) * 100}
          color="cyan"
        />
        <StatCard
          label="Sleep"
          value={`${data.sleep} hours`}
          goal={8}
          progress={(data.sleep / 8) * 100}
          color="green"
        />
      </Stack>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} align="center">
        <StatCard
          label="Active Minutes"
          value={`${data.activeMinutes} min`}
          goal={60}
          progress={(data.activeMinutes / 60) * 100}
          color="orange"
        />
        <StatCard
          label="Workouts"
          value={`${data.workouts} times`}
          goal={3}
          progress={(data.workouts / 3) * 100}
          color="red"
        />
      </Stack>
    </VStack>
  );
};

const StatCard = ({ label, value, goal, progress, color }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Card
    p={6}
    borderRadius="lg"
    boxShadow="lg"
    bg={bgColor}
    border="1px"
    borderColor={borderColor}
    maxH="490px" 
    overflowY="auto" 
  >
      <Text fontSize="lg" fontWeight="bold" mb={2}>{label}</Text>
      <Text fontSize="md" color={color} mb={2}>Goal: {goal}</Text>
      <Stack spacing={2} align="center" justify="center" height="110px" width="120px" mx="auto">
        <CircularProgress
          value={progress}
          color={color}
          size="120px"
          thickness="8px"
          trackColor="gray.200"
        >
          <CircularProgressLabel>
            <Text fontSize="lg" fontWeight="bold">{`${Math.round(progress)}%`}</Text>
          </CircularProgressLabel>
        </CircularProgress>
      </Stack>
      <Text fontSize="lg" fontWeight="medium" color={textColor} mt={4}>{value}</Text>
    </Card>
  );
};

export default DailyStats;

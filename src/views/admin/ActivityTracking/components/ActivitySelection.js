import React, { useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  useColorModeValue,
  VStack,
  Card,
} from '@chakra-ui/react';
import running from 'assets/img/activities/running.png';
import cycling from 'assets/img/activities/cycling.png';
import swimming from 'assets/img/activities/swimming.png';
import hiking from 'assets/img/activities/hiking.png';
import gym from 'assets/img/activities/gym.png';
import dancing from 'assets/img/activities/dancing.png';
import jogging from 'assets/img/activities/jogging.png';  // Dodany obrazek
import pilates from 'assets/img/activities/pilates.png';  // Dodany obrazek
import tennis from 'assets/img/activities/tennis.png';    // Dodany obrazek
import rollerblading from 'assets/img/activities/rollerblading.png'; // Dodany obrazek
import climbing from 'assets/img/activities/climbing.png'; // Dodany obrazek
import yoga from 'assets/img/activities/yoga.png'; // Dodany obrazek
import AddActivityForm from './AddActivityForm';

const activities = [
  { name: 'Running', img: running, value: 'running' },
  { name: 'Cycling', img: cycling, value: 'cycling' },
  { name: 'Swimming', img: swimming, value: 'swimming' },
  { name: 'Hiking', img: hiking, value: 'hiking' },
  { name: 'Gym', img: gym, value: 'gym' },
  { name: 'Dancing', img: dancing, value: 'dancing' },
  { name: 'Jogging', img: jogging, value: 'jogging' }, // Nowa aktywność
  { name: 'Pilates', img: pilates, value: 'pilates' }, // Nowa aktywność
  { name: 'Tennis', img: tennis, value: 'tennis' }, // Nowa aktywność
  { name: 'Rollerblading', img: rollerblading, value: 'rollerblading' }, // Nowa aktywność
  { name: 'Climbing', img: climbing, value: 'climbing' }, // Nowa aktywność
  { name: 'Yoga', img: yoga, value: 'yoga' }, // Nowa aktywność
];

const ActivitySelection = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  const handleSelectActivity = (value) => {
    setSelectedActivity(value);
  };

  return (
    <VStack spacing={6} align="stretch">
      {!selectedActivity ? (
        <Card
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          bg={bgColor}
          border="1px"
          borderColor={borderColor}
          height="1125px"
          minHeight="300px" 
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Add Activity
          </Text>
          <Text fontSize="md" mb={6}>
            Select an activity type to log your physical activity.
          </Text>

          <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
            {activities.map((activity) => (
              <Box
                key={activity.value}
                borderRadius="md"
                boxShadow="md"
                overflow="hidden"
                cursor="pointer"
                onClick={() => handleSelectActivity(activity.value)}
                transition="transform 0.2s, background-color 0.2s"
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg', bgColor: hoverBgColor }}
              >
                <Image src={activity.img} alt={activity.name} />
                <Text textAlign="center" fontSize="lg" mt={2} fontWeight="bold">
                  {activity.name}
                </Text>
              </Box>
            ))}
          </Grid>
        </Card>
      ) : (
        <AddActivityForm activityType={selectedActivity} onBack={() => setSelectedActivity(null)} />
      )}
    </VStack>
  );
};

export default ActivitySelection;

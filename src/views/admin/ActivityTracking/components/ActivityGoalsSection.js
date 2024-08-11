import React, { useState } from 'react';
import {
  VStack,
  Text,
  Grid,
  GridItem,
  Box,
  Image,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import steps from 'assets/img/activities/steps.png';
import activity from 'assets/img/activities/activity.png';
import water from 'assets/img/activities/water.png';
import sleep from 'assets/img/activities/sleep.png';
import gym from 'assets/img/activities/gym.png';
import dancing from 'assets/img/activities/dancing.png';

const goalDetails = {
  steps: { label: '10,000 Steps', goal: 10000, progress: 7500, daysLeft: 5 },
  activity: { label: '1 Hour of Activity', goal: 60, progress: 30, daysLeft: 10 },
  water: { label: '2 Liters of Water', goal: 2000, progress: 1500, daysLeft: 7 },
  sleep: { label: '8 Hours of Sleep', goal: 8, progress: 4, daysLeft: 3 },
  gym: { label: '3 Gym Sessions', goal: 3, progress: 1, daysLeft: 12 },
  dancing: { label: '5 Hours of Dancing', goal: 5, progress: 4, daysLeft: 8 },
};

const MyGoalsSection = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    label: '',
    goal: '',
    dueDate: ''
  });

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setSelectedGoal(null);
    setNewGoal({ label: '', goal: '', dueDate: '' });
  };

  const handleAddNewGoal = () => {
  
    console.log("New Goal Added:", newGoal);
    handleModalClose(); 
  };

  const renderCircularProgress = (goalKey) => {
    const { goal, progress } = goalDetails[goalKey] || {};
    const percentage = (progress / goal) * 100;
    const color = getProgressColor(percentage);

    return (
      <Stack spacing={2} align="center" justify="center" height="250px" width="250px" mx="auto">
        <CircularProgress
          value={percentage}
          color={color}
          size="250px"
          thickness="12px"
          trackColor="gray.200"
        >
          <CircularProgressLabel>
            <Text fontSize="lg" fontWeight="bold">{`${Math.round(percentage)}%`}</Text>
          </CircularProgressLabel>
        </CircularProgress>
      </Stack>
    );
  };

  const getProgressColor = (percentage) => {
    if (percentage < 50) return 'red';
    if (percentage < 75) return 'orange';
    return 'green';
  };

  return (
    <VStack spacing={8} align="stretch">
      <Box
        p={8}
        borderRadius="md"
        boxShadow="lg"
        bg={useColorModeValue('white', 'gray.800')}
        height="1125px"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={6}>My Goals</Text>

        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          {Object.entries(goalDetails).map(([key, { label }]) => (
            <GridItem key={key}>
              <Box
                borderRadius="md"
                overflow="hidden"
                boxShadow="md"
                cursor="pointer"
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                transition="transform 0.3s, box-shadow 0.3s"
                onClick={() => handleGoalClick(key)}
                textAlign="center"
                height="280px"
              >
                <Image src={{ steps, activity, water, sleep, gym, dancing }[key]} alt={label} width="100%" height="auto" />
                <Text mt={4} fontSize="md" fontWeight="bold">{label}</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>

        <Button
          mt={8}
          colorScheme="blue"
          width="full"
          size="lg"
          onClick={() => setIsOpen(true)}
        >
          Add New Goal
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedGoal ? 'Goal Details' : 'Add New Goal'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedGoal ? (
              <>
                <Text fontSize="xl" mb={4}>{goalDetails[selectedGoal].label}</Text>
                <Box height="250px" width="100%">
                  {renderCircularProgress(selectedGoal)}
                </Box>
                <Text mt={4} fontSize="md">Goal: {goalDetails[selectedGoal].goal}</Text>
                <Text fontSize="md">Progress: {goalDetails[selectedGoal].progress}</Text>
                <Text fontSize="md">Days Left: {goalDetails[selectedGoal].daysLeft}</Text>
              </>
            ) : (
              <VStack spacing={4}>
                <FormControl id="goalType">
                  <FormLabel>Goal</FormLabel>
                  <Select
                    placeholder="Select Goal"
                    value={newGoal.label}
                    onChange={(e) => setNewGoal({ ...newGoal, label: e.target.value })}
                  >
                    <option value="steps">Daily Steps</option>
                    <option value="activity">Weekly Activity Time</option>
                    <option value="water">Daily Water Intake</option>
                    <option value="sleep">Hours of Sleep</option>
                    <option value="gym">Gym Sessions</option>
                    <option value="dancing">Dancing Hours</option>
                  </Select>
                </FormControl>
                <FormControl id="goalValue">
                  <FormLabel>Goal Value</FormLabel>
                  <Input
                    type="number"
                    value={newGoal.goal}
                    onChange={(e) => setNewGoal({ ...newGoal, goal: e.target.value })}
                  />
                </FormControl>
                <FormControl id="dueDate">
                  <FormLabel>Due Date</FormLabel>
                  <Input
                    type="date"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  />
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            {selectedGoal ? (
              <>
                <Button colorScheme="blue" onClick={() => {/* Handle Save */}}>
                  Save Goal
                </Button>
                <Button variant="ghost" ml={3} onClick={handleModalClose}>
                  Close
                </Button>
              </>
            ) : (
              <>
                <Button colorScheme="blue" onClick={handleAddNewGoal}>
                  Save Goal
                </Button>
                <Button variant="ghost" ml={3} onClick={handleModalClose}>
                  Close
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default MyGoalsSection;

import React, { useState } from 'react';
import {
  VStack,
  Stack,
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useColorModeValue,
  HStack,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { InfoIcon, CheckIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Card from 'components/card/Card';

const AddActivityForm = ({ activityType, onBack }) => {
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    let formErrors = {};
    if (!duration) formErrors.duration = 'Duration is required.';
    if (!intensity) formErrors.intensity = 'Intensity is required.';
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Clear errors
    setErrors({});
    
    // Handle form submission logic
    console.log({
      activityType,
      duration,
      intensity,
      calories,
      notes,
      date,
    });
    
    toast({
      title: "Activity Added.",
      description: "Your activity has been successfully logged.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Card
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      bg={useColorModeValue('white', 'gray.800')}
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      transition="transform 0.3s ease-in-out"
    >
      <HStack mb={4} spacing={4}>
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Back"
          onClick={onBack}
          variant="outline"
          colorScheme="teal"
        />
        <Text fontSize="2xl" fontWeight="bold">Add Activity</Text>
      </HStack>
      <Text fontSize="md" mb={6}>
        Record your activity details below.
      </Text>
      
      <Box as="form" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="activityType">
            <FormLabel>Activity Type</FormLabel>
            <Input
              value={activityType}
              isReadOnly
            />
          </FormControl>

          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="MMMM d, yyyy"
              customInput={
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<InfoIcon color="gray.300" />} />
                  <Input placeholder="Select date" />
                </InputGroup>
              }
            />
          </FormControl>
          
          <FormControl id="duration" isInvalid={!!errors.duration} isRequired>
            <FormLabel>Duration</FormLabel>
            <HStack spacing={2}>
              <NumberInput
                value={duration}
                onChange={(valueString) => setDuration(valueString)}
                min={0}
              >
                <NumberInputField placeholder="e.g., 30" />
              </NumberInput>
              <Text>minutes</Text>
            </HStack>
            <FormErrorMessage>{errors.duration}</FormErrorMessage>
          </FormControl>
          
          <FormControl id="intensity" isInvalid={!!errors.intensity} isRequired>
            <FormLabel>Intensity</FormLabel>
            <Select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              placeholder="Select intensity"
              bg={useColorModeValue('gray.50', 'gray.700')}
              borderColor={useColorModeValue('gray.300', 'gray.600')}
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </Select>
            <FormErrorMessage>{errors.intensity}</FormErrorMessage>
          </FormControl>
          
          <FormControl id="calories">
            <FormLabel>Calories</FormLabel>
            <NumberInput
              value={calories}
              onChange={(valueString) => setCalories(valueString)}
              min={0}
              precision={0}
            >
              <NumberInputField placeholder="Optional" />
            </NumberInput>
          </FormControl>
          
          <FormControl id="notes">
            <FormLabel>Notes</FormLabel>
            <Textarea
              placeholder="Add any additional notes or details"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              resize="vertical"
            />
          </FormControl>
          
          <Button colorScheme="teal" type="submit" rightIcon={<CheckIcon />}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default AddActivityForm;

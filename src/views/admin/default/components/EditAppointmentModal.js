import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  useToast
} from '@chakra-ui/react';

const EditAppointmentModal = ({ appointment, isOpen, onClose, onSave, availableDates, availableTimes }) => {
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [type, setType] = useState(appointment.type);

  const toast = useToast();

  const handleSave = () => {
    if (!date || !time || !type) {
      toast({
        title: 'Validation Error',
        description: 'Please fill out all fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    onSave({ date, time, type });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Appointment</ModalHeader>
        <ModalBody>
          <VStack spacing={4} align='stretch'>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder='Select date'
                size='lg'
                variant='outline'
              >
                {availableDates.map((availableDate, index) => (
                  <option key={index} value={availableDate}>
                    {availableDate}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Time</FormLabel>
              <Select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder='Select time'
                size='lg'
                variant='outline'
                isDisabled={!date} // Disable time selection if no date is selected
              >
                {availableTimes[date]?.map((availableTime, index) => (
                  <option key={index} value={availableTime}>
                    {availableTime}
                  </option>
                )) || <option>No available times</option>}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder='Select appointment type'
                size='lg'
                variant='outline'
              >
                <option value='In-Person'>In-Person</option>
                <option value='Online'>Online</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button variant='outline' onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAppointmentModal;


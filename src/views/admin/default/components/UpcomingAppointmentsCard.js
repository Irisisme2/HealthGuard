import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  Card,
  Heading,
  VStack,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react';
import AppointmentDetails from './AppointmentDetails';
import EditAppointmentModal from './EditAppointmentModal';
import appointments from './appointments';

const availableDates = [
  '2024-08-10',
  '2024-08-11',
  '2024-08-12'
];

const availableTimes = {
  '2024-08-10': ['09:00 AM', '10:00 AM', '11:00 AM'],
  '2024-08-11': ['01:00 PM', '02:00 PM', '03:00 PM'],
  '2024-08-12': ['10:00 AM', '11:00 AM', '12:00 PM']
};

const UpcomingAppointmentsCard = () => {
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  const handleEditSave = (updatedAppointment) => {
    // Update the appointment details in state or make API call
    console.log('Updated Appointment:', { ...selectedAppointment, ...updatedAppointment });
    // Perform actual update logic here
    onEditClose();
  };

  return (
    <Card bg={cardBg} p={6} borderRadius='lg' shadow='lg'>
      <Heading size='lg' mb={4} color={textColor} textAlign='center'>
        Upcoming Medical Appointments
      </Heading>
      <VStack spacing={4} align='stretch'>
        {appointments.map((appointment) => (
          <Box
            key={appointment.id}
            p={5}
            borderWidth='1px'
            borderRadius='md'
            shadow='md'
            bg={cardBg}
            _hover={{ bg: hoverBg }}
          >
            <Flex justify='space-between' mb={3}>
              <Text fontWeight='bold' color={textColor}>
                {appointment.date} - {appointment.time}
              </Text>
              <Text color='gray.500'>{appointment.type}</Text>
            </Flex>
            <Flex align='center' mb={3}>
              <Avatar src={appointment.doctorImage} size='md' mr={4} />
              <Text mb={0} fontWeight='bold' color={textColor}>
                {appointment.doctor}
              </Text>
            </Flex>
            <Text mb={4} color={textColor}>
              {appointment.details}
            </Text>
            <Flex justify='space-between'>
              <Button
                colorScheme='blue'
                size='sm'
                onClick={() => { setSelectedAppointment(appointment); onDetailsOpen(); }}
              >
                View Details
              </Button>
              <Button
                colorScheme='teal'
                size='sm'
                onClick={() => { setSelectedAppointment(appointment); onEditOpen(); }}
              >
                Edit
              </Button>
            </Flex>
          </Box>
        ))}
      </VStack>
      {selectedAppointment && (
        <>
          <AppointmentDetails
            appointment={selectedAppointment}
            onClose={onDetailsClose}
            onEdit={onEditOpen}
          />
          <EditAppointmentModal
            appointment={selectedAppointment}
            isOpen={isEditOpen}
            onClose={onEditClose}
            onSave={handleEditSave}
            availableDates={availableDates}
            availableTimes={availableTimes}
          />
        </>
      )}
    </Card>
  );
};

export default UpcomingAppointmentsCard;

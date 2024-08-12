import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const AppointmentDetails = ({ appointment, onClose, onEdit }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const [directions, setDirections] = useState(null);

  // Google Maps API key from environment variables
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Center and markers
  const center = { lat: appointment.location.lat, lng: appointment.location.lng };
  const destination = { lat: appointment.location.lat, lng: appointment.location.lng };

  useEffect(() => {
    const fetchDirections = async () => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRequest = {
        origin: { lat: 37.7749, lng: -122.4194 }, // Example starting point
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(directionsRequest, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions", status);
        }
      });
    };

    if (window.google) {
      fetchDirections();
    }
  }, [destination]);

  return (
    <Modal isOpen={true} onClose={onClose} size='full'>
      <ModalOverlay />
      <ModalContent maxWidth='80vw' mx='auto'>
        <ModalHeader>Appointment Details</ModalHeader>
        <ModalBody>
          <Tabs variant='enclosed' colorScheme='teal'>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Medical Details</Tab>
              <Tab>Documents</Tab>
              <Tab>Billing & Insurance</Tab>
              <Tab>Notes</Tab>
              <Tab>Next Slot</Tab>
              <Tab>Historical Metrics</Tab>
              <Tab>Health Metrics</Tab>
              <Tab>Prescription</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Date:</Text>
                  <Text>{appointment.date}</Text>
                  <Text fontWeight='bold'>Time:</Text>
                  <Text>{appointment.time}</Text>
                  <Text fontWeight='bold'>Type:</Text>
                  <Text>{appointment.type}</Text>
                </Flex>
                <Flex direction='column' mb={4}>
                  <Flex align='center' mb={3}>
                    <Avatar src={appointment.doctorImage} size='md' mr={4} />
                    <Text mb={0} fontWeight='bold' color={textColor}>
                      {appointment.doctor}
                    </Text>
                  </Flex>
                  <Text fontWeight='bold'>Qualifications:</Text>
                  <Text>{appointment.doctorQualifications}</Text>
                  <Text fontWeight='bold'>Specialties:</Text>
                  <Text>{appointment.doctorSpecialties.join(', ')}</Text>
                </Flex>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Location:</Text>
                  <Text>{appointment.location.address}</Text>
                  {appointment.location.lat && appointment.location.lng && (
                    <Box height='400px' width='100%' mt={4}>
                      <LoadScript googleMapsApiKey={apiKey}>
                        <GoogleMap
                          mapContainerStyle={{ height: '100%', width: '100%' }}
                          center={center}
                          zoom={15}
                        >
                          <Marker position={destination} />
                          {directions && <DirectionsRenderer directions={directions} />}
                        </GoogleMap>
                      </LoadScript>
                    </Box>
                  )}
                </Flex>
              </TabPanel>
              {/* Other TabPanels remain unchanged */}
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onEdit}>
            Edit
          </Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppointmentDetails;

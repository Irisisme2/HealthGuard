import React from 'react';
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

const AppointmentDetails = ({ appointment, onClose, onEdit }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');

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
                    <Box height='300px' width='100%' mt={4}>
                      <iframe
                        width='100%'
                        height='100%'
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(appointment.location.address)}`}
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </Box>
                  )}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Tests Performed:</Text>
                  <Text>{appointment.testsPerformed.join(', ')}</Text>
                  <Text fontWeight='bold'>Medical History:</Text>
                  <Text>{appointment.medicalHistory}</Text>
                  <Text fontWeight='bold'>Follow-Up:</Text>
                  <Text>{appointment.followUp}</Text>
                  <Text fontWeight='bold'>Instructions:</Text>
                  <Text>{appointment.instructions}</Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Documents:</Text>
                  {appointment.documents.map((doc, index) => (
                    <Link key={index} href={doc.link} isExternal>
                      {doc.name}
                    </Link>
                  ))}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Insurance:</Text>
                  <Text>{appointment.insurance}</Text>
                  <Text fontWeight='bold'>Billing Information:</Text>
                  <Text>{appointment.billingInformation}</Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Notes:</Text>
                  <Text>{appointment.notes}</Text>
                  <Text fontWeight='bold'>Visit Summary:</Text>
                  <Text>{appointment.visitSummary}</Text>
                  <Text fontWeight='bold'>Previous Visit Summary:</Text>
                  <Text>{appointment.previousVisitSummary}</Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Next Available Slot:</Text>
                  <Text>{appointment.nextAvailableSlot}</Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Historical Health Metrics:</Text>
                  {appointment.historicalMetrics.map((metric, index) => (
                    <Text key={index}>
                      {metric.date}: {metric.metric} - {metric.value}
                    </Text>
                  ))}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Health Metrics:</Text>
                  <Text>{appointment.healthMetrics}</Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction='column' mb={4}>
                  <Text fontWeight='bold'>Prescription Details:</Text>
                  <Text>{appointment.prescription}</Text>
                </Flex>
              </TabPanel>
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

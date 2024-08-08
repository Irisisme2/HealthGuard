import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  FormControl,
  FormLabel,
  useToast,
  Flex,
  Spacer,
  IconButton,
  Spinner,
  InputGroup,
  InputLeftElement,
  Image
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';

// Import doctor images
import doctor1 from 'assets/img/doctors/Doctor1.png';
import doctor2 from 'assets/img/doctors/Doctor2.png';
import doctor3 from 'assets/img/doctors/Doctor3.png';

// Simulated async data fetch
const fetchAppointments = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          dateTime: new Date(2024, 7, 10, 10, 0),
          doctor: 'Dr. John Smith',
          type: 'Checkup',
          status: 'Completed',
          details: 'Discussed general health and made recommendations for a new diet.',
          doctorImage: doctor1
        },
        {
          id: 2,
          dateTime: new Date(2024, 7, 15, 14, 0),
          doctor: 'Dr. Anna Brown',
          type: 'Specialist Consultation',
          status: 'Cancelled',
          details: 'Appointment cancelled due to unforeseen circumstances.',
          doctorImage: doctor2
        },
        {
          id: 3,
          dateTime: new Date(2024, 7, 20, 9, 0),
          doctor: 'Dr. Emily Green',
          type: 'Test',
          status: 'Completed',
          details: 'Lab results are normal. No further action required.',
          doctorImage: doctor3
        },
        // Add more appointments as needed
      ]);
    }, 1000)
  );

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAppointments();
        setAppointments(data);
        setFilteredAppointments(data);
      } catch (error) {
        toast({
          title: 'Error fetching appointments.',
          description: 'Unable to load appointment data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointments();
  }, []);

  useEffect(() => {
    const filterAppointments = () => {
      const filtered = appointments
        .filter(app => (statusFilter === 'all' || app.status === statusFilter))
        .filter(app => (typeFilter === 'all' || app.type === typeFilter))
        .filter(app => (
          app.doctor.toLowerCase().includes(searchQuery.toLowerCase())
        ))
        .sort((a, b) => {
          if (sortOrder === 'asc') {
            return new Date(a.dateTime) - new Date(b.dateTime);
          } else {
            return new Date(b.dateTime) - new Date(a.dateTime);
          }
        });

      setFilteredAppointments(filtered);
    };

    filterAppointments();
  }, [searchQuery, statusFilter, typeFilter, sortOrder, appointments]);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    onOpen();
  };

  const handleModalClose = () => {
    setSelectedAppointment(null);
    onClose();
  };

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredAppointments.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box
      width="100vw"
      height="66vh"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Card
        width="80vw"
        height="auto"
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        mb={4}
      >
        <Heading size="lg" mb={4}>Appointment History</Heading>
        <Text mb={4}>Browse through the history of your medical visits.</Text>

        <Flex mb={4} wrap="wrap" gap={4}>
          <FormControl mr={4} flex="1">
            <FormLabel htmlFor="search">Search by Doctor</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
              <Input
                id="search"
                placeholder="Search by doctor"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl mr={4} flex="1">
            <FormLabel htmlFor="statusFilter">Status</FormLabel>
            <Select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Upcoming">Upcoming</option>
            </Select>
          </FormControl>

          <FormControl mr={4} flex="1">
            <FormLabel htmlFor="typeFilter">Type</FormLabel>
            <Select
              id="typeFilter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Checkup">Checkup</option>
              <option value="Specialist Consultation">Specialist Consultation</option>
              <option value="Test">Test</option>
            </Select>
          </FormControl>

          <FormControl mr={4} flex="1">
            <FormLabel htmlFor="sortOrder">Sort Order</FormLabel>
            <Select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Select>
          </FormControl>
        </Flex>

        {isLoading ? (
          <Flex align="center" justify="center" height="50vh">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date & Time</Th>
                  <Th>Doctor</Th>
                  <Th>Visit Type</Th>
                  <Th>Status</Th>
                  <Th>Options</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedAppointments.length > 0 ? (
                  paginatedAppointments.map(appointment => (
                    <Tr key={appointment.id}>
                      <Td>{appointment.dateTime.toLocaleString()}</Td>
                      <Td>
                        <Flex align="center">
                          <Image
                            src={appointment.doctorImage}
                            alt={appointment.doctor}
                            boxSize="50px"
                            borderRadius="full"
                            mr={3}
                          />
                          {appointment.doctor}
                        </Flex>
                      </Td>
                      <Td>{appointment.type}</Td>
                      <Td>{appointment.status}</Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          onClick={() => handleViewDetails(appointment)}
                        >
                          View Details
                        </Button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="5">No appointments found.</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>

            <Flex mt={4} align="center">
              <IconButton
                aria-label="Previous Page"
                icon={<ChevronLeftIcon />}
                onClick={handlePrevPage}
                isDisabled={currentPage === 1}
              />
              <Spacer />
              <Text>
                Page {currentPage} of {Math.ceil(filteredAppointments.length / itemsPerPage)}
              </Text>
              <Spacer />
              <IconButton
                aria-label="Next Page"
                icon={<ChevronRightIcon />}
                onClick={handleNextPage}
                isDisabled={currentPage === Math.ceil(filteredAppointments.length / itemsPerPage)}
              />
            </Flex>
          </>
        )}
      </Card>

      {/* Appointment Details Modal */}
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Appointment Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAppointment ? (
              <>
                <Text fontWeight="bold">Date & Time:</Text>
                <Text mb={2}>{selectedAppointment.dateTime.toLocaleString()}</Text>
                <Text fontWeight="bold">Doctor:</Text>
                <Flex align="center">
                  <Image
                    src={selectedAppointment.doctorImage}
                    alt={selectedAppointment.doctor}
                    boxSize="50px"
                    borderRadius="full"
                    mr={3}
                  />
                  <Text>{selectedAppointment.doctor}</Text>
                </Flex>
                <Text fontWeight="bold">Visit Type:</Text>
                <Text mb={2}>{selectedAppointment.type}</Text>
                <Text fontWeight="bold">Status:</Text>
                <Text mb={2}>{selectedAppointment.status}</Text>
                <Text fontWeight="bold">Details:</Text>
                <Text mb={2}>{selectedAppointment.details}</Text>
              </>
            ) : (
              <Text>No details available.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AppointmentHistory;


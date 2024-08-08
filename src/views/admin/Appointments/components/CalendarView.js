import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/en-gb'; // Change to English locale if needed
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import { fetchHospitals } from 'services/googleMapsService'; // Import the service

// Configure moment locale
moment.locale('en-gb');
const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 1,
    title: 'Doctor Checkup',
    start: new Date(2024, 7, 10, 10, 0), // Date(year, month, day, hour, minute)
    end: new Date(2024, 7, 10, 11, 0),
    desc: 'Appointment with Dr. John Smith at Clinic A',
    type: 'checkup',
    doctor: 'Dr. John Smith',
    location: 'Clinic A',
  },
  {
    id: 2,
    title: 'Specialist Visit',
    start: new Date(2024, 7, 15, 14, 0),
    end: new Date(2024, 7, 15, 15, 0),
    desc: 'Visit with Dr. Anna Brown at Specialist Center B',
    type: 'specialist',
    doctor: 'Dr. Anna Brown',
    location: 'Specialist Center B',
  },
  {
    id: 3,
    title: 'Blood Test',
    start: new Date(2024, 7, 20, 9, 0),
    end: new Date(2024, 7, 20, 9, 30),
    desc: 'Blood test at Lab C',
    type: 'test',
    doctor: 'N/A',
    location: 'Lab C',
  },
  {
    id: 4,
    title: 'X-Ray Examination',
    start: new Date(2024, 7, 25, 11, 0),
    end: new Date(2024, 7, 25, 11, 30),
    desc: 'X-Ray examination at Diagnostic Center D',
    type: 'examination',
    doctor: 'N/A',
    location: 'Diagnostic Center D',
  },
  {
    id: 5,
    title: 'Annual Physical',
    start: new Date(2024, 7, 30, 8, 0),
    end: new Date(2024, 7, 30, 9, 0),
    desc: 'Annual physical exam with Dr. Emily Green at Clinic E',
    type: 'physical',
    doctor: 'Dr. Emily Green',
    location: 'Clinic E',
  },
  {
    id: 6,
    title: 'Dermatology Appointment',
    start: new Date(2024, 8, 5, 10, 0),
    end: new Date(2024, 8, 5, 11, 0),
    desc: 'Visit with Dr. Michael White at Dermatology Clinic F',
    type: 'specialist',
    doctor: 'Dr. Michael White',
    location: 'Dermatology Clinic F',
  },
];

const eventColors = {
  checkup: 'green',
  specialist: 'blue',
  test: 'red',
  examination: 'orange',
  physical: 'purple',
};

const CalendarView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: '',
    start: '',
    end: '',
    desc: '',
    type: 'checkup',
    doctor: '',
    location: '',
    recurring: false,
    notes: '',
    testResults: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [locationQuery, setLocationQuery] = useState('');
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      events.forEach(event => {
        if (moment().isSame(event.start, 'minute')) {
          toast({
            title: 'Upcoming appointment.',
            description: `You have an upcoming appointment: ${event.title}.`,
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [events, toast]);

  useEffect(() => {
    if (locationQuery) {
      setIsLoadingHospitals(true);
      fetchHospitals(locationQuery).then(hospitalResults => {
        setHospitals(hospitalResults);
        setIsLoadingHospitals(false);
      });
    } else {
      setHospitals([]);
    }
  }, [locationQuery]);

  const validateForm = () => {
    const errors = {};
    if (!newEvent.title) errors.title = 'Title is required';
    if (!newEvent.start) errors.start = 'Start date and time are required';
    if (!newEvent.end) errors.end = 'End date and time are required';
    if (!newEvent.desc) errors.desc = 'Description is required';
    return errors;
  };

  const handleAddEvent = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const id = events.length ? events[events.length - 1].id + 1 : 1;
    const newEventsList = [...events, { ...newEvent, id }];
    setEvents(newEvent.recurring ? [...newEventsList, ...generateRecurringEvents(newEvent)] : newEventsList);
    setNewEvent({ id: null, title: '', start: '', end: '', desc: '', type: 'checkup', doctor: '', location: '', recurring: false, notes: '', testResults: '' });
    setErrors({});
    onClose();
    toast({
      title: 'Appointment added.',
      description: 'Your appointment has been added successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const generateRecurringEvents = (event) => {
    const recurringEvents = [];
    const interval = 7; // Weekly recurrence
    for (let i = 1; i <= 10; i++) {
      const start = moment(event.start).add(i * interval, 'days').toDate();
      const end = moment(event.end).add(i * interval, 'days').toDate();
      recurringEvents.push({ ...event, start, end, id: event.id + i });
    }
    return recurringEvents;
  };

  const handleEditEvent = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setEvents(events.map(event => (event.id === newEvent.id ? newEvent : event)));
    setNewEvent({ id: null, title: '', start: '', end: '', desc: '', type: 'checkup', doctor: '', location: '', recurring: false, notes: '', testResults: '' });
    setErrors({});
    setIsEditing(false);
    onClose();
    toast({
      title: 'Appointment updated.',
      description: 'Your appointment has been updated successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDeleteEvent = id => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setEvents(events.filter(event => event.id !== id));
      setSelectedEvent(null);
      toast({
        title: 'Appointment canceled.',
        description: 'The appointment has been canceled successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    onOpen(); // Open details modal
  };

  const handleEditButtonClick = event => {
    setIsEditing(true);
    setNewEvent(event);
    onOpen();
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleStatusFilterChange = e => {
    setStatusFilter(e.target.value);
  };

  const handleLocationFilterChange = e => {
    setLocationFilter(e.target.value.toLowerCase());
  };

  const handleLocationQueryChange = e => {
    setLocationQuery(e.target.value);
  };

  const handleLocationSelect = location => {
    setNewEvent({ ...newEvent, location });
    onClose();
  };

  const filteredEvents = events
    .filter(event => filter === 'all' || event.type === filter)
    .filter(event => statusFilter === 'all' || event.status === statusFilter)
    .filter(event => !locationFilter || event.location.toLowerCase().includes(locationFilter))
    .filter(event => !searchQuery || event.title.toLowerCase().includes(searchQuery) || event.doctor.toLowerCase().includes(searchQuery) || event.location.toLowerCase().includes(searchQuery));

  return (
    <Box
      width="100vw"
      height="100vh"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      bg="gray.50"
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
        <Heading size="lg" mb={4}>Appointments</Heading>
        <Button onClick={() => { setIsEditing(false); setNewEvent({ id: null, title: '', start: '', end: '', desc: '', type: 'checkup', doctor: '', location: '', recurring: false, notes: '', testResults: '' }); onOpen(); }}>
          <AddIcon /> Add Appointment
        </Button>
        <Box mt={4} mb={4} display="flex" flexDirection="row" alignItems="center">
          <FormControl mb={4} display="flex" flexDirection="row" alignItems="center">
            <FormLabel htmlFor="search" mr={2}>Search:</FormLabel>
            <Input
              id="search"
              type="text"
              placeholder="Search by title, doctor, or location"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FormControl>
          <FormControl mb={4} display="flex" flexDirection="row" alignItems="center" ml={4}>
            <FormLabel htmlFor="filter" mr={2}>Filter by type:</FormLabel>
            <Select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              {Object.keys(eventColors).map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4} display="flex" flexDirection="row" alignItems="center" ml={4}>
            <FormLabel htmlFor="status" mr={2}>Status:</FormLabel>
            <Select id="status" value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </Select>
          </FormControl>
          <FormControl mb={4} display="flex" flexDirection="row" alignItems="center" ml={4}>
            <FormLabel htmlFor="locationFilter" mr={2}>Location:</FormLabel>
            <Input
              id="locationFilter"
              type="text"
              placeholder="Filter by location"
              value={locationFilter}
              onChange={handleLocationFilterChange}
            />
          </FormControl>
        </Box>
        <Box width="100%" height="80vh">
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            eventPropGetter={(event) => ({
              style: { backgroundColor: eventColors[event.type] || 'gray' },
            })}
          />
        </Box>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Edit Appointment' : 'Add Appointment'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                placeholder="Appointment title"
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              {errors.title && <Text color="red.500">{errors.title}</Text>}
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.start}>
              <FormLabel htmlFor="start">Start Date & Time</FormLabel>
              <Input
                id="start"
                type="datetime-local"
                value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                onChange={e => setNewEvent({ ...newEvent, start: e.target.value })}
              />
              {errors.start && <Text color="red.500">{errors.start}</Text>}
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.end}>
              <FormLabel htmlFor="end">End Date & Time</FormLabel>
              <Input
                id="end"
                type="datetime-local"
                value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                onChange={e => setNewEvent({ ...newEvent, end: e.target.value })}
              />
              {errors.end && <Text color="red.500">{errors.end}</Text>}
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.desc}>
              <FormLabel htmlFor="desc">Description</FormLabel>
              <Textarea
                id="desc"
                placeholder="Appointment description"
                value={newEvent.desc}
                onChange={e => setNewEvent({ ...newEvent, desc: e.target.value })}
              />
              {errors.desc && <Text color="red.500">{errors.desc}</Text>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="type">Type</FormLabel>
              <Select
                id="type"
                value={newEvent.type}
                onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                {Object.keys(eventColors).map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="doctor">Doctor</FormLabel>
              <Input
                id="doctor"
                type="text"
                placeholder="Doctor's name"
                value={newEvent.doctor}
                onChange={e => setNewEvent({ ...newEvent, doctor: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                type="text"
                placeholder="Search for a location"
                value={locationQuery}
                onChange={handleLocationQueryChange}
              />
              {isLoadingHospitals ? (
                <Text>Loading hospitals...</Text>
              ) : (
                hospitals.length > 0 && (
                  <Box>
                    {hospitals.map(hospital => (
                      <Box
                        key={hospital.place_id}
                        p={2}
                        borderWidth="1px"
                        borderRadius="md"
                        mb={2}
                        cursor="pointer"
                        onClick={() => handleLocationSelect(hospital.name)}
                      >
                        {hospital.name}
                      </Box>
                    ))}
                  </Box>
                )
              )}
            </FormControl>
            <FormControl mb={4}>
              <Checkbox
                isChecked={newEvent.recurring}
                onChange={e => setNewEvent({ ...newEvent, recurring: e.target.checked })}
              >
                Recurring
              </Checkbox>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="notes">Notes</FormLabel>
              <Textarea
                id="notes"
                placeholder="Additional notes"
                value={newEvent.notes}
                onChange={e => setNewEvent({ ...newEvent, notes: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="testResults">Test Results</FormLabel>
              <Textarea
                id="testResults"
                placeholder="Test results"
                value={newEvent.testResults}
                onChange={e => setNewEvent({ ...newEvent, testResults: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={isEditing ? handleEditEvent : handleAddEvent}>
              {isEditing ? 'Update' : 'Add'}
            </Button>
            <Button ml={3} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {selectedEvent && (
        <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Appointment Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text><strong>Title:</strong> {selectedEvent.title}</Text>
              <Text><strong>Start:</strong> {moment(selectedEvent.start).format('LLL')}</Text>
              <Text><strong>End:</strong> {moment(selectedEvent.end).format('LLL')}</Text>
              <Text><strong>Description:</strong> {selectedEvent.desc}</Text>
              <Text><strong>Type:</strong> {selectedEvent.type}</Text>
              <Text><strong>Doctor:</strong> {selectedEvent.doctor}</Text>
              <Text><strong>Location:</strong> {selectedEvent.location}</Text>
              <Text><strong>Recurring:</strong> {selectedEvent.recurring ? 'Yes' : 'No'}</Text>
              <Text><strong>Notes:</strong> {selectedEvent.notes}</Text>
              <Text><strong>Test Results:</strong> {selectedEvent.testResults}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                Cancel Appointment
              </Button>
              <Button ml={3} onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default CalendarView;

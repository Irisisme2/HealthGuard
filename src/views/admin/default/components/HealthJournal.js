import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  Stack,
  Textarea,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Flex,
  IconButton,
  Checkbox,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  RadioGroup,
  Radio,
  Select,
  Divider,
  Badge,
  Link,
  Image,
  Card as ChakraCard
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import TestDetailsModal from './TestDetailsModal'; // Import your TestDetailsModal component
import pill1 from 'assets/img/pill/pill1.png';
import pill2 from 'assets/img/pill/pill2.png';
import pill3 from 'assets/img/pill/pill3.png';

// Sample data
const sampleMedications = [
  { id: 1, name: 'Atorvastatin', icon: pill1 },
  { id: 2, name: 'Metformin', icon: pill2 },
  { id: 3, name: 'Ibuprofen', icon: pill3 },
];

const sampleTests = [
  { id: 1, name: 'Blood Test', doctor: 'Dr. Smith', date: '2024-08-15', visitId: 'VT12345', price: '$50', facility: 'Health Clinic A', booked: false },
  { id: 2, name: 'X-Ray', doctor: 'Dr. Johnson', date: '2024-08-20', visitId: 'VT12346', price: '$150', facility: 'Health Clinic B', booked: false },
];

const symptomsList = [
  { id: 'fever', label: '🌡️ Fever', category: 'Respiratory' },
  { id: 'cough', label: '🤧 Cough', category: 'Respiratory' },
  { id: 'sneezing', label: '💧 Sneezing', category: 'Respiratory' },
  { id: 'headache', label: '🤕 Headache', category: 'Neurological' },
  { id: 'fatigue', label: '😴 Fatigue', category: 'General' },
  { id: 'nausea', label: '🤢 Nausea', category: 'Digestive' },
];

const HealthJournal = () => {
  const [medications, setMedications] = useState(sampleMedications);
  const [takenMedications, setTakenMedications] = useState([]);
  const [note, setNote] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState({});
  const [symptomDetails, setSymptomDetails] = useState('');
  const [symptomSeverity, setSymptomSeverity] = useState('mild');
  const [symptomDuration, setSymptomDuration] = useState('');
  const [symptomCategory, setSymptomCategory] = useState('General');
  const [selectedTestDetails, setSelectedTestDetails] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOrdersOpen, onOpen: onOrdersOpen, onClose: onOrdersClose } = useDisclosure();
  const toast = useToast();

  const handleMedicationChange = (id) => {
    setTakenMedications(prev => {
      if (prev.includes(id)) {
        return prev.filter(medId => medId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleAddNote = () => {
    if (note && selectedMedication) {
      toast({
        title: 'Note Added',
        description: 'Your note has been recorded.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setNote('');
      setSelectedMedication(null);
    } else {
      toast({
        title: 'Incomplete Information',
        description: 'Please select a medication and add a note before saving.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddSymptom = () => {
    if (selectedSymptom.id && symptomDetails) {
      setSymptoms([
        ...symptoms,
        {
          id: Date.now(),
          text: selectedSymptom.label,
          details: symptomDetails,
          severity: symptomSeverity,
          duration: symptomDuration,
          category: symptomCategory,
        }
      ]);
      setSelectedSymptom({});
      setSymptomDetails('');
      setSymptomSeverity('mild');
      setSymptomDuration('');
      setSymptomCategory('General');
      toast({
        title: 'Symptom Added',
        description: 'Your symptom has been recorded.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Incomplete Information',
        description: 'Please select a symptom and add details before adding.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteSymptom = (id) => {
    setSymptoms(symptoms.filter(symptom => symptom.id !== id));
    toast({
      title: 'Symptom Removed',
      description: 'Your symptom has been removed.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  const openTestDetails = (test) => {
    setSelectedTestDetails(test);
    onOpen();
  };

  const handleBookTest = (test) => {
    toast({
      title: 'Test Booked',
      description: `Your appointment for ${test.name} has been booked.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setSelectedTestDetails({ ...test, booked: true });
    setIsBooking(false);
  };


  
  return (
    <Box p={6} maxW="2000px" mx="auto">
      <ChakraCard p={6} borderRadius="md" boxShadow="md" bg="white">
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          Health Journal
        </Text>
        <Tabs variant='enclosed' colorScheme="teal" isLazy>
          <TabList mb={4}>
            <Tab _selected={{ color: 'teal.500', borderBottom: '2px solid teal' }}>Medication Tracking</Tab>
            <Tab _selected={{ color: 'teal.500', borderBottom: '2px solid teal' }}>Symptom Monitoring</Tab>
            <Tab _selected={{ color: 'teal.500', borderBottom: '2px solid teal' }}>Tests to Be Done</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex direction="column" mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={4}>Medication Tracking</Text>
                <Stack spacing={4} mb={4}>
                  {medications.map(med => (
                    <ChakraCard key={med.id} p={4} borderRadius="md" boxShadow="md" bg="white" display="flex" alignItems="center">
                      <Image src={med.icon} alt={med.name} boxSize="40px" objectFit="cover" borderRadius="full" mr={4} />
                      <Text fontSize="md" flex="1">{med.name}</Text>
                      <Checkbox
                        isChecked={takenMedications.includes(med.id)}
                        onChange={() => handleMedicationChange(med.id)}
                      >
                        Taken Today
                      </Checkbox>
                    </ChakraCard>
                  ))}
                </Stack>
                <FormControl mb={4}>
                  <FormLabel>Select Medication for Note</FormLabel>
                  <Select
                    placeholder="Select medication"
                    value={selectedMedication ? selectedMedication.id : ''}
                    onChange={(e) => {
                      const med = medications.find(m => m.id === Number(e.target.value));
                      setSelectedMedication(med || null);
                    }}
                  >
                    {medications.map(med => (
                      <option key={med.id} value={med.id}>{med.name}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Note on Well-being or Symptoms</FormLabel>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add any notes here..."
                    size="sm"
                  />
                </FormControl>
                <Button
                  colorScheme="teal"
                  leftIcon={<AddIcon />}
                  onClick={handleAddNote}
                >
                  Add Note
                </Button>
              </Flex>
            </TabPanel>

            <TabPanel>
              <Flex direction="column" mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={4}>Symptom Monitoring</Text>
                <ChakraCard p={4} borderRadius="md" boxShadow="md" bg="white">
                  <FormControl mb={4}>
                    <FormLabel>Select Symptom</FormLabel>
                    <Select
                      placeholder="Select symptom"
                      value={selectedSymptom.id || ''}
                      onChange={(e) => {
                        const symptom = symptomsList.find(s => s.id === e.target.value);
                        setSelectedSymptom(symptom || {});
                      }}
                    >
                      {symptomsList.map(symptom => (
                        <option key={symptom.id} value={symptom.id}>{symptom.label}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Details</FormLabel>
                    <Textarea
                      value={symptomDetails}
                      onChange={(e) => setSymptomDetails(e.target.value)}
                      placeholder="Describe your symptom..."
                      size="sm"
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Severity</FormLabel>
                    <RadioGroup onChange={setSymptomSeverity} value={symptomSeverity}>
                      <HStack spacing={4}>
                        <Radio value="mild">Mild</Radio>
                        <Radio value="moderate">Moderate</Radio>
                        <Radio value="severe">Severe</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Duration</FormLabel>
                    <Input
                      value={symptomDuration}
                      onChange={(e) => setSymptomDuration(e.target.value)}
                      placeholder="How long has it lasted?"
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={symptomCategory}
                      onChange={(e) => setSymptomCategory(e.target.value)}
                    >
                      <option value="General">General</option>
                      <option value="Respiratory">Respiratory</option>
                      <option value="Neurological">Neurological</option>
                      <option value="Digestive">Digestive</option>
                    </Select>
                  </FormControl>
                  <Button
                    colorScheme="teal"
                    leftIcon={<AddIcon />}
                    onClick={handleAddSymptom}
                  >
                    Add Symptom
                  </Button>
                  <Stack spacing={4} mt={4}>
                    {symptoms.map(symptom => (
                      <Flex key={symptom.id} p={4} borderWidth="1px" borderRadius="md" bg="white" alignItems="center">
                        <Stack spacing={2} flex="1">
                          <Text fontSize="md" fontWeight="bold">{symptom.text}</Text>
                          <Text fontSize="sm" color="gray.600">Details: {symptom.details}</Text>
                          <Text fontSize="sm" color="gray.600">Severity: {symptom.severity}</Text>
                          <Text fontSize="sm" color="gray.600">Duration: {symptom.duration}</Text>
                          <Text fontSize="sm" color="gray.600">Category: {symptom.category}</Text>
                        </Stack>
                        <IconButton
                          icon={<DeleteIcon />}
                          aria-label="Delete Symptom"
                          colorScheme="red"
                          onClick={() => handleDeleteSymptom(symptom.id)}
                        />
                      </Flex>
                    ))}
                  </Stack>
                </ChakraCard>
              </Flex>
            </TabPanel>

            <TabPanel>
              <Flex direction="column" mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={4}>Tests to Be Done</Text>
                <ChakraCard p={4} borderRadius="md" boxShadow="md" bg="white">
                  <Stack spacing={4}>
                    {sampleTests.map(test => (
                      <Flex key={test.id} p={4} borderWidth="1px" borderRadius="md" bg="white" alignItems="center" justifyContent="space-between">
                        <Stack spacing={2}>
                          <Text fontSize="md" fontWeight="bold">{test.name}</Text>
                          <Text fontSize="sm" color="gray.600">Doctor: {test.doctor}</Text>
                          <Text fontSize="sm" color="gray.600">Date: {test.date}</Text>
                          <Text fontSize="sm" color="gray.600">Facility: {test.facility}</Text>
                          <Text fontSize="sm" color="gray.600">Price: {test.price}</Text>
                        </Stack>
                        <HStack spacing={2}>
                          {!test.booked ? (
                            <Button
                              colorScheme="teal"
                              size="sm"
                              onClick={() => handleBookTest(test)}
                            >
                              Book Appointment
                            </Button>
                          ) : (
                            <Badge colorScheme="green">Booked</Badge>
                          )}
                          <IconButton
                            icon={<InfoOutlineIcon />}
                            aria-label="View Test Details"
                            variant="outline"
                            size="sm"
                            onClick={() => openTestDetails(test)}
                          />
                        </HStack>
                      </Flex>
                    ))}
                  </Stack>
                </ChakraCard>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Test Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedTestDetails && <TestDetailsModal test={selectedTestDetails} />}
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOrdersOpen} onClose={onOrdersClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Automatic Orders</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>No automatic orders available.</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraCard>
    </Box>
  );
};

export default HealthJournal;
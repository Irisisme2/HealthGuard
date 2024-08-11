import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Checkbox,
  Stack,
  Select,
  FormControl,
  FormLabel,
  useToast,
  useColorMode,
  useColorModeValue,
  IconButton
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon, DownloadIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import Card from "components/card/Card.js";
import pill1 from 'assets/img/pill/pill1.png';
import pill2 from 'assets/img/pill/pill2.png';
import pill3 from 'assets/img/pill/pill3.png';
import pill4 from 'assets/img/pill/pill4.png';
import pill5 from 'assets/img/pill/pill5.png';
import pill6 from 'assets/img/pill/pill6.png';

const exampleMedications = [
  {
    image: pill1,
    name: "Aspirin",
    dosage: "1 tablet daily",
    expirationDate: "2025-12-31",
    remainingDoses: 30,
    prescribedBy: "Dr. John Doe",
    condition: "Headache",
    sideEffects: "Nausea, dizziness",
    instructions: "Take with food to avoid stomach upset.",
    warnings: "Do not use if you have a history of gastrointestinal bleeding.",
  },
  {
    image: pill2,
    name: "Lisinopril",
    dosage: "1 tablet in the morning",
    expirationDate: "2024-06-15",
    remainingDoses: 60,
    prescribedBy: "Dr. Jane Smith",
    condition: "High blood pressure",
    sideEffects: "Cough, headache",
    instructions: "Take consistently at the same time each day.",
    warnings: "May cause dizziness; avoid driving until you know how it affects you.",
  },
  {
    image: pill3,
    name: "Metformin",
    dosage: "2 tablets with dinner",
    expirationDate: "2026-01-30",
    remainingDoses: 90,
    prescribedBy: "Dr. Emily White",
    condition: "Type 2 diabetes",
    sideEffects: "Upset stomach, diarrhea",
    instructions: "Monitor blood sugar levels regularly.",
    warnings: "Inform your doctor if you experience severe abdominal pain.",
  },
  {
    image: pill4,
    name: "Ibuprofen",
    dosage: "1-2 tablets every 4-6 hours as needed",
    expirationDate: "2024-11-20",
    remainingDoses: 40,
    prescribedBy: "Dr. Mark Johnson",
    condition: "Pain relief",
    sideEffects: "Stomach pain, heartburn",
    instructions: "Do not exceed 6 tablets in 24 hours.",
    warnings: "Not recommended for people with kidney issues.",
  },
  {
    image: pill5,
    name: "Simvastatin",
    dosage: "1 tablet at bedtime",
    expirationDate: "2025-05-10",
    remainingDoses: 90,
    prescribedBy: "Dr. Alice Brown",
    condition: "High cholesterol",
    sideEffects: "Muscle pain, headache",
    instructions: "Avoid grapefruit juice while taking this medication.",
    warnings: "Report any unexplained muscle pain to your doctor.",
  },
  {
    image: pill6,
    name: "Lorazepam",
    dosage: "1 tablet before bedtime",
    expirationDate: "2024-09-25",
    remainingDoses: 20,
    prescribedBy: "Dr. Michael Green",
    condition: "Anxiety",
    sideEffects: "Drowsiness, dizziness",
    instructions: "Do not consume alcohol while on this medication.",
    warnings: "May impair your ability to perform tasks requiring alertness.",
  }
];

const MyMedications = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [medicationsPerPage] = useState(5);
  const [medications, setMedications] = useState(exampleMedications);
  const [isEditing, setIsEditing] = useState(false);
  const [newMedication, setNewMedication] = useState({
    image: "",
    name: "",
    dosage: "",
    expirationDate: "",
    remainingDoses: "",
    prescribedBy: "",
    condition: "",
    sideEffects: "",
    instructions: "",
    warnings: "",
  });

  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const tableBg = useColorModeValue("gray.50", "gray.700");

  // Pagination logic
  const indexOfLastMed = currentPage * medicationsPerPage;
  const indexOfFirstMed = indexOfLastMed - medicationsPerPage;
  const currentMedications = medications
    .filter(med =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "expirationDate") return new Date(a.expirationDate) - new Date(b.expirationDate);
      if (sortKey === "remainingDoses") return a.remainingDoses - b.remainingDoses;
    })
    .slice(indexOfFirstMed, indexOfLastMed);

  const handleViewDetails = (med) => {
    setSelectedMedication(med);
    onOpen();
  };

  const handleAddOrEditMedication = () => {
    if (isEditing) {
      setMedications(meds =>
        meds.map(med =>
          med.name === newMedication.name ? newMedication : med
        )
      );
      toast({
        title: "Medication updated.",
        description: "The medication has been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setMedications(meds => [...meds, newMedication]);
      toast({
        title: "Medication added.",
        description: "The medication has been added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  const handleImportCSV = (event) => {
    // CSV import logic
  };

  return (
    <Card>
      <VStack spacing={4} align="stretch">
        <HStack spacing={4} mb={4} justify="space-between">
          <Input
            placeholder="Search medications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="auto"
          />
          <Select
            placeholder="Sort by"
            onChange={(e) => setSortKey(e.target.value)}
            width="auto"
          >
            <option value="name">Name</option>
            <option value="expirationDate">Expiration Date</option>
            <option value="remainingDoses">Remaining Doses</option>
          </Select>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={() => {
              setIsEditing(false);
              setNewMedication({
                image: "",
                name: "",
                dosage: "",
                expirationDate: "",
                remainingDoses: "",
                prescribedBy: "",
                condition: "",
                sideEffects: "",
                instructions: "",
                warnings: "",
              });
              onOpen();
            }}
          >
            Add Medication
          </Button>
        </HStack>

        <VStack spacing={4} align="stretch">
          {currentMedications.map((med, index) => (
            <Box
              key={index}
              borderWidth={1}
              borderRadius="md"
              p={4}
              bg={tableBg}
              shadow="md"
              _hover={{ bg: 'gray.100' }}
              transition="background-color 0.2s ease"
              borderColor={tableBg}
              position="relative"
            >
              <HStack spacing={4}>
                <Image boxSize="60px" src={med.image || pill1} alt={med.name} />
                <VStack align="start" spacing={1} flex="1">
                  <Text fontWeight="bold">{med.name}</Text>
                  <Text fontSize="sm">Dosage: {med.dosage}</Text>
                  <Text fontSize="sm">Expiration: {med.expirationDate}</Text>
                  <Text fontSize="sm">Remaining: {med.remainingDoses}</Text>
                </VStack>
                <HStack spacing={2} position="absolute" top={2} right={2}>
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit medication"
                    size="sm"
                    onClick={() => {
                      setIsEditing(true);
                      setNewMedication(med);
                      onOpen();
                    }}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete medication"
                    size="sm"
                    onClick={() => {
                      setMedications(meds => meds.filter(m => m !== med));
                      toast({
                        title: "Medication deleted.",
                        description: "The medication has been deleted.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  />
                </HStack>
                <Button
                  position="absolute"
                  bottom={2}
                  right={2}
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleViewDetails(med)}
                >
                  View Details
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>

        <HStack spacing={4} mt={4} justify="space-between">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Text>Page {currentPage}</Text>
          <Button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={indexOfLastMed >= medications.length}
          >
            Next
          </Button>
        </HStack>

        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Button
            as="label"
            htmlFor="import-csv"
            leftIcon={<DownloadIcon />}
            colorScheme="green"
          >
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              hidden
              id="import-csv"
            />
          </Button>
          <Button onClick={toggleColorMode} leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}>
            Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
          </Button>
        </HStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isEditing ? "Edit Medication" : "Add Medication"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Medication Name</FormLabel>
                  <Input
                    value={newMedication.name}
                    onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                    placeholder="Enter medication name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Dosage</FormLabel>
                  <Input
                    value={newMedication.dosage}
                    onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                    placeholder="Enter dosage"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Expiration Date</FormLabel>
                  <Input
                    type="date"
                    value={newMedication.expirationDate}
                    onChange={(e) => setNewMedication({ ...newMedication, expirationDate: e.target.value })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Remaining Doses</FormLabel>
                  <Input
                    type="number"
                    value={newMedication.remainingDoses}
                    onChange={(e) => setNewMedication({ ...newMedication, remainingDoses: e.target.value })}
                    placeholder="Enter remaining doses"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Prescribed By</FormLabel>
                  <Input
                    value={newMedication.prescribedBy}
                    onChange={(e) => setNewMedication({ ...newMedication, prescribedBy: e.target.value })}
                    placeholder="Enter doctor's name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Condition</FormLabel>
                  <Input
                    value={newMedication.condition}
                    onChange={(e) => setNewMedication({ ...newMedication, condition: e.target.value })}
                    placeholder="Enter condition"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Side Effects</FormLabel>
                  <Input
                    value={newMedication.sideEffects}
                    onChange={(e) => setNewMedication({ ...newMedication, sideEffects: e.target.value })}
                    placeholder="Enter side effects"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Instructions</FormLabel>
                  <Input
                    value={newMedication.instructions}
                    onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                    placeholder="Enter any special instructions"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Warnings</FormLabel>
                  <Input
                    value={newMedication.warnings}
                    onChange={(e) => setNewMedication({ ...newMedication, warnings: e.target.value })}
                    placeholder="Enter warnings"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleAddOrEditMedication}>
                {isEditing ? "Save" : "Add"}
              </Button>
              <Button onClick={onClose} ml={3}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Card>
  );
};

export default MyMedications;
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
  useColorMode,
  useColorModeValue,
  Checkbox,
  Textarea,
  Grid,
  GridItem,
  Flex,
  IconButton,
  Image,
  Collapse
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon, InfoIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import Card from "components/card/Card.js";
import pill1 from 'assets/img/pill/pill1.png';
import pill2 from 'assets/img/pill/pill2.png';
import pill3 from 'assets/img/pill/pill3.png';
import pill4 from 'assets/img/pill/pill4.png';
import pill5 from 'assets/img/pill/pill5.png';
import pill6 from 'assets/img/pill/pill6.png';

// Example data for medications and reminders
const exampleMedications = [
  { name: "Aspirin", image: pill1 },
  { name: "Lisinopril", image: pill2 },
  // Add more example medications as needed
];

const exampleReminders = [
  { medication: "Aspirin", time: "08:00 AM", type: "App Notification", status: "Active", notes: "Take with food.", id: 1 },
  { medication: "Lisinopril", time: "08:00 AM", type: "Email", status: "Active", notes: "Avoid potassium-rich foods.", id: 2 },
  // Add more example reminders as needed
];

const ReminderCard = ({ reminder, onEdit, onDelete, onToggleStatus }) => {
  const { medication, time, type, status, notes } = reminder;
  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <GridItem
      borderWidth={1}
      borderRadius="md"
      p={4}
      bg={bgColor}
      shadow="md"
      position="relative"
      _hover={{ shadow: "lg", cursor: "pointer" }}
    >
      <Flex align="center">
        <Image boxSize="60px" src={exampleMedications.find(med => med.name === medication)?.image || pill1} alt={medication} borderRadius="full" />
        <VStack align="start" ml={4} spacing={2} flex="1">
          <Text fontWeight="bold" fontSize="lg">{medication}</Text>
          <Text fontSize="md">Time: {time}</Text>
          <Text fontSize="md">Type: {type}</Text>
          <Text fontSize="md">Status: {status}</Text>
          <Text fontSize="sm" noOfLines={2}>{notes}</Text>
        </VStack>
        <HStack spacing={2} ml={4}>
          <IconButton
            icon={<InfoIcon />}
            aria-label="View details"
            size="sm"
            onClick={() => onEdit(reminder)}
          />
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit reminder"
            size="sm"
            onClick={() => onEdit(reminder)}
          />
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete reminder"
            size="sm"
            onClick={() => onDelete(reminder)}
          />
          <Button
            size="sm"
            mt={2}
            colorScheme={status === "Active" ? "blue" : "green"}
            onClick={() => onToggleStatus(reminder)}
          >
            {status === "Active" ? "Mark Completed" : "Mark Active"}
          </Button>
        </HStack>
      </Flex>
    </GridItem>
  );
};

const MedicationReminders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reminders, setReminders] = useState(exampleReminders);
  const [newReminder, setNewReminder] = useState({
    medication: "",
    time: "",
    type: "App Notification",
    notes: "",
    recurring: false,
    recurrenceInterval: "daily",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showHistory, setShowHistory] = useState(false);
  const [reminderHistory, setReminderHistory] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.700");

  const toast = useToast();

  // Filter reminders based on search and status
  const filteredReminders = reminders
    .filter(rem =>
      (selectedStatus === "All" || rem.status === selectedStatus) &&
      (rem.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
       rem.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleAddOrEditReminder = () => {
    if (isEditing) {
      setReminders(reminders.map(rem =>
        rem.id === newReminder.id ? newReminder : rem
      ));
      toast({
        title: "Reminder updated.",
        description: "The reminder has been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setReminders([...reminders, { ...newReminder, id: Date.now(), status: "Active" }]);
      toast({
        title: "Reminder added.",
        description: "The reminder has been added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  const handleDeleteReminder = (reminder) => {
    setReminders(reminders.filter(r => r.id !== reminder.id));
    setReminderHistory([...reminderHistory, { ...reminder, action: "Deleted", date: new Date().toLocaleString() }]);
    toast({
      title: "Reminder deleted.",
      description: "The reminder has been deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleToggleStatus = (reminder) => {
    setReminders(reminders.map(r =>
      r.id === reminder.id ? { ...r, status: r.status === "Active" ? "Completed" : "Active" } : r
    ));
    toast({
      title: "Reminder status updated.",
      description: `The reminder status is now ${reminder.status === "Active" ? "Completed" : "Active"}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card>
      <VStack spacing={4} align="stretch" h="full">
        <Heading size="lg">Medication Reminders</Heading>
        <Text>Set reminders to remember to take your medications regularly.</Text>

        <VStack spacing={4} mb={4}>
          <Input
            placeholder="Search reminders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            placeholder="Filter by status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Expired">Expired</option>
          </Select>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={() => {
              setIsEditing(false);
              setNewReminder({
                medication: "",
                time: "",
                type: "App Notification",
                notes: "",
                recurring: false,
                recurrenceInterval: "daily",
              });
              onOpen();
            }}
          >
            Add Reminder
          </Button>
        </VStack>

        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
          {filteredReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onEdit={(rem) => {
                setIsEditing(true);
                setNewReminder(rem);
                onOpen();
              }}
              onDelete={handleDeleteReminder}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </Grid>

        <Collapse in={showHistory}>
          <Box mt={4}>
            <Heading size="md">Reminder History</Heading>
            <VStack spacing={2} mt={2}>
              {reminderHistory.map((history, index) => (
                <Box key={index} p={4} borderWidth={1} borderRadius="md" bg={bgColor}>
                  <Text fontWeight="bold">{history.medication}</Text>
                  <Text>Action: {history.action}</Text>
                  <Text>Date: {history.date}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </Collapse>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isEditing ? "Edit Reminder" : "Add Reminder"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Select Medication</FormLabel>
                  <Select
                    value={newReminder.medication}
                    onChange={(e) => setNewReminder({ ...newReminder, medication: e.target.value })}
                    placeholder="Select medication"
                  >
                    {exampleMedications.map((med, index) => (
                      <option key={index} value={med.name}>
                        {med.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Reminder Time</FormLabel>
                  <Input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Reminder Type</FormLabel>
                  <Select
                    value={newReminder.type}
                    onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}
                  >
                    <option value="App Notification">App Notification</option>
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Notes</FormLabel>
                  <Textarea
                    value={newReminder.notes}
                    onChange={(e) => setNewReminder({ ...newReminder, notes: e.target.value })}
                    placeholder="Additional notes or instructions"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Recurring Reminder</FormLabel>
                  <Checkbox
                    isChecked={newReminder.recurring}
                    onChange={(e) => setNewReminder({ ...newReminder, recurring: e.target.checked })}
                  >
                    Repeat Reminder
                  </Checkbox>
                  {newReminder.recurring && (
                    <Select
                      value={newReminder.recurrenceInterval}
                      onChange={(e) => setNewReminder({ ...newReminder, recurrenceInterval: e.target.value })}
                      mt={2}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </Select>
                  )}
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleAddOrEditReminder}>
                {isEditing ? "Save Changes" : "Add Reminder"}
              </Button>
              <Button onClick={onClose} ml={3}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <HStack spacing={4} mt={4} justifyContent="space-between" borderTopWidth="1px" borderTopColor="gray.200" pt={4}>
          <Button
            onClick={() => setShowHistory(!showHistory)}
            colorScheme={showHistory ? "blue" : "gray"}
          >
            {showHistory ? "Hide History" : "Show History"}
          </Button>
          <Button onClick={toggleColorMode} leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}>
            Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export default MedicationReminders;

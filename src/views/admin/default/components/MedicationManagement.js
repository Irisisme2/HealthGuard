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
  IconButton,
  Switch,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  Flex,
  Image,
  Stack,
  Tooltip
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, CheckIcon, CloseIcon, InfoIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import pill1 from 'assets/img/pill/pill1.png';
import pill2 from 'assets/img/pill/pill2.png';
import pill3 from 'assets/img/pill/pill3.png';

const initialMedications = [
  { id: 1, name: 'Atorvastatin', dosage: '10mg', frequency: 'Once a day', icon: pill1 },
  { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice a day', icon: pill2 },
];

const initialOrders = [
  { id: 1, name: 'Atorvastatin', status: 'Shipped', icon: pill1 },
  { id: 2, name: 'Metformin', status: 'Pending', icon: pill2 },
];

const MedicationManagement = () => {
  const [medications, setMedications] = useState(initialMedications);
  const [orders, setOrders] = useState(initialOrders);
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', icon: pill3 });
  const [editingMedication, setEditingMedication] = useState(null);
  const [autoOrderEnabled, setAutoOrderEnabled] = useState(false);
  const [isAddMedicationModalOpen, setIsAddMedicationModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const toast = useToast();

  const handleAddMedication = () => {
    setMedications([...medications, { id: medications.length + 1, ...newMedication }]);
    setNewMedication({ name: '', dosage: '', frequency: '', icon: pill3 });
    setIsAddMedicationModalOpen(false);
    toast({
      title: 'Medication Added',
      description: 'New medication has been added to your list.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDeleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
    toast({
      title: 'Medication Deleted',
      description: 'Medication has been removed from your list.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleEditMedication = (med) => {
    setEditingMedication(med);
  };

  const handleSaveEdit = () => {
    setMedications(medications.map(med => (med.id === editingMedication.id ? editingMedication : med)));
    setEditingMedication(null);
    toast({
      title: 'Medication Updated',
      description: 'Medication details have been updated.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleAutoOrderToggle = () => {
    setAutoOrderEnabled(!autoOrderEnabled);
    toast({
      title: 'Auto Order Updated',
      description: `Auto order has been ${autoOrderEnabled ? 'disabled' : 'enabled'}.`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={8} align="stretch">
     
      <Card p={6} borderRadius="lg" shadow="lg" position="relative">
        <Text fontSize="2xl" mb={4} fontWeight="bold">Current Medications</Text>
        <Tooltip label="View Automatic Orders" aria-label="View Automatic Orders">
          <IconButton
            icon={<InfoIcon />}
            aria-label="Info"
            position="absolute"
            top={4}
            right={4}
            onClick={() => setIsInfoModalOpen(true)}
            variant="outline"
          />
        </Tooltip>
        <Stack spacing={4}>
          {medications.map(med => (
            <Card key={med.id} p={4} borderRadius="lg" shadow="md">
              <Flex alignItems="center">
                <Image boxSize="40px" src={med.icon} alt={med.name} mr={4} />
                <Box flex="1">
                  {editingMedication && editingMedication.id === med.id ? (
                    <>
                      <FormControl id={`medName-${med.id}`} isRequired>
                        <Input
                          value={editingMedication.name}
                          onChange={(e) => setEditingMedication({ ...editingMedication, name: e.target.value })}
                        />
                      </FormControl>
                      <FormControl id={`medDosage-${med.id}`} isRequired>
                        <Input
                          value={editingMedication.dosage}
                          onChange={(e) => setEditingMedication({ ...editingMedication, dosage: e.target.value })}
                        />
                      </FormControl>
                      <FormControl id={`medFrequency-${med.id}`} isRequired>
                        <Input
                          value={editingMedication.frequency}
                          onChange={(e) => setEditingMedication({ ...editingMedication, frequency: e.target.value })}
                        />
                      </FormControl>
                    </>
                  ) : (
                    <>
                      <Text fontSize="lg" fontWeight="bold">{med.name}</Text>
                      <Text fontSize="sm">{med.dosage} - {med.frequency}</Text>
                    </>
                  )}
                </Box>
                {editingMedication && editingMedication.id === med.id ? (
                  <HStack spacing={2}>
                    <IconButton
                      icon={<CheckIcon />}
                      aria-label="Save"
                      variant="outline"
                      onClick={handleSaveEdit}
                    />
                    <IconButton
                      icon={<CloseIcon />}
                      aria-label="Cancel"
                      variant="outline"
                      onClick={() => setEditingMedication(null)}
                    />
                  </HStack>
                ) : (
                  <HStack spacing={2}>
                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Edit"
                      variant="outline"
                      onClick={() => handleEditMedication(med)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Delete"
                      variant="outline"
                      onClick={() => handleDeleteMedication(med.id)}
                    />
                  </HStack>
                )}
              </Flex>
            </Card>
          ))}
        </Stack>
        <Button
          colorScheme="teal"
          leftIcon={<AddIcon />}
          onClick={() => setIsAddMedicationModalOpen(true)}
          mt={6}
        >
          Add New Medication
        </Button>
      </Card>

      {/* Add Medication Modal */}
      <Modal isOpen={isAddMedicationModalOpen} onClose={() => setIsAddMedicationModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Medication</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="medicationName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Medication Name"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                />
              </FormControl>
              <FormControl id="dosage" isRequired>
                <FormLabel>Dosage</FormLabel>
                <Input
                  placeholder="Dosage"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                />
              </FormControl>
              <FormControl id="frequency" isRequired>
                <FormLabel>Frequency</FormLabel>
                <Input
                  placeholder="Frequency"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                />
              </FormControl>
              <FormControl id="icon" isRequired>
                <FormLabel>Icon</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = (e) => setNewMedication({ ...newMedication, icon: e.target.result });
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsAddMedicationModalOpen(false)}>Cancel</Button>
            <Button colorScheme="teal" onClick={handleAddMedication} ml={3}>Add Medication</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Automatic Orders Modal */}
      <Modal isOpen={isOrdersModalOpen} onClose={() => setIsOrdersModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Automatic Orders</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {orders.map(order => (
                <Card key={order.id} p={4} borderRadius="lg" shadow="md">
                  <Flex alignItems="center">
                    <Image boxSize="40px" src={order.icon} alt={order.name} mr={4} />
                    <Box flex="1">
                      <Text fontSize="lg" fontWeight="bold">{order.name}</Text>
                      <Text fontSize="sm" color="gray.500">{order.status}</Text>
                    </Box>
                  </Flex>
                </Card>
              ))}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOrdersModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Info Modal for Automatic Orders */}
      <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Automatic Orders Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Automatic orders ensure that you never run out of your essential medications.
              Here you can view the current status of your automatic orders and manage them accordingly.
            </Text>
            <Button
              colorScheme="teal"
              leftIcon={<InfoIcon />}
              mt={4}
              onClick={() => setIsOrdersModalOpen(true)}
            >
              View Automatic Orders
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsInfoModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default MedicationManagement;

import React, { useState } from 'react';
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
  IconButton,
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
  Select,
  FormControl,
  FormLabel,
  useToast,
  useColorMode,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Divider
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, CheckIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';
import pill1 from 'assets/img/pill/pill1.png';
import pill2 from 'assets/img/pill/pill2.png';
import pill3 from 'assets/img/pill/pill3.png';

const exampleOrders = [
  { image: pill1, name: 'Aspirin', frequency: 'Monthly', nextOrderDate: '2024-09-01' },
  { image: pill2, name: 'Ibuprofen', frequency: 'Every 3 Months', nextOrderDate: '2024-11-01' },
  { image: pill3, name: 'Paracetamol', frequency: 'Monthly', nextOrderDate: '2024-09-15' },
];

const AutomaticOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [medication, setMedication] = useState("");
  const [frequency, setFrequency] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orders, setOrders] = useState(exampleOrders);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ordersPerPage = 5;
  const toast = useToast();
  const { colorMode } = useColorMode();
  const tableBg = useColorModeValue('gray.50', 'gray.700');
  const buttonColor = useColorModeValue('teal', 'blue');

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders
    .filter(order => order.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstOrder, indexOfLastOrder);

  const handleSaveOrder = () => {
    if (isEditing) {
      setOrders(orders.map(order =>
        order.name === editingOrder.name ? { ...editingOrder, frequency, nextOrderDate: new Date().toISOString().split('T')[0] } : order
      ));
      toast({
        title: 'Order Updated',
        description: 'The automatic order has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setOrders([...orders, { image: pill1, name: medication, frequency, nextOrderDate: new Date().toISOString().split('T')[0] }]);
      toast({
        title: 'Order Added',
        description: 'The automatic order has been added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  const handleEditOrder = (order) => {
    setIsEditing(true);
    setEditingOrder(order);
    setMedication(order.name);
    setFrequency(order.frequency);
    onOpen();
  };

  const handleDeleteOrder = (order) => {
    setOrders(orders.filter(o => o !== order));
    toast({
      title: 'Order Deleted',
      description: 'The automatic order has been removed successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Automatic Orders</Heading>
        <Text mb={4} fontSize="lg">
          Manage your automatic orders easily. Add, edit, or delete orders as needed.
        </Text>

        <HStack spacing={4} mb={4} align="center" justify="space-between">
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input
              type="text"
              placeholder="Search by medication"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button
            leftIcon={<AddIcon />}
            colorScheme={buttonColor}
            onClick={() => {
              setIsEditing(false);
              setMedication('');
              setFrequency('');
              setAddress('');
              setPaymentMethod('');
              onOpen();
            }}
            size="lg"
          >
            Add Order
          </Button>
        </HStack>

        <Box w="full" overflowX="auto">
          <Table variant="striped" colorScheme="teal" bg={tableBg}>
            <Thead>
              <Tr>
                <Th>Medication</Th>
                <Th>Frequency</Th>
                <Th>Next Order Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentOrders.map((order, index) => (
                <Tr key={index}>
                  <Td>
                    <HStack spacing={3}>
                      <Image boxSize="40px" src={order.image} alt={order.name} />
                      <Text>{order.name}</Text>
                    </HStack>
                  </Td>
                  <Td>{order.frequency}</Td>
                  <Td>{order.nextOrderDate}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit order"
                        size="sm"
                        onClick={() => handleEditOrder(order)}
                        colorScheme="blue"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete order"
                        size="sm"
                        onClick={() => handleDeleteOrder(order)}
                        colorScheme="red"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <HStack spacing={4} justifyContent="space-between" mt={4}>
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            colorScheme={buttonColor}
          >
            Previous
          </Button>
          <Text>Page {currentPage}</Text>
          <Button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={indexOfLastOrder >= orders.length}
            colorScheme={buttonColor}
          >
            Next
          </Button>
        </HStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isEditing ? 'Edit Automatic Order' : 'Add Automatic Order'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Medication Name</FormLabel>
                  <Input
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                    placeholder="Enter medication name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Order Frequency</FormLabel>
                  <Select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="Select frequency"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Every 3 Months">Every 3 Months</option>
                    <option value="Every 6 Months">Every 6 Months</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Delivery Address</FormLabel>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter delivery address"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="Select payment method"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme={buttonColor} onClick={handleSaveOrder} rightIcon={<CheckIcon />}>
                {isEditing ? 'Save Changes' : 'Add Order'}
              </Button>
              <Button onClick={onClose} ml={3} rightIcon={<CloseIcon />}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Card>
  );
};

export default AutomaticOrders;

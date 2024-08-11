import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Select,
  Stack,
  Flex,
  Badge,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Divider
} from '@chakra-ui/react';
import { ViewIcon, SearchIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';
import pill1 from 'assets/img/pill/pill1.png';
import pill2 from 'assets/img/pill/pill2.png';
import pill3 from 'assets/img/pill/pill3.png';
import pill4 from 'assets/img/pill/pill4.png';
import pill5 from 'assets/img/pill/pill5.png';
import pill6 from 'assets/img/pill/pill6.png';

const exampleOrders = [
  {
    image: pill1,
    name: 'Aspirin',
    orderDate: '2024-07-15',
    status: 'Completed',
    orderId: 'ORD123456',
    amount: '$20.00',
    deliveryAddress: '123 Main St, Springfield',
    note: '',
  },
  {
    image: pill2,
    name: 'Ibuprofen',
    orderDate: '2024-08-01',
    status: 'In Progress',
    orderId: 'ORD123457',
    amount: '$15.00',
    deliveryAddress: '456 Elm St, Springfield',
    note: '',
  },
  {
    image: pill3,
    name: 'Paracetamol',
    orderDate: '2024-08-10',
    status: 'Completed',
    orderId: 'ORD123458',
    amount: '$25.00',
    deliveryAddress: '789 Oak St, Springfield',
    note: '',
  },
  // Add more orders as needed
];

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [note, setNote] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const tableBg = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const headerColor = useColorModeValue('gray.600', 'gray.300');

  // Filtering and sorting logic
  const filteredOrders = exampleOrders
    .filter(order =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || order.status === statusFilter)
    )
    .sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Card>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Order History</Heading>
        <Text mb={4} fontSize="lg" color={textColor}>
          Browse through your medication order history.
        </Text>

        <HStack spacing={4} mb={6} align="center" wrap="wrap">
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input
              placeholder="Search medication"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="md"
              width={{ base: "full", md: "300px" }}
            />
          </InputGroup>
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            width={{ base: "full", md: "200px" }}
          >
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </Select>
          <Select
            placeholder="Sort by date"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            width={{ base: "full", md: "200px" }}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </Select>
        </HStack>

        <VStack spacing={4} align="stretch">
          {currentOrders.map((order, index) => (
            <Box
              key={index}
              borderWidth={1}
              borderRadius="md"
              p={4}
              bg={tableBg}
              shadow="md"
              _hover={{ bg: 'gray.100' }}
              transition="background-color 0.2s ease"
              onClick={() => {
                setSelectedOrder(order);
                setNote(order.note);
                onOpen();
              }}
            >
              <HStack spacing={4}>
                <Image boxSize="60px" src={order.image} alt={order.name} />
                <VStack align="start" spacing={1} flex="1">
                  <Text fontWeight="bold" color={textColor}>{order.name}</Text>
                  <Text color={textColor}>Order Date: {order.orderDate}</Text>
                  <Badge colorScheme={order.status === 'Completed' ? 'green' : 'yellow'}>
                    {order.status}
                  </Badge>
                </VStack>
                <Button
                  colorScheme="blue"
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the card click from opening the modal
                    setSelectedOrder(order);
                    setNote(order.note);
                    onOpen();
                  }}
                >
                  <ViewIcon />
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>

        <Flex justify="space-between" mt={4} align="center">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            colorScheme="teal"
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            colorScheme="teal"
          >
            Next
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedOrder && (
                <Stack spacing={4}>
                  <HStack spacing={3}>
                    <Image boxSize="80px" src={selectedOrder.image} alt={selectedOrder.name} />
                    <VStack align="start">
                      <Text fontWeight="bold">{selectedOrder.name}</Text>
                      <Text>Order Date: {selectedOrder.orderDate}</Text>
                      <Text>Status: {selectedOrder.status}</Text>
                      <Text>Amount: {selectedOrder.amount}</Text>
                      <Text>Delivery Address: {selectedOrder.deliveryAddress}</Text>
                      <Text>Order ID: {selectedOrder.orderId}</Text>
                      <FormControl>
                        <FormLabel>Note</FormLabel>
                        <Input
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </FormControl>
                    </VStack>
                  </HStack>
                </Stack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  if (selectedOrder) {
                    // Update the note in the order (this is a placeholder action)
                    console.log(`Updated note for ${selectedOrder.orderId}: ${note}`);
                  }
                  onClose();
                }}
              >
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Card>
  );
};

export default OrderHistory;

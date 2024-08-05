import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text
} from '@chakra-ui/react';

const TestDetailsModal = ({ isOpen, onClose, testDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Test Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {testDetails && (
            <VStack align="start" spacing={4}>
              <Text fontSize="lg"><strong>Test:</strong> {testDetails.name}</Text>
              <Text fontSize="lg"><strong>Doctor:</strong> {testDetails.doctor}</Text>
              <Text fontSize="lg"><strong>Date:</strong> {testDetails.date}</Text>
              <Text fontSize="lg"><strong>Visit ID:</strong> {testDetails.visitId}</Text>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TestDetailsModal;

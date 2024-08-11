import React from 'react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { DownloadIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import blood from 'assets/img/icons/blood.png';
import xray from 'assets/img/icons/xray.png';  
import prescription from 'assets/img/icons/prescription.png'; 

export default function DocumentsManagement(props) {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('gray.400', 'gray.600');
  const cardBackground = useColorModeValue('white', 'gray.700');


  const documents = [
    {
      name: 'Blood Test Report',
      dateAdded: '2024-07-20',
      icon: blood
    },
    {
      name: 'X-Ray Scan Results',
      dateAdded: '2024-06-15',
      icon: xray
    },
    {
      name: 'Prescription Details',
      dateAdded: '2024-05-30',
      icon: prescription
    },
  ];

  return (
    <Card mb="20px" mt="1px" h='700px' w='650px'>
      <Flex direction="column" align="start">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="4px"
        >
          Medical Documents
        </Text>
        <Text color={textColorSecondary} fontSize="sm" mb="20px">
          Manage your medical documents here.
        </Text>

        <VStack spacing="24px" align="start">
          {documents.map((doc, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              p="6"
              w="600px"
              bg={cardBackground}
              boxShadow="md"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              minHeight="80px"
            >
              <Flex alignItems="center">
                <Image src={doc.icon} alt={doc.name} boxSize="50px" mr="6" />
                <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
                  {doc.name}
                </Text>
              </Flex>
              <Flex>
                <IconButton
                  aria-label="Download document"
                  icon={<DownloadIcon />}
                  size="md"
                  colorScheme="green"
                  mr="3"
                />
                <IconButton
                  aria-label="Edit document"
                  icon={<EditIcon />}
                  size="md"
                  colorScheme="blue"
                  mr="3"
                />
                <IconButton
                  aria-label="Delete document"
                  icon={<DeleteIcon />}
                  size="md"
                  colorScheme="red"
                />
              </Flex>
            </Box>
          ))}
        </VStack>
      </Flex>
    </Card>
  );
}

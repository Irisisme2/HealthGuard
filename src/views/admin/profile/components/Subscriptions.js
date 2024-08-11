import React from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export default function SubscriptionManagement(props) {

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('gray.400', 'gray.600');
  const cardBackground = useColorModeValue('white', 'gray.700');


  const subscriptions = [
    {
      name: 'Premium Health Monitoring',
      startDate: '2023-01-01',
      endDate: '2024-01-01',
    },
    {
      name: 'Monthly Doctor Consultations',
      startDate: '2023-03-15',
      endDate: '2023-09-15',
    },
    {
      name: 'Fitness Tracker Insights',
      startDate: '2023-05-10',
      endDate: '2023-11-10',
    },
    {
      name: 'Mental Wellness Program',
      startDate: '2023-07-01',
      endDate: '2024-07-01',
    },
    {
      name: 'Nutrition and Diet Counseling',
      startDate: '2023-06-20',
      endDate: '2023-12-20',
    },
    {
      name: 'Virtual Health Checkups',
      startDate: '2023-08-01',
      endDate: '2024-08-01',
    },
    {
      name: 'Chronic Disease Management',
      startDate: '2023-04-01',
      endDate: '2024-04-01',
    },
  ];

  return (
    <Card mt="40px" w="1230px" p="4" h="1110px">
      <Flex direction="column" align="start">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="4px"
        >
          Subscriptions and Services
        </Text>
        <Text color={textColorSecondary} fontSize="sm" mb="20px">
          Manage your subscriptions and access to additional services.
        </Text>

        <VStack spacing="20px" align="start">
          {subscriptions.map((sub, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              p="4"
              w="1170px"
              bg={cardBackground}
              boxShadow="md"
            >
              <Flex justify="space-between" align="center" mb="2">
                <Text fontWeight="bold" color={textColorPrimary}>
                  {sub.name}
                </Text>
                <Flex>
                  <IconButton
                    aria-label="Edit subscription"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    mr="2"
                  />
                  <IconButton
                    aria-label="Cancel subscription"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                  />
                </Flex>
              </Flex>
              <Text color={textColorSecondary}>
                <strong>Start Date:</strong> {sub.startDate}
              </Text>
              {sub.endDate && (
                <Text color={textColorSecondary}>
                  <strong>End Date:</strong> {sub.endDate}
                </Text>
              )}
            </Box>
          ))}
        </VStack>
      </Flex>
    </Card>
  );
}

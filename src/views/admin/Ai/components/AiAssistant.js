// src/AiAssistant.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Stack,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';

const AiAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://api.endpoint.com/gemini',
        { query },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_GEMINI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setResponse(res.data.answer);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Sorry, there was an error.");
    }
  };

  return (
    <VStack
      spacing={0}
      align="stretch"
      height="100vh"
      width="80vw"
      bg="gray.50"
    >
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        p={4}
      >
        <Card
          flex="1"
          display="flex"
          flexDirection="column"
          overflow="hidden"
          variant="outline"
          borderColor="gray.200"
          shadow="md"
        >
          <CardHeader
            bg="teal.500"
            color="white"
            p={4}
            borderBottomWidth="1px"
          >
            <Text fontSize="xl" fontWeight="bold">
              HealthGuard AI Assistant
            </Text>
          </CardHeader>
          <CardBody
            flex="1"
            display="flex"
            flexDirection="column"
            p={4}
            overflowY="auto"
          >
            <VStack spacing={4} align="stretch" flex="1">
              <Box
                flex="1"
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p={4}
                display="flex"
                flexDirection="column"
              >
                <Stack spacing={4}>
                  {response && (
                    <Box bg="gray.100" p={4} borderRadius="md" shadow="sm">
                      <Text fontSize="lg" fontWeight="medium">
                        Response:
                      </Text>
                      <Text mt={2}>{response}</Text>
                    </Box>
                  )}
                </Stack>
              </Box>
              <HStack as="form" spacing={4} onSubmit={handleSubmit} mt={4}>
                <Input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Ask a medical question..."
                  size="lg"
                  borderRadius="md"
                  borderColor="gray.300"
                />
                <Button type="submit" colorScheme="teal" size="lg">
                  Submit
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </VStack>
  );
};

export default AiAssistant;


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
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown'; // Do renderowania Markdown

const AiAssistant = () => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userQuery = { role: 'user', text: query };
    setConversation([...conversation, userQuery]);

    try {
      const res = await axios.post(
        'http://localhost:3001/api/ask',
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const modelResponse = { role: 'model', text: res.data.answer };
      setConversation([...conversation, userQuery, modelResponse]);
      setQuery(''); 
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setConversation([...conversation, userQuery, { role: 'model', text: "Sorry, there was an error." }]);
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
                overflowY="auto"
              >
                <Stack spacing={4}>
                  {conversation.map((msg, index) => (
                    <Box
                      key={index}
                      bg={msg.role === 'user' ? 'blue.100' : 'green.100'}
                      p={4}
                      borderRadius="md"
                      shadow="sm"
                    >
                      <Text fontSize="lg" fontWeight="medium">
                        {msg.role === 'user' ? 'You:' : 'AI:'}
                      </Text>
                      <Box mt={2}>
                        {/* Renderowanie Markdown lub HTML */}
                        {msg.role === 'model' ? (
                          <ReactMarkdown>{msg.text}</ReactMarkdown> // Renderowanie Markdown
                        ) : (
                          <Text>{msg.text}</Text>
                        )}
                      </Box>
                    </Box>
                  ))}
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

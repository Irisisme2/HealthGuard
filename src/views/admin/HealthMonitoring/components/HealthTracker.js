import React, { useState } from 'react';
import {
  Box, Button, Input, Textarea, FormControl, FormLabel, Stack, Heading, Divider, VStack, Text, useToast,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb, HStack, IconButton, InputGroup, InputLeftElement,
  Select as ChakraSelect, useDisclosure, Collapse
} from '@chakra-ui/react';
import { SearchIcon, DownloadIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card'; // Adjust the path as needed
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto'; // Required for chart.js

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const HealthTracker = () => {
  const [symptom, setSymptom] = useState('');
  const [symptomCategory, setSymptomCategory] = useState('');
  const [symptomIntensity, setSymptomIntensity] = useState(0);
  const [mood, setMood] = useState('');
  const [personalNotes, setPersonalNotes] = useState('');
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [reminder, setReminder] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);

  const { isOpen: isExportOpen, onToggle: toggleExport } = useDisclosure();

  const toast = useToast();

  const handleSubmit = () => {
    if (!symptom || !symptomCategory || symptomIntensity <= 0 || !mood) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newEntry = {
      symptom,
      symptomCategory,
      symptomIntensity,
      mood,
      personalNotes,
      date: new Date().toLocaleDateString(),
    };

    setHistory([newEntry, ...history]);

    // Clear the form
    setSymptom('');
    setSymptomCategory('');
    setSymptomIntensity(0);
    setMood('');
    setPersonalNotes('');

    toast({
      title: "Success",
      description: "Your entry has been saved.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleExport = (type) => {
    // Implement export logic here
    toast({
      title: "Export",
      description: `Exporting data as ${type}`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const filteredHistory = history.filter(entry =>
    entry.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.mood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chartData = {
    labels: history.map(entry => entry.date),
    datasets: [
      {
        label: 'Symptom Intensity',
        data: history.map(entry => entry.symptomIntensity),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Box p={4}>
      <Card boxShadow="lg" borderRadius="md" p={6}>
        <Heading size="lg" mb={6} textAlign="center">Health Tracker</Heading>

        {/* Profile Management */}
        <Box mb={6}>
          {showProfileForm ? (
            <FormControl>
              <FormLabel htmlFor="user-profile">User Profile</FormLabel>
              <Input
                id="user-profile"
                placeholder="Enter your profile name..."
                value={userProfile}
                onChange={(e) => setUserProfile(e.target.value)}
              />
              <Button mt={2} colorScheme="blue" onClick={() => setShowProfileForm(false)}>
                Save Profile
              </Button>
            </FormControl>
          ) : (
            <Button colorScheme="teal" onClick={() => setShowProfileForm(true)}>
              {userProfile ? `Edit Profile (${userProfile})` : 'Add Profile'}
            </Button>
          )}
        </Box>

        <Stack spacing={6}>
          {/* Symptom Details */}
          <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
            <Heading size="md" mb={4}>Symptom Details</Heading>
            <FormControl mb={4}>
              <FormLabel htmlFor="symptom-category">Symptom Category</FormLabel>
              <ChakraSelect
                id="symptom-category"
                placeholder="Select a category"
                value={symptomCategory}
                onChange={(e) => setSymptomCategory(e.target.value)}
              >
                <option value="pain">Pain</option>
                <option value="digestive">Digestive Issues</option>
                <option value="respiratory">Respiratory Issues</option>
                <option value="neurological">Neurological Issues</option>
                <option value="other">Other</option>
              </ChakraSelect>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="symptom">Symptoms</FormLabel>
              <ChakraSelect
                id="symptom"
                placeholder="Select a symptom"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
              >
                <option value="headache">🧠 Headache</option>
                <option value="dizziness">🌪️ Dizziness</option>
                <option value="nausea">🤢 Nausea</option>
                <option value="fatigue">😴 Fatigue</option>
                <option value="fever">🌡️ Fever</option>
                <option value="cough">🤧 Cough</option>
                <option value="chest_pain">💔 Chest Pain</option>
                <option value="muscle_ache">💪 Muscle Ache</option>
              </ChakraSelect>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="symptom-intensity">Symptom Intensity</FormLabel>
              <Slider
                id="symptom-intensity"
                aria-label="Symptom Intensity"
                value={symptomIntensity}
                onChange={(value) => setSymptomIntensity(value)}
                min={0}
                max={10}
                step={1}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text mt={2}>Intensity: {symptomIntensity}</Text>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="mood">Mood and Well-being</FormLabel>
              <Input
                id="mood"
                placeholder="Enter your mood, e.g., good, bad, average..."
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="personal-notes">Personal Notes</FormLabel>
              <Textarea
                id="personal-notes"
                placeholder="Add personal notes related to your well-being or lifestyle changes..."
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
              />
            </FormControl>
          </Box>

          {/* Reminder */}
          <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
            <FormControl>
              <FormLabel htmlFor="reminder">Set Reminder</FormLabel>
              <Input
                id="reminder"
                placeholder="Set a reminder..."
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              />
              <Button mt={2} colorScheme="green">
                Set Reminder
              </Button>
            </FormControl>
          </Box>

          {/* Submit Button */}
          <Button mt={4} colorScheme="blue" onClick={handleSubmit} width="full">
            Save
          </Button>

          {/* Export Options */}
          <Box mb={6}>
            <Button colorScheme="yellow" onClick={toggleExport} width="full">
              {isExportOpen ? 'Hide Export Options' : 'Show Export Options'}
            </Button>
            <Collapse in={isExportOpen}>
              <HStack spacing={4} mt={4} justify="center">
                <IconButton
                  aria-label="Export CSV"
                  icon={<DownloadIcon />}
                  onClick={() => handleExport('CSV')}
                />
                <IconButton
                  aria-label="Export PDF"
                  icon={<DownloadIcon />}
                  onClick={() => handleExport('PDF')}
                />
              </HStack>
            </Collapse>
          </Box>

          {/* History */}
          <Divider my={6} />
          <Heading size="md" mb={4}>History</Heading>

          {/* Search Input */}
          <FormControl mb={6}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search history"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          {/* Chart */}
          {history.length > 0 && (
            <Box mb={6}>
              <Heading size="sm" mb={4}>Symptom Intensity Over Time</Heading>
              <Line data={chartData} />
            </Box>
          )}

          {/* History List */}
          <VStack align="start" spacing={4}>
            {filteredHistory.length === 0 && <Text>No entries match the search query.</Text>}
            {filteredHistory.map((entry, index) => (
              <Box key={index} borderWidth={1} borderRadius="md" p={4} width="full" boxShadow="md" bg="white">
                <Text fontWeight="bold" mb={2}>{entry.date}</Text>
                <Text>Symptom: {entry.symptom} (Category: {entry.symptomCategory}, Intensity: {entry.symptomIntensity})</Text>
                <Text>Mood: {entry.mood}</Text>
                <Text>Notes: {entry.personalNotes}</Text>
              </Box>
            ))}
          </VStack>
        </Stack>
      </Card>
    </Box>
  );
};

export default HealthTracker;

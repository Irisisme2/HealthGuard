import React, { useState } from 'react';
import {
  Flex,
  Text,
  useColorModeValue,
  Box,
  Switch,
  FormControl,
  FormLabel,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

export default function Notifications(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('gray.400', 'gray.600');

  // Notification state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [medicationReminders, setMedicationReminders] = useState(true);
  const [appointmentNotifications, setAppointmentNotifications] = useState(true);
  const [testResults, setTestResults] = useState(false);
  const [healthTips, setHealthTips] = useState(true);

  const handleEmailChange = () => setEmailNotifications(!emailNotifications);
  const handlePushChange = () => setPushNotifications(!pushNotifications);
  const handleSmsChange = () => setSmsNotifications(!smsNotifications);
  const handleMedicationRemindersChange = () => setMedicationReminders(!medicationReminders);
  const handleAppointmentNotificationsChange = () => setAppointmentNotifications(!appointmentNotifications);
  const handleTestResultsChange = () => setTestResults(!testResults);
  const handleHealthTipsChange = () => setHealthTips(!healthTips);

  return (
    <Card mt="40px"  w="300px" {...rest}>
      <Flex direction="column" align="start">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="4px"
        >
          Notification Preferences
        </Text>
        <Text color={textColorSecondary} fontSize="sm" mb="20px">
          Customize your notification settings to stay informed about important events.
        </Text>
        
        <VStack spacing={4} align="stretch">
          {/* General Notifications */}
          <FormControl>
            <FormLabel color={textColorPrimary}>Email Notifications</FormLabel>
            <Switch
              isChecked={emailNotifications}
              onChange={handleEmailChange}
              colorScheme="blue"
            />
            <Text color={textColorSecondary} fontSize="sm" mt="2">
              Enable or disable email notifications for various updates.
            </Text>
          </FormControl>
          
          <FormControl>
            <FormLabel color={textColorPrimary}>Push Notifications</FormLabel>
            <Switch
              isChecked={pushNotifications}
              onChange={handlePushChange}
              colorScheme="blue"
            />
            <Text color={textColorSecondary} fontSize="sm" mt="2">
              Enable or disable push notifications on your mobile device.
            </Text>
          </FormControl>
          
          <FormControl>
            <FormLabel color={textColorPrimary}>SMS Notifications</FormLabel>
            <Switch
              isChecked={smsNotifications}
              onChange={handleSmsChange}
              colorScheme="blue"
            />
            <Text color={textColorSecondary} fontSize="sm" mt="2">
              Enable or disable SMS notifications for updates.
            </Text>
          </FormControl>

          {/* Health-Specific Notifications */}
          <FormControl>
            <FormLabel color={textColorPrimary}>Medication Reminders</FormLabel>
            <Switch
              isChecked={medicationReminders}
              onChange={handleMedicationRemindersChange}
              colorScheme="blue"
            />
            <Text color={textColorSecondary} fontSize="sm" mt="2">
              Enable or disable reminders for taking medication.
            </Text>
          </FormControl>
          
          <FormControl>
            <FormLabel color={textColorPrimary}>Appointment Notifications</FormLabel>
            <Switch
              isChecked={appointmentNotifications}
              onChange={handleAppointmentNotificationsChange}
              colorScheme="blue"
            />
            <Text color={textColorSecondary} fontSize="sm" mt="2">
              Enable or disable notifications for upcoming appointments.
            </Text>
          </FormControl>
          
          <FormControl>
            <FormLabel color={textColorPrimary}>Test Results Notifications</FormLabel>
            <Switch
              isChecked={testResults}
              onChange={handleTestResultsChange}
              colorScheme="blue"
            />
            <Text color={textColorSecondary} fontSize="sm" mt="2">
              Enable or disable notifications when test results are available.
            </Text>
          </FormControl>
          
          <FormControl>
            <FormLabel color={textColorPrimary}>Health Tips</FormLabel>
            <Switch
              isChecked={healthTips}
              onChange={handleHealthTipsChange}
              colorScheme="blue"
            />
            <Text color={textColorSecondary} fontSize="sm" mt="2">
              Enable or disable notifications for health tips and advice.
            </Text>
          </FormControl>
        </VStack>
      </Flex>
    </Card>
  );
}

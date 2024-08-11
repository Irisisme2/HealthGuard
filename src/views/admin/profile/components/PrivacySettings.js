import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Checkbox,
  Select,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

export default function PrivacySettings(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('gray.400', 'gray.600');

  // State for privacy settings
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [dataSharingConsent, setDataSharingConsent] = useState(true);
  const [shareWithDoctor, setShareWithDoctor] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [sharingDuration, setSharingDuration] = useState('');

  // Modal state and handlers
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState({
    heartRate: false,
    stressLevel: false,
    sleep: false,
    diet: false,
    steps: false,
    medication: false,
    healthJournal: false,
    tid: false,
  });

  const handleDataChange = (event) => {
    const { name, checked } = event.target;
    setSelectedData(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleShareWithDoctorChange = () => {
    if (shareWithDoctor) {
      onClose();
    } else {
      setShareWithDoctor(true);
      onOpen();
    }
  };

  return (
    <Card mb="20px" mt="1px" mx="auto" maxW="600px" {...rest}>
      <Flex direction="column" align="start">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="4px"
        >
          Privacy Settings
        </Text>
        <Text color={textColorSecondary} fontSize="sm" mb="20px">
          Manage your account privacy settings to control who can see your profile and how your data is shared.
        </Text>

        {/* Profile Visibility */}
        <FormControl mb="20px">
          <FormLabel color={textColorPrimary}>Profile Visibility</FormLabel>
          <RadioGroup
            onChange={setProfileVisibility}
            value={profileVisibility}
          >
            <Stack spacing={4} direction="column">
              <Radio value="public" colorScheme="blue">
                Public
              </Radio>
              <Radio value="friends" colorScheme="blue">
                Only Friends
              </Radio>
              <Radio value="private" colorScheme="blue">
                Private
              </Radio>
            </Stack>
          </RadioGroup>
          <Text color={textColorSecondary} fontSize="sm" mt="2">
            Choose who can see your profile.
          </Text>
        </FormControl>

        {/* Data Sharing Consent */}
        <FormControl mb="20px">
          <FormLabel color={textColorPrimary}>Consent to Data Sharing</FormLabel>
          <Switch
            isChecked={dataSharingConsent}
            onChange={() => setDataSharingConsent(!dataSharingConsent)}
            colorScheme="blue"
          />
          <Text color={textColorSecondary} fontSize="sm" mt="2">
            Allow sharing your data with other services or partners.
          </Text>
        </FormControl>

        {/* Share with Doctor */}
        <FormControl>
          <FormLabel color={textColorPrimary}>Share with Doctor</FormLabel>
          <Switch
            isChecked={shareWithDoctor}
            onChange={handleShareWithDoctorChange}
            colorScheme="blue"
          />
          <Text color={textColorSecondary} fontSize="sm" mt="2">
            Allow sharing your health data with your doctor.
          </Text>
        </FormControl>

        {/* Modal for Detailed Data Sharing */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select Data to Share</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb="20px">
                <FormLabel color={textColorPrimary}>Select Doctor</FormLabel>
                <Select
                  placeholder="Select doctor"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  <option value="drSmith">Dr. Smith</option>
                  <option value="drJones">Dr. Jones</option>
                  <option value="drBrown">Dr. Brown</option>
                  {/* Add more doctors as needed */}
                </Select>
              </FormControl>
              <FormControl mb="20px">
                <FormLabel color={textColorPrimary}>Sharing Duration</FormLabel>
                <Input
                  type="text"
                  placeholder="e.g., 1 month, 6 months"
                  value={sharingDuration}
                  onChange={(e) => setSharingDuration(e.target.value)}
                />
              </FormControl>
              <Flex direction="column">
                <Checkbox
                  name="heartRate"
                  isChecked={selectedData.heartRate}
                  onChange={handleDataChange}
                  mb="2"
                >
                  Heart Rate
                </Checkbox>
                <Checkbox
                  name="stressLevel"
                  isChecked={selectedData.stressLevel}
                  onChange={handleDataChange}
                  mb="2"
                >
                  Stress Level
                </Checkbox>
                <Checkbox
                  name="sleep"
                  isChecked={selectedData.sleep}
                  onChange={handleDataChange}
                  mb="2"
                >
                  Sleep
                </Checkbox>
                <Checkbox
                  name="diet"
                  isChecked={selectedData.diet}
                  onChange={handleDataChange}
                  mb="2"
                >
                  Diet
                </Checkbox>
                <Checkbox
                  name="steps"
                  isChecked={selectedData.steps}
                  onChange={handleDataChange}
                  mb="2"
                >
                  Steps
                </Checkbox>
                <Checkbox
                  name="medication"
                  isChecked={selectedData.medication}
                  onChange={handleDataChange}
                  mb="2"
                >
                  Medication
                </Checkbox>
                <Checkbox
                  name="healthJournal"
                  isChecked={selectedData.healthJournal}
                  onChange={handleDataChange}
                  mb="2"
                >
                  Health Journal
                </Checkbox>
                <Checkbox
                  name="tid"
                  isChecked={selectedData.tid}
                  onChange={handleDataChange}
                  mb="2"
                >
                  TID (Treatment Identification Data)
                </Checkbox>
              </Flex>
              <Button colorScheme="blue" mt="4" onClick={onClose}>
                Save
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Card>
  );
}

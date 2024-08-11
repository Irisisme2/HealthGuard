import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  Input,
  IconButton,
  HStack,
  Button,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { EditIcon } from '@chakra-ui/icons';

export default function PersonalInfoCard(props) {
  // Initial personal info data
  const {
    banner: initialBanner,
    avatar: initialAvatar,
    name: initialName,
    birthDate: initialBirthDate,
    gender: initialGender,
    email: initialEmail,
    phone: initialPhone,
    address: initialAddress,
  } = props;

  const [avatarSrc, setAvatarSrc] = useState(initialAvatar);
  const [bannerSrc, setBannerSrc] = useState(initialBanner);
  const [name, setName] = useState(initialName);
  const [birthDate, setBirthDate] = useState(initialBirthDate);
  const [gender, setGender] = useState(initialGender);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [address, setAddress] = useState(initialAddress);

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important'
  );

  const handleAvatarChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save functionality (e.g., send data to the server) can be implemented here
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setName(initialName);
    setBirthDate(initialBirthDate);
    setGender(initialGender);
    setEmail(initialEmail);
    setPhone(initialPhone);
    setAddress(initialAddress);
    setIsEditing(false);
  };

  return (
    <Card mb="20px" mt="1px" mx="auto" maxW="600px">
      <Box
        bg={`url(${bannerSrc})`}
        bgSize='cover'
        bgPosition='center'
        borderRadius='lg'
        h='200px'
        w='100%'
        position='relative'
        mb={-20} // Moves the banner behind the avatar
      >
        <IconButton
          icon={<EditIcon />}
          aria-label='Edit banner'
          size='sm'
          position='absolute'
          bottom='8px'
          right='8px'
          onClick={() => document.getElementById('bannerInput').click()}
        />
        <Input
          id='bannerInput'
          type='file'
          accept='image/*'
          display='none'
          onChange={handleBannerChange}
        />
      </Box>

      <Box
        position='relative'
        mx='auto'
        mb={6}
        transform='translateY(-50%)'
      >
        <Avatar
          src={avatarSrc}
          h='120px'
          w='120px'
          border='4px solid'
          borderColor={borderColor}
        />
        <IconButton
          icon={<EditIcon />}
          aria-label='Edit avatar'
          size='sm'
          position='absolute'
          bottom='8px'
          right='8px'
          onClick={() => document.getElementById('avatarInput').click()}
        />
        <Input
          id='avatarInput'
          type='file'
          accept='image/*'
          display='none'
          onChange={handleAvatarChange}
        />
      </Box>

      <VStack spacing={4} align='stretch'>
        <HStack spacing={4} align='center'>
          <Text fontWeight='bold'>Name:</Text>
          {isEditing ? (
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <Text>{name}</Text>
          )}
        </HStack>

        <HStack spacing={4} align='center'>
          <Text fontWeight='bold'>Date of Birth:</Text>
          {isEditing ? (
            <Input
              type='date'
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          ) : (
            <Text>{birthDate}</Text>
          )}
        </HStack>

        <HStack spacing={4} align='center'>
          <Text fontWeight='bold'>Gender:</Text>
          {isEditing ? (
            <Input value={gender} onChange={(e) => setGender(e.target.value)} />
          ) : (
            <Text>{gender}</Text>
          )}
        </HStack>

        <HStack spacing={4} align='center'>
          <Text fontWeight='bold'>Email:</Text>
          {isEditing ? (
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <Text>{email}</Text>
          )}
        </HStack>

        <HStack spacing={4} align='center'>
          <Text fontWeight='bold'>Phone:</Text>
          {isEditing ? (
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <Text>{phone}</Text>
          )}
        </HStack>

        <HStack spacing={4} align='center'>
          <Text fontWeight='bold'>Address:</Text>
          {isEditing ? (
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          ) : (
            <Text>{address}</Text>
          )}
        </HStack>

        <HStack spacing={4} justify='flex-end'>
          {isEditing ? (
            <>
              <Button colorScheme='blue' onClick={handleSave}>
                Save
              </Button>
              <Button colorScheme='gray' onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button colorScheme='blue' onClick={handleEdit}>
              Edit
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
}

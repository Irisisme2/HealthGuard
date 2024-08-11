import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { CheckIcon, StarIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';

import banner1 from 'assets/img/tips/banner1.png';
import banner2 from 'assets/img/tips/banner2.png';
import banner3 from 'assets/img/tips/banner3.png';

const recommendations = [
  {
    title: 'Increase Physical Activity',
    description: 'Tips on exercises tailored to your fitness level.',
    image: banner1,
    link: 'https://bodyviva.com.au/easy-exercise-tips-to-help-build-your-physical-fitness/',
  },
  {
    title: 'Healthy Eating Habits',
    description: 'Recommendations on diet and meals.',
    image: banner2,
    link: 'https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eight-tips-for-healthy-eating/',
  },
  {
    title: 'Stress Management',
    description: 'Techniques for managing stress and improving mental health.',
    image: banner3,
    link: 'https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress',
  },
];

const RecommendationCard = () => {
  const [read, setRead] = useState({});
  const [favorite, setFavorite] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  const handleReadToggle = (index) => {
    setRead((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleFavoriteToggle = (index) => {
    setFavorite((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleReadArticle = (link) => {
    window.open(link, '_blank');
  };

  return (
    <VStack spacing={6} align="stretch">
      <HStack spacing={4} overflowX="auto" maxHeight="500px" py={4}>
        {recommendations.map((rec, index) => (
          <Box
            key={index}
            maxWidth="300px"
            borderRadius="lg"
            boxShadow="lg"
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
            height="100%"
            maxHeight="500px"
            p={4}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            cursor="pointer"
            _hover={{ bgColor: hoverBgColor }}
          >
            <Image src={rec.image} alt={rec.title} borderRadius="md" mb={4} />
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              {rec.title}
            </Text>
            <Text fontSize="sm" mb={4}>
              {rec.description}
            </Text>
            <HStack spacing={2}>
              <IconButton
                icon={<CheckIcon />}
                aria-label={read[index] ? 'Mark as unread' : 'Mark as read'}
                onClick={() => handleReadToggle(index)}
                colorScheme={read[index] ? 'green' : 'gray'}
              />
              <IconButton
                icon={<StarIcon />}
                aria-label={favorite[index] ? 'Remove from favorites' : 'Add to favorites'}
                onClick={() => handleFavoriteToggle(index)}
                colorScheme={favorite[index] ? 'yellow' : 'gray'}
              />
              <Button size="sm" onClick={() => handleReadArticle(rec.link)}>
                Read Article
              </Button>
            </HStack>
          </Box>
        ))}
      </HStack>

      {selectedRecommendation && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedRecommendation.title}</ModalHeader>
            <ModalBody>
              <Text fontSize="md">{selectedRecommendation.description}</Text>
              <Button mt={4} colorScheme="blue" onClick={() => window.open(selectedRecommendation.link, '_blank')}>
                Read Full Article
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
};

export default RecommendationCard;

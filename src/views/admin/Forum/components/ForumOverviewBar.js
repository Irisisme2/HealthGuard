import React from 'react';
import {
  Box,
  Text,
  HStack,
  useColorModeValue,
  Divider,
  Image,
  Flex
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

// Import icon images
import generalhealth from 'assets/img/forum/generalhealth.png';
import dietnutrition from 'assets/img/forum/dietnutrition.png';
import physicalactivity from 'assets/img/forum/physicalactivity.png';
import healthissues from 'assets/img/forum/healthissues.png';
import emotionalsupport from 'assets/img/forum/emotionalsupport.png';
import mentalwellness from 'assets/img/forum/mentalwellness.png';
import lifestylechanges from 'assets/img/forum/lifestylechanges.png';

const categories = [
  { name: 'General Health', threads: 12, posts: 150, icon: generalhealth },
  { name: 'Diet and Nutrition', threads: 8, posts: 120, icon: dietnutrition },
  { name: 'Physical Activity', threads: 5, posts: 80, icon: physicalactivity },
  { name: 'Health Issues', threads: 10, posts: 200, icon: healthissues },
  { name: 'Emotional Support', threads: 7, posts: 90, icon: emotionalsupport },
  { name: 'Mental Wellness', threads: 9, posts: 110, icon: mentalwellness },
  { name: 'Lifestyle Changes', threads: 6, posts: 95, icon: lifestylechanges },
];

const ForumOverviewBar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box bg={bgColor} borderBottom="1px" borderColor={borderColor} p={4}>
      <HStack spacing={4} overflowX="auto" py={2}>
        {categories.map((category, index) => (
          <Card
            key={index}
            p={1} 
            borderRadius="md"
            boxShadow="md"
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
            minWidth="205px" 
            maxWidth="225px"
            height="100px" 
            display="flex"
            alignItems="center" 
            justifyContent="space-between" 
          >
            <Flex direction="row" align="center" w="full">
              <Text fontSize="sm" fontWeight="bold" color={textColor} textAlign="center" flex="1">
                {category.name}
              </Text>
              <Image src={category.icon} alt={`${category.name} icon`} boxSize="70px" ml={2} />
            </Flex>
            <Divider orientation="vertical" height="30px" mx={2} />
            <HStack spacing={2} fontSize="xs" color="gray.500" justify="space-between">
              <Text>Threads: {category.threads}</Text>
              <Text>Posts: {category.posts}</Text>
            </HStack>
          </Card>
        ))}
      </HStack>
    </Box>
  );
};

export default ForumOverviewBar;

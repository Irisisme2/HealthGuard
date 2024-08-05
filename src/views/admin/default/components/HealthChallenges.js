import React, { useRef } from 'react';
import Slider from 'react-slick';
import { Box, Button, Text, Stack, IconButton, useBreakpointValue, Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import stepsIcon from 'assets/img/challenges/10ksteps.png';
import exerciseIcon from 'assets/img/challenges/exercise.png';
import waterIcon from 'assets/img/challenges/water.png';
import sugarIcon from 'assets/img/challenges/Sugar.png';
import sleepIcon from 'assets/img/challenges/Sleep.png';

const challenges = [
  {
    id: 1,
    title: '10,000 Steps a Day',
    description: 'Join this challenge to reach 10,000 steps a day.',
    reward: 'Digital Badge',
    icon: stepsIcon
  },
  {
    id: 2,
    title: 'Drink 8 Glasses of Water Daily',
    description: 'Stay hydrated by drinking at least 8 glasses of water every day.',
    reward: 'Hydration Tracker',
    icon: waterIcon
  },
  {
    id: 3,
    title: '30-Minute Daily Exercise',
    description: 'Commit to 30 minutes of exercise every day to boost your health.',
    reward: 'Fitness Tracker',
    icon: exerciseIcon
  },
  {
    id: 4,
    title: 'No Sugar for 7 Days',
    description: 'Challenge yourself to cut out all sugar for a week.',
    reward: 'Healthy Eating Guide',
    icon: sugarIcon
  },
  {
    id: 5,
    title: 'Sleep 8 Hours Each Night',
    description: 'Prioritize your sleep and aim for 8 hours of quality rest.',
    reward: 'Sleep Improvement Tips',
    icon: sleepIcon
  },
];

const HealthChallenges = () => {
  const sliderRef = useRef(null); 
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <Box p={0} maxW="100%" mx="auto" position="relative">
      <Box position="relative" width="100%" height="400px">
        <Slider ref={sliderRef} {...sliderSettings} style={{ width: '100%', height: '100%' }}>
          {challenges.map(challenge => (
            <Card
              key={challenge.id}
              p={0}
              borderRadius="lg"
              shadow="xl"
              bg="white"
              width="100%" 
              height="100%" 
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              overflow="hidden" 
              position="relative"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="300px" 
                overflow="hidden"
              >
                <Image 
                  src={challenge.icon} 
                  alt={challenge.title} 
                  boxSize="250px"
                  objectFit="contain"
                  borderRadius="md" 
                />
              </Box>
              <Stack spacing={3} textAlign="center" p={4}>
                <Text fontSize="lg" fontWeight="bold">
                  {challenge.title}
                </Text>
                <Text fontSize="md">
                  {challenge.description}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  Reward: {challenge.reward}
                </Text>
              </Stack>
              <Button 
                colorScheme="teal" 
                size={buttonSize} 
                fontSize="sm" 
                mt={4}
                width="100%" 
                textAlign="center" 
              >
                Join Challenge
              </Button>
            </Card>
          ))}
        </Slider>
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous Challenge"
          variant="outline"
          colorScheme="teal"
          onClick={() => sliderRef.current.slickPrev()}
          position="absolute"
          left="20px"
          top="50%"
          transform="translateY(-50%)"
          size={buttonSize}
          boxShadow="md"
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next Challenge"
          variant="outline"
          colorScheme="teal"
          onClick={() => sliderRef.current.slickNext()} 
          position="absolute"
          right="20px"
          top="50%"
          transform="translateY(-50%)"
          size={buttonSize}
          boxShadow="md" 
        />
      </Box>
    </Box>
  );
};

export default HealthChallenges;

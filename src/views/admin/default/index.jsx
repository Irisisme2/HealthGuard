/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { MdLocalHospital, MdThermostat, MdMedicalServices, MdFavorite, MdFitnessCenter, MdMonitorHeart } from 'react-icons/md';
import UpcomingAppointmentsCard from "views/admin/default/components/UpcomingAppointmentsCard";
import HealthJournal from "views/admin/default/components/HealthJournal";
import MedicationManagement from "views/admin/default/components/MedicationManagement";
import AppointmentForm from "views/admin/default/components/AppointmentForm";
import HealthChallenges from "views/admin/default/components/HealthChallenges";
import HeartRate from "views/admin/default/components/HeartRate";
import BloodPressureStatsCard from "views/admin/default/components/BloodPressureStatsCard";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
       <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdLocalHospital} color={brandColor} />
              }
            />
          }
          name='Blood Pressure'
          value='120/80 mmHg'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdThermostat} color={brandColor} />
              }
            />
          }
          name='Temperature'
          value='36.6°C'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdMedicalServices} color={brandColor} />
              }
            />
          }
          name='Blood Sugar'
          value='90 mg/dL'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFavorite} color={brandColor} />
              }
            />
          }
          name='Heart Rate'
          value='72 bpm'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFitnessCenter} color={brandColor} />
              }
            />
          }
          name='BMI'
          value='22.5'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdMonitorHeart} color={brandColor} />
              }
            />
          }
          name='Cholesterol'
          value='190 mg/dL'
        />
      </SimpleGrid>
    <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px' mb='20px'>
        <HeartRate />
        <BloodPressureStatsCard />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px' mb='20px'>
        <UpcomingAppointmentsCard />

        <Box>
          <MedicationManagement />
          <Box mt='20px'>
            <HealthChallenges />
          </Box>
        </Box>

        <AppointmentForm />
      </SimpleGrid>
        <HealthJournal />
    </Box>
  );
}

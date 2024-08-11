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
import { Box, SimpleGrid,Grid } from "@chakra-ui/react";

// Custom components
import MedicationReminders from "views/admin/MedicineOrders/components/MedicationReminders";
import MyMedications from "views/admin/MedicineOrders/components/MyMedications";
import AutomaticOrders from "views/admin/MedicineOrders/components/AutomaticOrders";
import OrderHistory from "views/admin/MedicineOrders/components/OrderHistory";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 3, "2xl": 6 }}
      gap='20px'
      mb='20px'>
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 1 }}
        spacing="20px"
        mb="20px"
        w="100%"
      >
        <MyMedications />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px' mb='20px'>
        <MedicationReminders />
        < OrderHistory/>
        < AutomaticOrders/>
        <Box>
          <Box mt='20px'>
          </Box>
        </Box>

      </SimpleGrid>
    </Box>
  );
}
import { Box, Grid, SimpleGrid } from "@chakra-ui/react";

import DailyStats from "views/admin/ActivityTracking/components/DailyStats";
import ActivityChartSection from "views/admin/ActivityTracking/components/ActivityChartSection";
import ActivitySelection from "views/admin/ActivityTracking/components/ActivitySelection";
import ActivityHistory from "views/admin/ActivityTracking/components/ActivityHistory";
import ActivityGoalsSection from "views/admin/ActivityTracking/components/ActivityGoalsSection";


import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr 1fr 1fr",
        }}
        templateRows={{
          base: "repeat(4, 1fr)", 
          lg: "auto auto",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <DailyStats
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatar}
        />
        <ActivitySelection
          gridArea='1 / 2 / 2 / 3'
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe='20px'
          pb={{ base: "100px", lg: "20px" }}
        />
        <ActivityGoalsSection
          gridArea='1 / 3 / 2 / 4'
        />
 </Grid>
   
 <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px' mb='20px'>
        <ActivityChartSection /> 
            <ActivityHistory/>
      </SimpleGrid>

    </Box>
  );
}

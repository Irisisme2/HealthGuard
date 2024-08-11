import React from "react";
import { Box, Grid, SimpleGrid } from "@chakra-ui/react";
import HeartRateChart from "views/admin/HealthMonitoring/components/HeartRateChart";
import SleepQualityChart from "views/admin/HealthMonitoring/components/SleepQualityChart";
import StressLevelChart from "views/admin/HealthMonitoring/components/StressLevelChart";
import WeightMeasurement from "views/admin/HealthMonitoring/components/WeightMeasurement";
import HealthPatternsAnalysis from "views/admin/HealthMonitoring/components/HealthPatternsAnalysis";
import HealthTracker from "views/admin/HealthMonitoring/components/HealthTracker";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <HealthTracker />

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="30px" mt="30px">
        <Box>
          <StressLevelChart />
        </Box>
        <Box>
          <SleepQualityChart />
        </Box>
        <Box>
          <HeartRateChart />
        </Box>
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap="30px" mt="30px">
        <Box>
          <WeightMeasurement />
        </Box>
        <Box>
          <HealthPatternsAnalysis />
        </Box>
      </Grid>
    </Box>
  );
}

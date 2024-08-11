import React from "react";
import { Box, SimpleGrid, Grid } from "@chakra-ui/react";
import RecommendationCard from "views/admin/HealthTips/components/RecommendationCard";

export default function Overview() {
  return (
    <SimpleGrid
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      spacing="50px" 
    >
      <RecommendationCard />
    </SimpleGrid>
  );
}

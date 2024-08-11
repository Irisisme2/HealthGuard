import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import InteractiveMap from "views/admin/FacilityMap/components/InteractiveMap";

export default function Overview() {
  return (
    <Box
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      width="100vw"
      height="100vh"
      overflow="hidden"
      maxW="1500px" 
      mx="auto" 
    >
      <Grid
        templateColumns="1fr"
        templateRows="1fr"
        gap="0"
        width="100%"
        height="100%"
      >
        <InteractiveMap />
      </Grid>
    </Box>
  );
}

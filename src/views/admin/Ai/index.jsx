import React from "react";
import { Box, SimpleGrid, Grid } from "@chakra-ui/react";
import AiAssistant from "views/admin/Ai/components/AiAssistant";


export default function Overview() {
  return (
    <SimpleGrid
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      spacing="50px" 
    >
      <AiAssistant />
    </SimpleGrid>
  );
}

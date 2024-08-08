import React from "react";
import { Box, SimpleGrid, Grid } from "@chakra-ui/react";
import CalendarView from "views/admin/Appointments/components/CalendarView";
import VisitHistory from "views/admin/Appointments/components/VisitHistory";

export default function Overview() {
  return (
    <SimpleGrid
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      spacing="50px" 
    >
      <CalendarView />
      <VisitHistory />
    </SimpleGrid>
  );
}

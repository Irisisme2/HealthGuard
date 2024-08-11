import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import SignUp from "views/auth/signIn/components/SignUp";
import SignIn from "views/auth/signIn/components/SignIn";

export default function Overview() {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }} 
      spacing="30px"
      pt={{ base: "130px", md: "80px", xl: "80px" }}
    >
      <Box>
        <SignUp />
      </Box>
      <Box>
        <SignIn />
      </Box>
    </SimpleGrid>
  );
}

import React from "react";

import { Flex, useColorModeValue, Image } from "@chakra-ui/react";


import { HSeparator } from "components/separator/Separator";
import HealthGuardImg from "assets/img/icons/HealthGuard.png"; 

export function SidebarBrand() {

  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Image 
        src={HealthGuardImg} 
        alt='Health Guard Logo' 
        h='70px'   
        w='250px'  
        my='32px' 
        filter={logoColor === "white" ? "invert(1)" : "none"}
      />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;

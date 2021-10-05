import React from "react";
import Layout from "../Layout/Layout";
import { Grid, Box, Image, Center, Text } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

import heroImg from "../../img/hero.png";

const Landing = () => {
  const { user, userData } = useAuth();
  return (
    <Grid templateColumns="repeat(2, 1fr)" minH="100vh">
      <Box w="100%" bg="blue.600" >
        <Center h="100%" padding={8}>
          <Box>
            <Image src={heroImg} />
          </Box>
        </Center>

      </Box>
      <Box w="100%" bg="blue.200" />
    </Grid>
  );
};

export default Landing;

import React from "react";
import {
  Grid,
  Box,
  Image,
  Center,
  Text,
  VStack,
  Flex,
  Button,
} from "@chakra-ui/react";

import SignUpForm from "../auth/SignupForm";
import { useAuth } from "../../hooks/useAuth";

import heroImg from "../../img/hero.png";

const SignUp = () => {
  const { user, userData } = useAuth();
  return (
    <Grid templateColumns={{
      base: "1fr", md: "1fr 1fr", xl: "1fr 2fr"
    }} minH="100vh">
      <Box w="100%"
      //  bg="blue.800" 
      >
        <Center h="100%">
          <VStack spacing={4}>
            <Box>
              <Image w="70%" m="auto" src={heroImg} />
            </Box>
          </VStack>
        </Center>
      </Box>
      <Box w="100%" bg="idmLight.500">
        <Center h="100%">
          <Box mb={12}>
            <SignUpForm />
          </Box>

        </Center>
      </Box>
    </Grid>
  );
};

export default SignUp;

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
  Stack
} from "@chakra-ui/react";

import SignUpForm from "../auth/SignupForm";
import { useAuth } from "../../hooks/useAuth";

import heroImg from "../../img/hero.png";

const SignUp = () => {
  const { user, userData } = useAuth();
  return (
    <Grid templateColumns={{
      base: "1fr", md: "1fr 2fr", xl: "1fr 3fr"
    }} minH="100vh">
      <Box w="100%"
        bg="idm.800"
      >
        <Center h="100%">
          <VStack spacing={4}>
            <Box>
              <Image w="70%" m="auto" src={heroImg} />
            </Box>
          </VStack>
        </Center>
      </Box>
      <Stack spacing={8} p={8}>
        <SignUpForm />
      </Stack>
    </Grid>
  );
};

export default SignUp;

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

import LoginForm from "../auth/LoginForm";
import { useAuth } from "../../hooks/useAuth";

import heroImg from "../../img/hero.png";

const Landing = () => {
  const { user, userData } = useAuth();
  return (
    <Grid templateColumns="repeat(2, 1fr)" minH="100vh">
      <Box w="100%" bg="blue.800">
        <Center h="100%">
          <VStack spacing={4}>
            <Box>
              <Image w="70%" m="auto" src={heroImg} />
            </Box>
            <Box>
              <Text color="blue.100" mt={4}>
                En IDM puedes agendar cita para los estudios de tu paciente y
                más
              </Text>
            </Box>
          </VStack>
        </Center>
      </Box>
      <Box w="100%" bg="blue.100">
        <Grid templateRows="100px 1fr" minH="100vh">
          <Flex justifyContent="flex-end">
            <Button m={4}>Ingresar</Button>
          </Flex>
          <Box>
            <LoginForm />
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Landing;

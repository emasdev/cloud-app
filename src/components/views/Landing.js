import React from "react";
import {
  Grid,
  Box,
  Image,
  Center,
  Text,
  VStack,
  Stack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import LoginForm from "../auth/LoginForm";
import { useAuth } from "../../hooks/useAuth";

import heroImg from "../../img/hero.png";

const Landing = () => {
  const { user, userData, doSignOut } = useAuth();
  const history = useHistory();
  if (!user && !userData) {
    return (
      <Grid templateColumns={{
        base: "1fr", md: "1fr 1fr", xl: "2fr 1fr"
      }} minH="100vh" >
        <Box w="100%">
          <Center h="100%">
            <VStack spacing={4}>
              <Box>
                <Image w="70%" m="auto" src={heroImg} />
              </Box>
              <Box>
                <Text color="blue.300" mt={4}>
                  Agenda citas para los estudios de tus pacientes
                </Text>
                <Text color="blue.300" mt={2}>
                  Visualiza los estudios de tus pacientes
                </Text>
                <Text color="blue.300" mt={2}>
                  Almacena los estudios de tus pacientes
                </Text>
                <Text color="blue.300" mt={2}>
                  Aprovecha nuestras herramientas para manejo de imagenes radiográficas
                </Text>
              </Box>
            </VStack>
          </Center>
        </Box>
        <Box w="100%" bg="idmLight.500">
          <Center h="100%">
            <Box mb={12}>
              <LoginForm />
            </Box>

          </Center>
        </Box>
      </Grid >
    );
  } else {
    return (
      <Grid templateColumns={{
        base: "1fr", md: "1fr 2fr", xl: "1fr 3fr"
      }} minH="100vh">
        <Box w="100%"
          bg="idm.800"
        >
          <VStack spacing={4} mt={8}>
            <Box>
              <Image w="70%" m="auto" src={heroImg} />
            </Box>
          </VStack>

        </Box>
        <Stack spacing={8} p={4}>
          <Flex justifyContent="flex-end">
            <Button
              onClick={async e => {
                await doSignOut()
                history.push("/")
              }}>Cerrar sesión</Button>
          </Flex>
          <Box>
            {userData && Object.entries(userData).map(value => {
              return (<Text>{value} </Text>)
            })}
          </Box>
        </Stack>
      </Grid>
    )
  }

};

export default Landing;

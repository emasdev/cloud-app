import React from 'react';
import { Grid, Box, Image, Center, Text, VStack } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';
import logoImg from '../img/logo.png';

export default function Login() {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: '1fr 1fr',
        xl: '2fr 1fr',
      }}
      minH="100vh"
    >
      <Box w="100%">
        <Center h="100%">
          <VStack spacing={4}>
            <Box>
              <Image w="70%" m="auto" src={logoImg} />
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
                Aprovecha nuestras herramientas para manejo de imagenes
                radiográficas
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
    </Grid>
  );
}

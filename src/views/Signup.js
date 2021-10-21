import React from 'react';
import { Grid, Box, Image, Center, VStack, Stack } from '@chakra-ui/react';
// import SignupForm from '../components/SignupForm';
import SignupForm from '../components/SignupFormTest';
import logoImg from '../img/logo.png';

export default function Signup(props) {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: '1fr 2fr',
        xl: '1fr 3fr',
      }}
      minH="100vh"
    >
      <Box w="100%" bg="idm.800">
        <Center h="100%">
          <VStack spacing={4}>
            <Box>
              <Image w="70%" m="auto" src={logoImg} />
            </Box>
          </VStack>
        </Center>
      </Box>
      <Stack spacing={8} p={8}>
        <SignupForm onRegisterUserChange={props.onRegisterUserChange} />
      </Stack>
    </Grid>
  );
}

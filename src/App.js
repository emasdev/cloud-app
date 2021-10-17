import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

import firebase from './FirebaseConfig';
import FirebaseAuthService from './FirebaseAuthService';
import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Heading>IDM</Heading>
            <LoginForm user={user}></LoginForm>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

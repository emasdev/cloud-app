import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Heading,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

import firebase from './FirebaseConfig';
import FirebaseAuthService from './FirebaseAuthService';
import FirebaseFirestoreService from './FirebaseFirestoreService';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';
import Dashboard from './components/Dashboard/Main';
import Landing from './views/Landing';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  useEffect(() => {
    if (user) {
      FirebaseFirestoreService.readDocument('usuarios', user.uid).then(
        userData => {
          setUserData(userData);
        }
      );
    } else {
      setUserData(null);
    }
  }, [user]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/">
                <Landing user={user} userData={userData} />
                {/* <VStack spacing={8}>
                  <Heading>IDM</Heading>
                  <LoginForm user={user}></LoginForm>
                  {userData && <Dashboard userData={userData} />}
                </VStack> */}
              </Route>
              <Route path="/registrar">
                {/* Registrar Page */}
                <VStack spacing={8}>
                  <Heading>Registrar nueva cuenta</Heading>
                  <SignupForm user={user}></SignupForm>
                </VStack>
              </Route>
            </Switch>
          </Router>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

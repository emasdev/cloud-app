import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Grid } from '@chakra-ui/react';
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
import Landing from './views/Landing';
import Signup from './views/Signup';
import Loading from './views/Loading';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  function handleRegisterUser(isDone) {
    setIsRegistering(isDone);
  }

  useEffect(() => {
    FirebaseAuthService.subscribeToAuthChanges(user => {
      if (!user) {
        setUser(null);
        setUserData(null);
      } else {
        if (!isRegistering) {
          FirebaseFirestoreService.readDocument('usuarios', user.uid).then(
            data => {
              setUser(user);
              setUserData(data);
              setIsLoading(false);
            }
          );
        }
      }
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {isLoading ? (
        <Loading />
      ) : (
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh">
            {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
            <Router>
              <Switch>
                <Route exact path="/">
                  <Landing user={user} userData={userData} />
                </Route>
                <Route path="/registrar">
                  <Signup onRegisterUserChange={handleRegisterUser} />
                </Route>
              </Switch>
            </Router>
          </Grid>
        </Box>
      )}
    </ChakraProvider>
  );
}

export default App;

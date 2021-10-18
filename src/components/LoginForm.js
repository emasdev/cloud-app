import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import FirebaseAuthService from '../FirebaseAuthService';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Link,
  VStack,
  Divider,
} from '@chakra-ui/react';

function LoginForm({ user }) {
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    try {
      await FirebaseAuthService.doSignInWithEmailAndPassword(
        values.email,
        values.password
      );
    } catch (error) {
      alert(error.message);
    }
  }

  function handleLogout() {
    FirebaseAuthService.doSignOut();
  }

  return (
    <>
      {user ? (
        <Box>
          <VStack spacing={8}>
            <Text>Bienvenido {user.email}</Text>
            <Button onClick={handleLogout}>Cerrar sesión</Button>
          </VStack>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name} id="email">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="email"
              {...register('email', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.name} id="password">
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              type="password"
              {...register('password', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <VStack>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
            <Link as={RouterLink} to="/registrar">
              Registrar nueva cuenta
            </Link>
          </VStack>
        </form>
      )}
    </>
  );
}

export default LoginForm;

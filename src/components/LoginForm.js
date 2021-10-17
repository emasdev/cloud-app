import React from 'react';
import { useForm } from 'react-hook-form';
import FirebaseAuthService from '../FirebaseAuthService';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';

function LoginForm({ user }) {
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
          <Text>Bienvenido {user.email}</Text>
          <Button onClick={handleLogout}>Cerrar sesión</Button>
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
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
}

export default LoginForm;

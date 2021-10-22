import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import FirebaseAuthService from '../FirebaseAuthService';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
  Link,
  List,
  ListItem,
  ListIcon,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function LoginForm() {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    try {
      await FirebaseAuthService.doSignInWithEmailAndPassword(
        values.email,
        values.password
      );
    } catch (error) {

      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setError("firebase", {
          type: "manual",
          message: "Usuario inexistente.",
        });
      } else {
        alert(error.message);
      }
    }
  }

  function handleLogout() {
    FirebaseAuthService.doSignOut();
  }

  return (
    <Center>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack>
          <Heading fontSize={'4xl'} color={'idm.500'}>
            IDM Cloud
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'} textTransform="uppercase">
            Bienvenido
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            {errors.firebase && (
              <Alert status="error" variant="left-accent" rounded="md" my={6}>
                <AlertIcon />
                <AlertDescription>{errors.firebase.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email">
                <FormLabel color={'gray.600'}>Correo Electrónico</FormLabel>
                <Input
                  placeholder="Email"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio',
                    },
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && (
                  <Alert
                    status="error"
                    rounded="md"
                    variant="left-accent"
                    mt={2}
                  >
                    <AlertIcon />
                    <AlertDescription>{errors.email.message}</AlertDescription>
                  </Alert>
                )}
              </FormControl>
              <FormControl id="password" mt={3}>
                <FormLabel color={'gray.600'}>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Password"
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'Este campo es obligatorio',
                      },
                      minLength: {
                        value: 6,
                        message:
                          'El password debe contener minimo 6 caracteres',
                      },
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                      leftIcon={<Icon as={show ? FiEyeOff : FiEye} />}
                    ></Button>
                  </InputRightElement>
                </InputGroup>

                {errors.password && (
                  <Alert
                    status="error"
                    rounded="md"
                    variant="left-accent"
                    mt={2}
                  >
                    <AlertIcon />
                    <AlertDescription>
                      {errors.password.message}
                    </AlertDescription>
                  </Alert>
                )}
              </FormControl>
              <Stack mt={4}>
                <Button
                  mt={4}
                  colorScheme="idm"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Ingresar
                </Button>
                <Link color={'idm.500'} textAlign="center">
                  ¿Olvidaste tu password?
                </Link>
              </Stack>
              <Stack mt={4}>
                <Button onClick={() => history.push('/registrar')}>
                  Crear cuenta
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
}

export default LoginForm;

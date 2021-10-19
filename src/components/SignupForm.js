import React from 'react';
import { useForm } from 'react-hook-form';
import FirebaseAuthService from '../FirebaseAuthService';
import FirebaseFirestoreService from '../FirebaseFirestoreService';
import FirebaseStorageService from '../FirebaseStorageService';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

function SignupForm({ user }) {
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    try {
      let userId = null;
      let imageUrl = null;

      // Crear Usuario
      await FirebaseAuthService.doCreateUserWithEmailAndPassword(
        values.email,
        values.password
      ).then(userCredential => {
        const user = userCredential.user;
        userId = user.uid;
      });

      //Crear imagen si hay
      const file = values.image[0];
      imageUrl = await FirebaseStorageService.uploadAvatarImg(
        file,
        `avatar/${userId}`,
        progress => {
          console.log(progress);
        }
      );

      // Crear Usuario en Docs
      const docData = {
        nombre: values.nombre,
        apellidos: values.apellidos,
        imageUrl: imageUrl,
      };

      await FirebaseFirestoreService.createDocument(
        'usuarios',
        userId,
        docData
      );

      // Ir a dashboard
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleLogout() {
    try {
      await FirebaseAuthService.doSignOut();
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      {user ? (
        <Box>
          <VStack spacing={8}>
            <Text>Ya está autentificado desde su cuenta: {user.email}</Text>
            <Button onClick={handleLogout}>Cerrar sesión</Button>
            <Button onClick={() => history.push('/')}>Ir a dashboard</Button>
          </VStack>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="image">
            <FormLabel>Imagen de perfil</FormLabel>
            <Input type="file" accept="image/*" {...register('image')} />
          </FormControl>

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
          <Divider my={4} />
          <FormControl isInvalid={errors.nombre} id="nombre">
            <FormLabel>Nombre(s)</FormLabel>
            <Input
              placeholder="Nombre(s)"
              {...register('nombre', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.nombre && errors.nombre.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.apellidos} id="apellidos">
            <FormLabel>Apellido(s)</FormLabel>
            <Input
              placeholder="Apellido(s)"
              {...register('apellidos', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.apellidos && errors.apellidos.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Registrar
          </Button>
        </form>
      )}
    </>
  );
}

export default SignupForm;

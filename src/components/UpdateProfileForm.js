import React from 'react'
import { useForm } from 'react-hook-form';
import FirebaseFirestoreService from '../FirebaseFirestoreService';
import FirebaseStorageService from '../FirebaseStorageService';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Grid,
  Divider,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
  Icon,
} from '@chakra-ui/react';

export default function UpdateProfileForm({ user, userData, handleUserData }) {

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  setValue('nombre', userData.nombre);

  async function onSubmit(values) {

    try {
      let imageUrl = userData.imageUrl;
      if (values.image.length > 0) {
        const file = values.image[0];
        //delete old image
        await FirebaseStorageService.deleteFile(userData.imageUrl);
        imageUrl = await FirebaseStorageService.uploadAvatarImg(
          file,
          `avatar/${user.uid}`,
          progress => {
            console.log(progress);
          }
        );
      }

      let data = {
        nombre: values.nombre,
        imageUrl: imageUrl,
      }

      await FirebaseFirestoreService.updateDocument("usuarios", user.uid, data);

      handleUserData(data);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Stack spacing={8}>
      <Heading fontSize={'4xl'} color="idm.800">
        Editar perfil
      </Heading>
      {errors.firebase && (
        <Alert status="error" variant="left-accent" rounded="md" my={6}>
          <AlertIcon />
          <AlertDescription>{errors.firebase.message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h3" size="md">
          Datos de la cuenta
        </Heading>
        <FormControl id="image">
          <FormLabel>Imagen de perfil</FormLabel>
          <Input type="file" accept="image/*" {...register('image')} />
        </FormControl>
        <Divider my={8} />
        <Heading as="h3" size="md">
          Datos del Doctor
        </Heading>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={4} mt={4}>
          <FormControl id="nombre">
            <FormLabel>Nombre(s)</FormLabel>
            <Input
              placeholder="Nombre(s)"
              {...register('nombre', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
            />
            {errors.nombre && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.nombre.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
        </Grid>
        <Stack>
          <Button
            colorScheme="idm"
            mt={8}
            mx={'auto'}
            isLoading={isSubmitting}
            type="submit"
          >
            Guardar cambios
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

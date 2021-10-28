import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import FirebaseFirestoreService from '../FirebaseFirestoreService';
import FirebaseStorageService from '../FirebaseStorageService';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Grid,
  Divider,
  Alert,
  AlertIcon,
  AlertDescription,
  Select,
  Textarea,
  FormHelperText,
  Center,
  Avatar,
  Progress,
} from '@chakra-ui/react';

export default function UpdateProfileForm({ user, userData, handleUserData }) {

  const [progress, setProgress] = useState(-1);
  const [imageUrl, setImageUrl] = useState(userData.imageUrl);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  setValue('nombre', userData.nombre);
  setValue('apellido_paterno', userData.apellido_paterno);
  setValue('apellido_materno', userData.apellido_materno);
  setValue('tel', userData.tel);
  setValue('fecha_nacimiento', userData.fecha_nacimiento);
  setValue('especialidad', userData.especialidad);
  setValue('dir_consultorio', userData.dir_consultorio);

  const handleChange = async event => {
    const files = event.target.files;
    const file = files[0];
    console.log('va va v vava');

    if (!file) {
      alert('Error al subir el archivo.');
      return;
    }

    setProgress(0);

    try {
      const downloadUrl = await FirebaseStorageService.uploadFile(
        file,
        `temp/${uuidv4()}`,
        progress => {
          setProgress(progress);
          if (progress == 100) {
            setProgress(-1);
          }
        }
      );

      setImageUrl(downloadUrl);
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  async function onSubmit(values) {
    try {
      let downloadUrl = null;
      if (values.image.length > 0) {
        const file = values.image[0];

        //delete temp image
        await FirebaseStorageService.deleteFile(imageUrl);
        downloadUrl = await FirebaseStorageService.uploadFile(
          file,
          `avatar/${user.uid}`,
          progress => {
            console.log(progress);
          }
        );

        setImageUrl(downloadUrl);
      }

      let data = {
        nombre: values.nombre,
        apellido_paterno: values.apellido_paterno,
        apellido_materno: values.apellido_materno,
        tel: values.tel,
        fecha_nacimiento: values.fecha_nacimiento,
        especialidad: values.especialidad,
        dir_consultorio: values.dir_consultorio,
        imageUrl: downloadUrl,
      };

      await FirebaseFirestoreService.updateDocument('usuarios', user.uid, data);

      handleUserData(data);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    //effect
    return () => {
      if (imageUrl !== userData.imageUrl) {
        FirebaseStorageService.deleteFile(imageUrl);
      }
    };
  }, []);

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
        {/* <FormControl id="image">
          <FormLabel>Imagen de perfil</FormLabel>
          <Input type="file" accept="image/*" {...register('image')} />
        </FormControl> */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={4} mt={4}>
          <FormControl id="image">
            <FormLabel>Imagen de perfil</FormLabel>
            <Center mb={2}>
              <Avatar size="xl" src={imageUrl} />
            </Center>
            {progress > -1 && <Progress value={progress} />}
            <Input
              type="file"
              accept="image/*"
              {...register('image')}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
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
          <FormControl id="apellido_paterno">
            <FormLabel>Apellido paterno</FormLabel>
            <Input
              placeholder="Apellido paterno"
              {...register('apellido_paterno', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
            />
            {errors.apellido_paterno && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>
                  {errors.apellido_paterno.message}
                </AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="apellido_materno">
            <FormLabel>Apellido materno</FormLabel>
            <Input
              placeholder="Apellido materno"
              {...register('apellido_materno', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
            />
            {errors.apellido_materno && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>
                  {errors.apellido_materno.message}
                </AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="tel">
            <FormLabel>Telefono móvil</FormLabel>
            <Input
              placeholder="Telefono a 10 digitos"
              {...register('tel', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
            />
            {errors.tel && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.tel.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="fecha_nacimiento">
            <FormLabel>Fecha de nacimiento</FormLabel>
            <Input
              type="date"
              {...register('fecha_nacimiento', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
            />
            {errors.fecha_nacimiento && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>
                  {errors.fecha_nacimiento.message}
                </AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="especialidad">
            <FormLabel>Especialidad</FormLabel>
            <Select
              placeholder="Seleccionar especialidad"
              {...register('especialidad', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
            >
              <option>General</option>
              <option>Ortidoncia y Ortopedia</option>
              <option>Cirugia maxilofacial</option>
              <option>Endodoncia</option>
              <option>Periodoncia</option>
              <option>Implantologia</option>
              <option>Odontopediatria</option>
              <option>Odontogediatria</option>
              <option>Protesis</option>
              <option>Otra</option>
            </Select>
            {errors.especialidad && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>
                  {errors.especialidad.message}
                </AlertDescription>
              </Alert>
            )}
          </FormControl>
        </Grid>
        <Divider my={8} />
        <Heading as="h3" size="md">
          Datos de consultorio
        </Heading>
        <Grid templateColumns={{ base: '1fr' }} gap={4} mt={4}>
          <FormControl id="dir_consultorio">
            <FormLabel>Dirección</FormLabel>
            <Textarea
              placeholder="Ingresar la dirección de su consultorio"
              {...register('dir_consultorio', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
            />
            {errors.dir_consultorio && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>
                  {errors.dir_consultorio.message}
                </AlertDescription>
              </Alert>
            )}
            <FormHelperText>
              Dirección en la que se le entregarian los estudios físicos en caso
              que los requiera.
            </FormHelperText>
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
  );
}

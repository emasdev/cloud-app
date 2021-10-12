
import React, { useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  Input,
  InputRightElement,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Textarea,
  Select,
  Grid,
  Divider,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
  Icon
} from "@chakra-ui/react";
import { useHistory, Link as LinkTo } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

export default function SignupForm() {

  const { doCreateUserWithEmailAndPassword, doCreateUserDoc } = useAuth();
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (values) => {
    let user = null;
    let isDocCreated = null;
    try {
      user = await doCreateUserWithEmailAndPassword(
        values.email,
        values.password
      );
      isDocCreated = await doCreateUserDoc(user, {
        nombre: values.nombre,
        apellido_paterno: values.apellido_paterno,
        apellido_materno: values.apellido_materno,
        tel: values.tel,
        fecha_nacimiento: values.fecha_nacimiento,
        especialidad: values.especialidad,
        dir_consultorio: values.dir_consultorio,
      });
      history.push("/");
    } catch (error) {
      setError("firebase", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (

    <Stack spacing={8}>
      <Heading fontSize={"4xl"} color="idm.800">
        Registrar nueva cuenta
      </Heading>
      {errors.firebase && (
        <Alert
          status="error"
          variant="left-accent"
          rounded="md"
          my={6}>
          <AlertIcon />
          <AlertDescription>{errors.firebase.message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h3" size="md">Datos de la cuenta</Heading>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4} mt={4}>
          <FormControl id="email">
            <FormLabel>Correo electrónico</FormLabel>
            <Input placeholder="Correo electrónico"
              {...register("email", {
                required: {
                  value: true,
                  message:
                    "Este campo es obligatorio",
                },
                pattern: /^\S+@\S+$/i,
              })} />
            {errors.email && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="password">
            <FormLabel>Contraseña</FormLabel>
            <InputGroup size="md">
              <Input
                placeholder="Contraseña"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                  minLength: {
                    value: 6,
                    message:
                      "El password tiene que tener 6 carácteres por lo menos",
                  },
                })} />
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
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.password.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="cpassword">
            <FormLabel>Confirmar contraseña</FormLabel>
            <InputGroup size="md">
              <Input
                placeholder="Comfirmar contraseña"
                type="password"
                {...register("cpassword", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                  validate: value =>
                    value === password.current || "Los passwords deben ser   iguales"
                })} />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow2(!show2)}
                  leftIcon={<Icon as={show2 ? FiEyeOff : FiEye} />}
                ></Button>
              </InputRightElement>
            </InputGroup>
            {errors.cpassword && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.cpassword.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
        </Grid>
        <Divider my={8} />
        <Heading as="h3" size="md">Datos del Doctor</Heading>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4} mt={4}>
          <FormControl id="nombre">
            <FormLabel>Nombre(s)</FormLabel>
            <Input placeholder="Nombre(s)"
              {...register("nombre", {
                required: {
                  value: true,
                  message:
                    "Este campo es obligatorio",
                }
              })} />
            {errors.nombre && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.nombre.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="apellido_paterno">
            <FormLabel>Apellido paterno</FormLabel>
            <Input placeholder="Apellido paterno"
              {...register("apellido_paterno", {
                required: {
                  value: true,
                  message:
                    "Este campo es obligatorio",
                }
              })} />
            {errors.apellido_paterno && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.apellido_paterno.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="apellido_materno">
            <FormLabel>Apellido materno</FormLabel>
            <Input placeholder="Apellido materno"
              {...register("apellido_materno", {
                required: {
                  value: true,
                  message:
                    "Este campo es obligatorio",
                }
              })} />
            {errors.apellido_materno && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.apellido_materno.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="tel">
            <FormLabel>Telefono móvil</FormLabel>
            <Input placeholder="Telefono a 10 digitos" {...register("tel", {
              required: {
                value: true,
                message:
                  "Este campo es obligatorio",
              }
            })} />
            {errors.tel && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.tel.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="fecha_nacimiento">
            <FormLabel>Fecha de nacimiento</FormLabel>
            <Input type="date"
              {...register("fecha_nacimiento", {
                required: {
                  value: true,
                  message:
                    "Este campo es obligatorio",
                }
              })} />
            {errors.fecha_nacimiento && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.fecha_nacimiento.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="especialidad">
            <FormLabel>Especialidad</FormLabel>
            <Select placeholder="Seleccionar especialidad"
              {...register("especialidad", {
                required: {
                  value: true,
                  message:
                    "Este campo es obligatorio",
                }
              })}>
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
                <AlertDescription>{errors.especialidad.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>
        </Grid>
        <Divider my={8} />
        <Heading as="h3" size="md">Datos de consultorio</Heading>
        <Grid templateColumns={{ base: "1fr" }} gap={4} mt={4}>
          <FormControl id="dir_consultorio">
            <FormLabel>Dirección</FormLabel>
            <Textarea placeholder="Ingresar la dirección de su consultorio"
              {...register("dir_consultorio", {
                required: {
                  value: true,
                  message:
                    "Este campo es obligatorio",
                }
              })} />
            {errors.dir_consultorio && (
              <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                <AlertIcon />
                <AlertDescription>{errors.dir_consultorio.message}</AlertDescription>
              </Alert>
            )}
            <FormHelperText>Dirección en la que se le entregarian los estudios físicos en caso que los requiera.</FormHelperText>
          </FormControl>
        </Grid>
        <Stack>
          <Button
            colorScheme="idm"
            mt={8} mx={"auto"}
            isLoading={isSubmitting}
            type="submit" >Crear cuenta
          </Button>
          <Stack direction="horizontal" justifyContent={"center"}>
            <Text>¿Ya tiene una cuenta de IDM Cloud?</Text>
            <Link as={LinkTo} ml={2} color="idm.800" to="/">Ingresar</Link>
          </Stack>
        </Stack>

      </form>
    </Stack >
  );
}

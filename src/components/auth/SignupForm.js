import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Textarea,
  Select,
  Grid,
  Divider,
  Link
} from "@chakra-ui/react";
import { useHistory, Link as LinkTo } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

export default function SignupForm() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();

  const { signup } = useAuth();

  const onSubmit = async (data) => {
    try {
      await signup(data.email, data.password);
      history.push("/");
    } catch (error) {
      setError("email", {
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
      <form>
        <Heading as="h3" size="md">Datos de la cuenta</Heading>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4} mt={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Correo electrónico</FormLabel>
            <Input placeholder="Correo electrónico" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input placeholder="Contraseña" />
          </FormControl>
          <FormControl id="cpassword" isRequired>
            <FormLabel>Confirmar contraseña</FormLabel>
            <Input placeholder="Comfirmar contraseña" />
          </FormControl>
        </Grid>
        <Divider my={8} />
        <Heading as="h3" size="md">Datos del Doctor</Heading>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4} mt={4}>
          <FormControl id="nombre" isRequired>
            <FormLabel>Nombre(s)</FormLabel>
            <Input placeholder="Nombre(s)" />
          </FormControl>
          <FormControl id="apellido_paterno" isRequired>
            <FormLabel>Apellido paterno</FormLabel>
            <Input placeholder="Apellido paterno" />
          </FormControl>
          <FormControl id="apellido_materno" isRequired>
            <FormLabel>Apellido materno</FormLabel>
            <Input placeholder="Apellido materno" />
          </FormControl>
          <FormControl id="tel" isRequired>
            <FormLabel>Telefono móvil</FormLabel>
            <Input placeholder="Telefono a 10 digitos" />
          </FormControl>
          <FormControl id="fecha_nacimiento" isRequired>
            <FormLabel>Fecha de nacimiento</FormLabel>
            <Input type="date" />
          </FormControl>
          <FormControl id="especialidad" isRequired>
            <FormLabel>Especialidad</FormLabel>
            <Select placeholder="Seleccionar especialidad">
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
          </FormControl>
        </Grid>
        <Divider my={8} />
        <Heading as="h3" size="md">Datos de consultorio</Heading>
        <Grid templateColumns={{ base: "1fr" }} gap={4} mt={4}>
          <FormControl id="fecha_nacimiento" isRequired>
            <FormLabel>Dirección</FormLabel>
            <Textarea placeholder="Ingresar la dirección de su consultorio" />
            <FormHelperText>Dirección en la que se le entregarian los estudios físicos en caso que los requiera.</FormHelperText>
          </FormControl>
        </Grid>
        <Stack>
          <Button colorScheme="idm" mt={8} mx={"auto"}  >Crear cuenta</Button>
          <Stack direction="horizontal" justifyContent={"center"}>
            <Text>¿Ya tiene una cuenta de IDM Cloud?</Text>
            <Link as={LinkTo} ml={2} color="idm.800" to="/">Ingresar</Link>
          </Stack>
        </Stack>

      </form>
    </Stack >
  );
}

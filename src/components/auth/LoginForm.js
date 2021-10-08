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
  Link
} from "@chakra-ui/react";
import { useHistory } from "react-router";

import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();

  const { login } = useAuth();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Center>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack >
          <Heading fontSize={"4xl"} color={"idm.500"}>
            IDM Cloud
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"} textTransform="uppercase">
            Bienvenido
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {errors.size && (
              <Alert status="error" variant="subtle" mt={6} mb={6}>
                <AlertIcon />
                {errors.email.message}
                <AlertIcon />
                {errors.password.message}
              </Alert>
            )}
            {/* {isSubmitSuccessful && (
              <Alert status="success" variant="subtle" mt={6} mb={6}>
                <AlertIcon></AlertIcon>
                Se le ha enviado una confirmación a su correo electronico.
              </Alert>
            )} */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email">
                <FormLabel color={"gray.600"}>
                  Correo Electrónico
                </FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message:
                        "Es necesario escribir un email asociado a su cuenta IDM",
                    },
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </FormControl>
              <FormControl id="password" mt={3}>
                <FormLabel color={"gray.600"}>Password</FormLabel>
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Es necesario escribir un password correcto",
                    },
                    minLength: {
                      value: 6,
                      message:
                        "El password tiene que tener 6 carácteres por lo menos",
                    },
                  })}
                />
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
                <Link color={"blue.400"} textAlign="center">¿Olvidaste tu password?</Link>
              </Stack>
              <Stack mt={4}>
                <Button onClick={() => history.push("/signup")}>
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

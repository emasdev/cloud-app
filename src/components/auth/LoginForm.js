import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Alert,
  AlertIcon,
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
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Ingresar a IDM
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Y utilice esta gran herramienta
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
                <FormLabel>
                  Ingresar el email asociado a su cuenta IDM
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
                <FormLabel>Password</FormLabel>
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
              <Stack spacing={10} mt={4}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Recordar</Checkbox>
                  <Link color={"blue.400"}>¿Olvidaste tu password?</Link>
                </Stack>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="blue"
                >
                  Ingresar
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
}

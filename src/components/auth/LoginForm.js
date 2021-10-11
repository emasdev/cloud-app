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
  ListIcon
} from "@chakra-ui/react";
import { useHistory } from "react-router";

import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { v4 as uuidv4 } from 'uuid';

export default function LoginForm() {

  const { doSignInWithEmailAndPassword } = useAuth();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
    let user = null;
    try {
      user = await doSignInWithEmailAndPassword(values.email, values.password);
      history.push("/");
    } catch (e) {
      console.log(e);
      setError("firebase", {
        type: "manual",
        message: "El correo electrónico y/o password es incorrecto",
      });
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
              <FormControl id="email">
                <FormLabel color={"gray.600"}>
                  Correo Electrónico
                </FormLabel>
                <Input
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message:
                        "Es necesario escribir un email asociado a su cuenta IDM",
                    },
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && (
                  <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                    <AlertIcon />
                    <AlertDescription>{errors.email.message}</AlertDescription>
                  </Alert>
                )}
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
                      message: "Es necesario escribir el password",
                    },
                    minLength: {
                      value: 6,
                      message:
                        "El password tiene que tener 6 carácteres por lo menos",
                    },
                  })}
                />
                {errors.password && (
                  <Alert status="error" rounded="md" variant="left-accent" mt={2}>
                    <AlertIcon />
                    <AlertDescription>{errors.password.message}</AlertDescription>
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
                <Link color={"idm.500"} textAlign="center">¿Olvidaste tu password?</Link>
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

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
  Link,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import { WarningIcon } from '@chakra-ui/icons'
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
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
    let user = null;
    try {
      user = await doSignInWithEmailAndPassword(values.email, values.password);
      history.push("/");
    } catch (e) {
      console.error(e.message);
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
            {Object.keys(errors).length > 0 && (
              <Alert
                status="error"
                variant="left-accent"
                rounded="md"
                my={6}>
                <List>
                  {Object.entries(errors).map((error) => (

                    <ListItem my={4} key={uuidv4()}>
                      <ListIcon as={WarningIcon} w={4} h={4} color="red.500" />
                      {error[1].message}
                    </ListItem>
                  ))}
                </List>
              </Alert>
            )}

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
                      message: "Es necesario escribir el password",
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

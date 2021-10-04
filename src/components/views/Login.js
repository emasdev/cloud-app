import { useForm } from "react-hook-form";
import React from "react";
import { withRouter } from "react-router-dom";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import Layout from "../Layout/Layout";
import { useAuth } from "../../hooks/useAuth";

const Login = ({ history }) => {
  const { doSignInWithEmailAndPassword } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    let user = null;
    try {
      user = await doSignInWithEmailAndPassword(values.email, values.password);
      history.push("/");
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="email"
            type="email"
            {...register("email", {
              required: "Este campo es requerido",
              pattern: /^\S+@\S+$/i,
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            placeholder="password"
            type="password"
            {...register("password", { required: "Este campo es requerido" })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Divider />
        <Button
          mt={4}
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
        >
          Ingresar
        </Button>
      </form>
    </Layout>
  );
};

export default withRouter(Login);

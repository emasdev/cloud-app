import React from "react";
import Layout from "../Layout/Layout";
import { Text, Box } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

const Landing = () => {
  const { user, userData } = useAuth();
  return (
    <Layout>
      <Box textAlign="center">
        <Text>Bienvenido a IDM</Text>
        {user && userData && (
          <Box>
            <Text>
              Hola {userData.nombre} {userData.apellidos}
            </Text>
            <Text>Tu correo es: {user.email}</Text>
            <Text>
              Lo que significa que tengo tus datos de autentificación y usuario
              :)
            </Text>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Landing;

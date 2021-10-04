import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Flex, Heading, Spacer, Button, SimpleGrid } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";

const Nav = ({ history }) => {
  const { user, doSignOut } = useAuth();

  return (
    <Flex p={4}>
      <Heading>IDM</Heading>
      <Spacer />

      {!user && (
        <SimpleGrid columns={2} spacing={4}>
          <Link to="/login">
            <Button>Ingresar</Button>
          </Link>
          <Link to="/signup">
            <Button>Registrar</Button>
          </Link>
        </SimpleGrid>
      )}
      {user && (
        <Button
          onClick={() =>
            doSignOut().then((isSignedOut) => {
              isSignedOut && history.push("/");
            })
          }
        >
          Cerrar Sesión
        </Button>
      )}
    </Flex>
  );
};

export default withRouter(Nav);

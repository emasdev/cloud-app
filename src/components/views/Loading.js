import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = ({ children }) => {
  return (
    <Center minH="100vh" bgGradient="linear(to-r, idm.200, idm.800)">
      <Spinner size="xl" />
    </Center>
  );
};

export default Loading;

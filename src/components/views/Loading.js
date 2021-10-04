import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = ({ children }) => {
  return (
    <Center minH="100vh" bgGradient="linear(to-r, gray.200, gray.500)">
      <Spinner size="xl" />
    </Center>
  );
};

export default Loading;

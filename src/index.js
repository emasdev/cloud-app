import React, { StrictMode } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom";

import App from "./components/App";

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root")
);

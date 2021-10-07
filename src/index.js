import React, { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme"
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

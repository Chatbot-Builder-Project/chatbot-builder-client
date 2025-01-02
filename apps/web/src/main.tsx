import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "@chatbot-builder/client";
import GlobalStyle from "./globalStyle";
import { Provider } from "react-redux";
import { store } from "@chatbot-builder/store";

console.log(router);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

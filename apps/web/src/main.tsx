import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "@chatbot-builder/client";
import GlobalStyle from "./globalStyle";
import { Provider } from "react-redux";
import { store } from "@chatbot-builder/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

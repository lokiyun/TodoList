import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import App from "./App";
import { DarkTheme } from "./theme";
import GlobalStyle from "./components/GlobalStyle";

const Root = createRoot(document.getElementById("root"));

Root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={DarkTheme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);

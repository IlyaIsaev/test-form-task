import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "polished";

const theme = {
  colors: {
    dark: "#000",
    light: "#fff",
    primaryLight: "#89a9d5",
    primary: "#4970b3",
    success: "#7a9d48",
    danger: "#b44646",
    secondary: "#e8e8e8",
    secondaryLight: "#fcfcfc",
  },
};

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  * {
    box-sizing: border-box;
  }

  html, body, #__next {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    font-family: ${(props) => props.theme.fonts.body};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.primary};
    line-height: 1.6;
    min-height: 100vh; 
    overflow: hidden;
  }

  button {
    color: ${(props) => props.theme.colors.accent};
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.01);
      opacity: 0.9;
    }
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;

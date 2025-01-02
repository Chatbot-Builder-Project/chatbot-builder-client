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
    color: ${(props) => props.theme.colors.text};
    line-height: 1.6;
    min-height: 100vh; 
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.colors.accent};
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
    color: ${(props) => props.theme.colors.accent};
    text-decoration: none;
    
    &:hover {
      color: ${(props) => props.theme.colors.muted};
    }
  }
`;

export default GlobalStyle;

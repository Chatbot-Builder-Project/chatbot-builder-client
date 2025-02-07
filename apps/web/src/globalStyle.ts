import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    font-family: ${(props) => props.theme.fonts.body};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.primary};
    line-height: 1.6;
    min-height: 100vh; 
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.colors.dark};
    }

    &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.colors.gray};
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${(props) => props.theme.colors.nodeBackground};
    }
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

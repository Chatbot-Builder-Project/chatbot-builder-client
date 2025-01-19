import { Theme } from "./types";

export const theme: Theme = {
  colors: {
    primary: "#009bff",
    secondary: "#6A5F8E",
    gray: "#2b2b2b",
    primaryGradient: "linear-gradient(135deg, #6A00FF, #A600FF, #E100FF)",
    background: "#1d1d1d",
    secondaryBackground: "#111111",
    nodeBackground: "#373737",
    accent: "#D1B3FF",
    text: "#101012",
    purple: "#632edb",
    lightText: "#fffdf9",
    muted: "#009bff",
    dark: "#101012",
    brightYellow: "#FFC300",
    brightOrange: "#FF5733",
    brightGreen: "#DAF7A6",
    brightAqua: "#33FFBD",
    brightPink: "#FF33F6",
    error: "#FF4C4C",
    success: "#4CAF50",
  },
  fonts: {
    body: "'Montserrat', sans-serif",
    heading: "'Bagel Fat One', serif",
  },
  fontSizes: {
    small: "0.875rem",
    medium: "1rem",
    large: "1.5rem",
    xl: "2rem",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "1024px",
  },
};

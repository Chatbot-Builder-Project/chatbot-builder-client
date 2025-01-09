import { Theme } from "./types";

export const theme: Theme = {
  colors: {
    primary: "#632edb",
    secondary: "#6A5F8E",
    primaryGradient: "linear-gradient(135deg, #6A00FF, #A600FF, #E100FF)",
    background: "#f6f9ff",
    secondaryBackground: "#162137",
    nodeBackground: "#ffffff",
    accent: "#D1B3FF",
    text: "#101012",
    lightText: "#fffdf9",
    muted: "#8A7FB1",
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

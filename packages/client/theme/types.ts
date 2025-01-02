interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  text: string;
  muted: string;
  dark: string;
  brightYellow: string;
  brightOrange: string;
  brightGreen: string;
  brightAqua: string;
  brightPink: string;
  error: string;
  success: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: {
    body: string;
    heading: string;
  };
  fontSizes: {
    small: string;
    medium: string;
    large: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

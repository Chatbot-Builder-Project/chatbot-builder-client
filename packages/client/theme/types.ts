interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  secondaryBackground: string;
  nodeBackground: string;
  accent: string;
  primaryGradient: string;
  text: string;
  lightText: string;
  gray: string;
  lightGray: string;
  muted: string;
  purple: string;
  dark: string;
  brightYellow: string;
  brightOrange: string;
  black: string;
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
    xxl: string;
    veryLarge: string;
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

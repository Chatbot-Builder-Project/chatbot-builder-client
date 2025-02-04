import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export const useBreakpoint = () => {
  const theme = useTheme();

  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  if (xl) return "xl" as Breakpoint;
  if (lg) return "lg" as Breakpoint;
  if (md) return "md" as Breakpoint;
  if (sm) return "sm" as Breakpoint;
  return "xs" as Breakpoint;
};

import { ChatComponentStyles } from "./types";
import { SxProps, Theme } from "@mui/material/styles";
import { theme } from "@chatbot-builder/client/theme/palette";

export const defaultStyles: ChatComponentStyles = {
  header: {
    xs: {
      backgroundColor: theme.colors.background,
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      borderBottom: `1px solid ${theme.colors.nodeBackground}`,
      display: "flex",
      alignItems: "center",
    },
    sm: {
      backgroundColor: theme.colors.background,
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      borderBottom: `1px solid ${theme.colors.nodeBackground}`,
      display: "flex",
      alignItems: "center",
    },
    md: {
      backgroundColor: theme.colors.background,
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      borderBottom: `1px solid ${theme.colors.nodeBackground}`,
      display: "flex",
      alignItems: "center",
    },
    lg: {
      backgroundColor: theme.colors.background,
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      borderBottom: `1px solid ${theme.colors.nodeBackground}`,
      display: "flex",
      alignItems: "center",
    },
    xl: {
      backgroundColor: theme.colors.background,
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      borderBottom: `1px solid ${theme.colors.nodeBackground}`,
      display: "flex",
      alignItems: "center",
    },
  } as SxProps<Theme>,
  background: {
    xs: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: theme.colors.secondaryBackground,
      padding: { xs: 1, sm: 2, md: 3 },
    },
    sm: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: theme.colors.secondaryBackground,
      padding: { xs: 1, sm: 2, md: 3 },
    },
    md: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: theme.colors.secondaryBackground,
      padding: { xs: 1, sm: 2, md: 3 },
    },
    lg: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: theme.colors.secondaryBackground,
      padding: { xs: 1, sm: 2, md: 3 },
    },
    xl: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: theme.colors.secondaryBackground,
      padding: { xs: 1, sm: 2, md: 3 },
    },
  } as SxProps<Theme>,
  botMessage: {
    xs: {
      maxWidth: "70%",
      backgroundColor: theme.colors.nodeBackground,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    sm: {
      maxWidth: "70%",
      backgroundColor: theme.colors.nodeBackground,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    md: {
      maxWidth: "70%",
      backgroundColor: theme.colors.nodeBackground,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    lg: {
      maxWidth: "70%",
      backgroundColor: theme.colors.nodeBackground,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    xl: {
      maxWidth: "70%",
      backgroundColor: theme.colors.nodeBackground,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
  } as SxProps<Theme>,
  senderMessage: {
    xs: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    sm: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    md: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    lg: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    xl: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
  } as SxProps<Theme>,
  messageInputSection: {
    xs: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
    },
    sm: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
    },
    md: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
    },
    lg: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
    },
    xl: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
    },
  } as SxProps<Theme>,
  messageInput: {
    xs: {
      flex: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: theme.colors.secondaryBackground,
        color: theme.colors.lightText,
        "& fieldset": {
          borderColor: theme.colors.nodeBackground,
        },
        "&:hover fieldset": {
          borderColor: theme.colors.primary,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.colors.primary,
        },
      },
    },
    sm: {
      "& .MuiOutlinedInput-root": {
        borderRadius: { xs: 2, sm: 2 },
      },
    },
    md: {
      "& .MuiOutlinedInput-root": {
        borderRadius: { xs: 2, sm: 2 },
      },
    },
    lg: {
      "& .MuiOutlinedInput-root": {
        borderRadius: { xs: 2, sm: 2 },
      },
    },
    xl: {
      "& .MuiOutlinedInput-root": {
        borderRadius: { xs: 2, sm: 2 },
      },
    },
  } as SxProps<Theme>,
  headerContent: {
    xs: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
    },
    sm: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
    },
    md: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
    },
    lg: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
    },
    xl: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
    },
  } as SxProps<Theme>,
  sendButton: {
    xs: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      "&:hover": {
        backgroundColor: theme.colors.purple,
      },
      icon: "IconSend",
    },
    sm: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      "&:hover": {
        backgroundColor: theme.colors.purple,
      },
      icon: "IconSend",
    },
    md: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      "&:hover": {
        backgroundColor: theme.colors.purple,
      },
      icon: "IconSend",
    },
    lg: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      "&:hover": {
        backgroundColor: theme.colors.purple,
      },
      icon: "IconSend",
    },
    xl: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      "&:hover": {
        backgroundColor: theme.colors.purple,
      },
      icon: "IconSend",
    },
  } as SxProps<Theme>,
} as ChatComponentStyles;

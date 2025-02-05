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
      fontFamily: 'Montserrat',
    },
    sm: {
      maxWidth: "70%",
      backgroundColor: theme.colors.nodeBackground,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
      fontFamily: 'Montserrat',
    },
    md: {
      maxWidth: "70%",
      backgroundColor: theme.colors.nodeBackground,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
      fontFamily: 'Montserrat',
    },
    lg: {
      maxWidth: "70%",
      backgroundColor: theme.colors.nodeBackground,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
      fontFamily: 'Montserrat',
    },
    xl: {
      maxWidth: "70%",
      backgroundColor: theme.colors.nodeBackground,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
      fontFamily: 'Montserrat',
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
      fontFamily: 'Montserrat',
    },
    sm: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
      fontFamily: 'Montserrat',
    },
    md: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
      fontFamily: 'Montserrat',
    },
    lg: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
      fontFamily: 'Montserrat',
    },
    xl: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
      fontFamily: 'Montserrat',
    },
  } as SxProps<Theme>,
  messageInputSection: {
    xs: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
      fontFamily: 'Montserrat',
    },
    sm: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
      fontFamily: 'Montserrat',
    },
    md: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
      fontFamily: 'Montserrat',
    },
    lg: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
      fontFamily: 'Montserrat',
    },
    xl: {
      padding: { xs: 1, sm: 2 },
      borderTop: `1px solid ${theme.colors.nodeBackground}`,
      backgroundColor: theme.colors.background,
      fontFamily: 'Montserrat',
    },
  } as SxProps<Theme>,
  messageInput: {
    xs: {
      flex: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: `${theme.colors.secondaryBackground} !important`,
        color: theme.colors.lightText,
        transition: "all 0.2s ease-in-out",
        "& fieldset": {
          borderColor: theme.colors.nodeBackground,
          transition: "all 0.2s ease-in-out",
        },
        "&:hover fieldset": {
          borderColor: theme.colors.primary,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.colors.primary,
          borderWidth: "2px",
        },
        "& input": {
          padding: "12px 14px",
          fontSize: "0.875rem",
          fontFamily: "Montserrat",
        },
        "&::placeholder": {
          color: `${theme.colors.lightText}80`,
          opacity: 1,
        },
      },
    },
    sm: {
      flex: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: `${theme.colors.secondaryBackground} !important`,
        color: theme.colors.lightText,
        transition: "all 0.2s ease-in-out",
        "& fieldset": {
          borderColor: theme.colors.nodeBackground,
          transition: "all 0.2s ease-in-out",
        },
        "&:hover fieldset": {
          borderColor: theme.colors.primary,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.colors.primary,
          borderWidth: "2px",
        },
        "& input": {
          padding: "12px 14px",
          fontSize: "0.875rem",
          fontFamily: "Montserrat",
        },
        "&::placeholder": {
          color: `${theme.colors.lightText}80`,
          opacity: 1,
        },
      },
    },
    md: {
      flex: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: `${theme.colors.secondaryBackground} !important`,
        color: theme.colors.lightText,
        transition: "all 0.2s ease-in-out",
        "& fieldset": {
          borderColor: theme.colors.nodeBackground,
          transition: "all 0.2s ease-in-out",
        },
        "&:hover fieldset": {
          borderColor: theme.colors.primary,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.colors.primary,
          borderWidth: "2px",
        },
        "& input": {
          padding: "12px 14px",
          fontSize: "0.875rem",
          fontFamily: "Montserrat",
        },
        "&::placeholder": {
          color: `${theme.colors.lightText}80`,
          opacity: 1,
        },
      },
    },
    lg: {
      flex: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: `${theme.colors.secondaryBackground} !important`,
        color: theme.colors.lightText,
        transition: "all 0.2s ease-in-out",
        "& fieldset": {
          borderColor: theme.colors.nodeBackground,
          transition: "all 0.2s ease-in-out",
        },
        "&:hover fieldset": {
          borderColor: theme.colors.primary,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.colors.primary,
          borderWidth: "2px",
        },
        "& input": {
          padding: "12px 14px",
          fontSize: "0.875rem",
          fontFamily: "Montserrat",
        },
        "&::placeholder": {
          color: `${theme.colors.lightText}80`,
          opacity: 1,
        },
      },
    },
    xl: {
      flex: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: `${theme.colors.secondaryBackground} !important`,
        color: theme.colors.lightText,
        transition: "all 0.2s ease-in-out",
        "& fieldset": {
          borderColor: theme.colors.nodeBackground,
          transition: "all 0.2s ease-in-out",
        },
        "&:hover fieldset": {
          borderColor: theme.colors.primary,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.colors.primary,
          borderWidth: "2px",
        },
        "& input": {
          padding: "12px 14px",
          fontSize: "0.875rem",
          fontFamily: "Montserrat",
        },
        "&::placeholder": {
          color: `${theme.colors.lightText}80`,
          opacity: 1,
        },
      },
    },
  } as SxProps<Theme>,
  headerContent: {
    xs: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
      fontFamily: 'Montserrat',
    },
    sm: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
      fontFamily: 'Montserrat',
    },
    md: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
      fontFamily: 'Montserrat',
    },
    lg: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
      fontFamily: 'Montserrat',
    },
    xl: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: theme.colors.lightText,
      fontFamily: 'Montserrat',
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
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: theme.colors.purple,
        transform: "scale(1.05)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
      "&.Mui-disabled": {
        backgroundColor: `${theme.colors.primary}60`,
        color: `${theme.colors.lightText}60`,
      },
      icon: "IconSend",
      fontFamily: "Montserrat",
    },
    sm: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: theme.colors.purple,
        transform: "scale(1.05)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
      "&.Mui-disabled": {
        backgroundColor: `${theme.colors.primary}60`,
        color: `${theme.colors.lightText}60`,
      },
      icon: "IconSend",
      fontFamily: "Montserrat",
    },
    md: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: theme.colors.purple,
        transform: "scale(1.05)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
      "&.Mui-disabled": {
        backgroundColor: `${theme.colors.primary}60`,
        color: `${theme.colors.lightText}60`,
      },
      icon: "IconSend",
      fontFamily: "Montserrat",
    },
    lg: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: theme.colors.purple,
        transform: "scale(1.05)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
      "&.Mui-disabled": {
        backgroundColor: `${theme.colors.primary}60`,
        color: `${theme.colors.lightText}60`,
      },
      icon: "IconSend",
      fontFamily: "Montserrat",
    },
    xl: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: theme.colors.primary,
      color: theme.colors.lightText,
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: theme.colors.purple,
        transform: "scale(1.05)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
      "&.Mui-disabled": {
        backgroundColor: `${theme.colors.primary}60`,
        color: `${theme.colors.lightText}60`,
      },
      icon: "IconSend",
      fontFamily: "Montserrat",
    },
  } as SxProps<Theme>,
} as ChatComponentStyles;

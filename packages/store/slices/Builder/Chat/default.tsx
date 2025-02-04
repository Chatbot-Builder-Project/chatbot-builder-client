import { ChatComponentStyles } from "./types";
import { SxProps, Theme } from "@mui/material/styles";

export const defaultStyles: ChatComponentStyles = {
  header: {
    xs: {
      backgroundColor: "#fafafa",
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      borderBottom: "none",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
    },
    sm: {
      backgroundColor: "#fafafa",
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
    },
    md: {
      backgroundColor: "#fafafa",
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
    },
    lg: {
      backgroundColor: "#fafafa",
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
    },
    xl: {
      backgroundColor: "#fafafa",
      height: { xs: 56, sm: 60, md: 64 },
      padding: { xs: 1, sm: 2 },
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
    },
  } as SxProps<Theme>,
  background: {
    xs: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: "#f9f9f9",
      padding: { xs: 1, sm: 2, md: 3 },
    },
    sm: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: "#f9f9f9",
      padding: { xs: 1, sm: 2, md: 3 },
    },
    md: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: "#f9f9f9",
      padding: { xs: 1, sm: 2, md: 3 },
    },
    lg: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: "#f9f9f9",
      padding: { xs: 1, sm: 2, md: 3 },
    },
    xl: {
      height: "100%",
      width: "100%",
      flex: 1,
      backgroundColor: "#f9f9f9",
      padding: { xs: 1, sm: 2, md: 3 },
    },
  } as SxProps<Theme>,
  botMessage: {
    xs: {
      maxWidth: "70%",
      backgroundColor: "#e5e7eb",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    sm: {
      maxWidth: "70%",
      backgroundColor: "#e5e7eb",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    md: {
      maxWidth: "70%",
      backgroundColor: "#e5e7eb",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    lg: {
      maxWidth: "70%",
      backgroundColor: "#e5e7eb",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    xl: {
      maxWidth: "70%",
      backgroundColor: "#e5e7eb",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
  } as SxProps<Theme>,
  senderMessage: {
    xs: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: "#2563eb",
      color: "#fff",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    sm: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: "#2563eb",
      color: "#fff",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    md: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: "#2563eb",
      color: "#fff",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    lg: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: "#2563eb",
      color: "#fff",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
    xl: {
      maxWidth: "70%",
      marginLeft: "auto",
      backgroundColor: "#2563eb",
      color: "#fff",
      borderRadius: 2,
      padding: { xs: 1, sm: 2 },
      marginBottom: 2,
    },
  } as SxProps<Theme>,
  messageInputSection: {
    xs: {
      padding: { xs: 1, sm: 2 },
      borderTop: "1px solid",
      borderColor: "divider",
      backgroundColor: "#fafafa",
    },
    sm: {
      padding: { xs: 1, sm: 2 },
      borderTop: "1px solid",
      borderColor: "divider",
      backgroundColor: "#fafafa",
    },
    md: {
      padding: { xs: 1, sm: 2 },
      borderTop: "1px solid",
      borderColor: "divider",
      backgroundColor: "#fafafa",
    },
    lg: {
      padding: { xs: 1, sm: 2 },
      borderTop: "1px solid",
      borderColor: "divider",
      backgroundColor: "#fafafa",
    },
    xl: {
      padding: { xs: 1, sm: 2 },
      borderTop: "1px solid",
      borderColor: "divider",
      backgroundColor: "#fafafa",
    },
  } as SxProps<Theme>,
  messageInput: {
    xs: {
      flex: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: "#ffffff",
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
      color: "#1a1a1a",
    },
    sm: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#1a1a1a",
    },
    md: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#1a1a1a",
    },
    lg: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#1a1a1a",
    },
    xl: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#1a1a1a",
    },
  } as SxProps<Theme>,
  sendButton: {
    xs: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: "#2196f3",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
      icon: "IconSend", // Add this line
    },
    sm: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: "#2196f3",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
      icon: "IconSend",
    },
    md: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: "#2196f3",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
      icon: "IconSend",
    },
    lg: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: "#2196f3",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
      icon: "IconSend",
    },
    xl: {
      minWidth: "40px",
      height: "40px",
      marginLeft: 1,
      borderRadius: "8px",
      backgroundColor: "#2196f3",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
      icon: "IconSend",
    },
  } as SxProps<Theme>,
} as ChatComponentStyles;

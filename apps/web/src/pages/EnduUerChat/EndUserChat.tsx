import { Box, TextField, Typography } from "@mui/material";
import { defaultStyles } from "@chatbot-builder/store/slices/Builder/Chat/default";
import SendButton from "../../components/CustomChatEditor/SendButton";
import { useState } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const mockChatState = {
  currentBreakpoint: "lg" as const,
  styles: defaultStyles,
  content: {
    headerText: "Chat with Bot",
    botMessageText: "Hello! How can I help you today?",
    senderMessageText: "Hi there!",
    inputPlaceholder: "Type a message...",
  },
};

export const EndUserChat = () => {
  const [message, setMessage] = useState("");
  const currentBreakpoint = useBreakpoint();
  const { styles, content } = { ...mockChatState };

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ ...styles.header[currentBreakpoint] }}>
        <Typography sx={{ ...styles.headerContent[currentBreakpoint] }}>
          {content.headerText}
        </Typography>
      </Box>

      <Box
        sx={{
          height: "100%",
          ...styles.background[currentBreakpoint],
        }}
      >
        <Box sx={{ ...styles.botMessage[currentBreakpoint] }}>
          <Typography>{content.botMessageText}</Typography>
        </Box>

        <Box sx={{ ...styles.senderMessage[currentBreakpoint] }}>
          <Typography>{content.senderMessageText}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ...styles.messageInputSection[currentBreakpoint],
        }}
      >
        <Box sx={{ ...styles.messageInput[currentBreakpoint] }}>
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={content.inputPlaceholder}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box
          onClick={handleSend}
          sx={{
            cursor: "pointer",
            ...styles.sendButton[currentBreakpoint],
          }}
        >
          <SendButton styles={styles.sendButton} />
        </Box>
      </Box>
    </Box>
  );
};

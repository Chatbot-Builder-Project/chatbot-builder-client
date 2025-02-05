import { Box, TextField, Typography } from "@mui/material";
import { defaultStyles } from "@chatbot-builder/store/slices/Builder/Chat/default";
import SendButton from "../../components/CustomChatEditor/SendButton";
import { useState, useEffect } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import {
  useCreateConversationMutation,
  useGetConversationMessagesQuery,
} from "@chatbot-builder/store/API/builder/builder";
import { useParams } from "react-router-dom";

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
  const { chatbotId } = useParams();
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const currentBreakpoint = useBreakpoint();
  const { styles, content } = { ...mockChatState };

  const [createConversation] = useCreateConversationMutation();
  // const [sendMessage] = useSendMessageMutation();
  const { data: messages = [] } = useGetConversationMessagesQuery(
    conversationId ?? "",
    { skip: !conversationId }
  );

  useEffect(() => {
    const initConversation = async () => {
      try {
        const result = await createConversation({
          chatbotId,
          name: "test",
        }).unwrap();
        setConversationId(result.conversationId);
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    };

    initConversation();
  }, []);

  const handleSend = async () => {
    if (message.trim() && conversationId) {
      try {
        // await sendMessage({
        //   conversationId,
        //   message: message.trim(),
        // }).unwrap();
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
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
          overflowY: "auto",
          ...styles.background[currentBreakpoint],
        }}
      >
        {messages?.map((msg, index) => (
          <Box
            key={index}
            sx={
              msg.role === "assistant"
                ? styles.botMessage[currentBreakpoint]
                : styles.senderMessage[currentBreakpoint]
            }
          >
            <Typography>{msg.content}</Typography>
          </Box>
        ))}
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

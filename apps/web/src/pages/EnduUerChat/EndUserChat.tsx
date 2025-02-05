import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { defaultStyles } from "@chatbot-builder/store/slices/Builder/Chat/default";
import SendButton from "../../components/CustomChatEditor/SendButton";
import { useState, useEffect } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import {
  useCreateConversationMutation,
  useGetConversationMessagesQuery,
  useSendMessageMutation,
} from "@chatbot-builder/store/API/builder/builder";
import { useParams } from "react-router-dom";
import { ConversationMessage } from "@chatbot-builder/store/API/builder/types";

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
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const currentBreakpoint = useBreakpoint();
  const { styles, content } = { ...mockChatState };

  const [createConversation] = useCreateConversationMutation();
  const [sendMessage] = useSendMessageMutation();
  const { data: conversationMessages = [] } = useGetConversationMessagesQuery(
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
        setMessages([result.initialMessage]);
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    };

    initConversation();
  }, []);

  const handleSendOption = async (option: string) => {
    if (conversationId) {
      const userMessage = {
        role: "user",
        textOutput: { text: option, type: "Text" },
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await sendMessage({
          conversationId,
          body: {
            option: {
              option,
              type: "Text",
            },
          },
        }).unwrap();
        setMessages((prev) => [...prev, response.output]);
      } catch (error) {
        console.error("Failed to send option:", error);
      }
    }
  };

  const handleSend = async () => {
    if (message.trim() && conversationId) {
      const userMessage = {
        role: "user",
        textOutput: { text: message.trim(), type: "Text" },
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await sendMessage({
          conversationId,
          body: {
            text: {
              text: message.trim(),
              type: "Text",
            },
          },
        }).unwrap();
        setMessages((prev) => [...prev, response.output]);
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

  const renderMessage = (msg: ConversationMessage) => {
    return (
      <>
        {msg.textOutput && <Typography>{msg.textOutput.text}</Typography>}
        {msg.optionExpected && msg.expectedOptionMetas && (
          <Stack spacing={1} mt={1}>
            {Object.entries(msg.expectedOptionMetas).map(([option, meta]) => (
              <Button
                key={option}
                variant="outlined"
                onClick={() => handleSendOption(option)}
                sx={{ textTransform: "none" }}
              >
                {option}
                {meta.description && (
                  <Typography variant="caption" display="block">
                    {meta.description}
                  </Typography>
                )}
              </Button>
            ))}
          </Stack>
        )}
      </>
    );
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
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={
              msg.role === "user"
                ? styles.senderMessage[currentBreakpoint]
                : styles.botMessage[currentBreakpoint]
            }
          >
            {renderMessage(msg)}
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

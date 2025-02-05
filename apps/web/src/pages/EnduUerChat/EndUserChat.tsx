import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { defaultStyles } from "@chatbot-builder/store/slices/Builder/Chat/default";
import SendButton from "../../components/CustomChatEditor/SendButton";
import { useState, useEffect } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import {
  useCreateConversationMutation,
  useGetConversationQuery,
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
  const { content } = mockChatState;
  const [createConversation] = useCreateConversationMutation();
  const [sendMessage] = useSendMessageMutation();
  const { data: conversation } = useGetConversationQuery(conversationId ?? "", {
    skip: !conversationId,
  });
  const styles = conversation?.visual?.data?.ui || defaultStyles;

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

  const renderMessageContent = (msg: ConversationMessage) => {
    return (
      <Stack spacing={1}>
        {msg.textOutput && (
          <Typography
            sx={{
              whiteSpace: 'pre-line',
              color: 'inherit',
              fontFamily: 'Montserrat',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            {msg.textOutput.text}
          </Typography>
        )}
        {msg.imageOutputs?.map((img, index) => (
          <Box key={index} sx={{ maxWidth: '100%', mt: 1 }}>
            <img 
              src={img.url} 
              alt="Message content" 
              style={{ 
                maxWidth: '100%',
                borderRadius: '4px',
                display: 'block'
              }} 
            />
          </Box>
        ))}
      </Stack>
    );
  };

  const renderOptions = (optionMetas: Record<string, { description?: string; imageData?: { url: string } }>) => {
    return (
      <Stack spacing={1} mt={1}>
        {Object.entries(optionMetas).map(([option, meta]) => (
          <Button
            key={option}
            variant="outlined"
            onClick={() => handleSendOption(option)}
            sx={{ 
              textTransform: 'none',
              justifyContent: 'flex-start',
              textAlign: 'left',
              padding: '12px',
              borderColor: styles.botMessage[currentBreakpoint].backgroundColor,
              color: styles.botMessage[currentBreakpoint].color,
              backgroundColor: 'transparent',
              '&:hover': {
                borderColor: styles.sendButton[currentBreakpoint].backgroundColor,
                backgroundColor: `${styles.sendButton[currentBreakpoint].backgroundColor}10`,
              },
              fontFamily: 'Montserrat',
            }}
          >
            <Stack spacing={1} width="100%">
              <Typography sx={{ fontFamily: 'Montserrat' }}>{option}</Typography>
              {meta.description && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: `${styles.botMessage[currentBreakpoint].color}80`,
                    fontFamily: 'Montserrat'
                  }}
                >
                  {meta.description}
                </Typography>
              )}
              {meta.imageData?.url && (
                <Box sx={{ width: '100%', mt: 1 }}>
                  <img 
                    src={meta.imageData.url} 
                    alt={option} 
                    style={{ 
                      maxWidth: '100%',
                      borderRadius: '4px',
                      display: 'block'
                    }} 
                  />
                </Box>
              )}
            </Stack>
          </Button>
        ))}
      </Stack>
    );
  };

  const renderMessage = (msg: ConversationMessage) => {
    return (
      <Stack spacing={2}>
        {renderMessageContent(msg)}
        {msg.optionExpected && msg.expectedOptionMetas && renderOptions(msg.expectedOptionMetas)}
      </Stack>
    );
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: styles.background[currentBreakpoint].backgroundColor,
      }}
    >
      <Box sx={{ ...styles.header[currentBreakpoint] }}>
        {conversation?.visual?.data?.profilePicture && (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              overflow: 'hidden',
              marginRight: 2,
            }}
          >
            <img
              src={conversation.visual.data.profilePicture.url}
              alt="Bot Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
        <Typography sx={{ ...styles.headerContent[currentBreakpoint] }}>
          {conversation?.visual?.data?.headerText || content.headerText}
        </Typography>
      </Box>

      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
          ...styles.background[currentBreakpoint],
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: `${styles.sendButton[currentBreakpoint].backgroundColor}40`,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: styles.sendButton[currentBreakpoint].backgroundColor,
          },
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
        {messages[messages.length - 1]?.textExpected && (
          <>
            <Box sx={{ ...styles.messageInput[currentBreakpoint] }}>
              <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={conversation?.visual?.data?.inputPlaceholder || content.inputPlaceholder}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    ...styles.messageInput[currentBreakpoint]["& .MuiOutlinedInput-root"],
                  },
                }}
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
          </>
        )}
      </Box>
    </Box>
  );
};

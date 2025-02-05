import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
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

export const EndUserChat = () => {
  const { chatbotId } = useParams();
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [messageErrors, setMessageErrors] = useState<Set<number>>(new Set());
  const currentBreakpoint = useBreakpoint();
  const [createConversation] = useCreateConversationMutation();
  const [sendMessage] = useSendMessageMutation();
  const { data: conversation } = useGetConversationQuery(conversationId ?? "", {
    skip: !conversationId,
  });
  const styles = conversation?.visual?.data?.ui || defaultStyles;
  const content = conversation?.visual?.data?.content;
  const initConversation = async () => {
    try {
      const result = await createConversation({
        chatbotId,
        name: "test",
      }).unwrap();
      setConversationId(result.conversationId);
      setMessages([result.initialMessage]);
      setMessageErrors(new Set()); // Clear errors on new conversation
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  useEffect(() => {
    initConversation();
  }, []);

  const handleSendOption = async (option: string) => {
    if (conversationId) {
      const userMessage = {
        role: "user",
        textOutput: { text: option, type: "Text" },
      };
      const newMessageIndex = messages.length;
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
        setMessageErrors((prev) => new Set([...prev, newMessageIndex]));
      }
    }
  };

  const handleSend = async () => {
    if (message.trim() && conversationId) {
      const userMessage = {
        role: "user",
        textOutput: { text: message.trim(), type: "Text" },
      };
      const newMessageIndex = messages.length;
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
        setMessageErrors((prev) => new Set([...prev, newMessageIndex]));
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
              whiteSpace: "pre-line",
              color: "inherit",
              fontFamily: "Montserrat",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              fontWeight: 400,
              lineHeight: 1.5,
              ...(msg.role === "assistant" && content?.botMessageText 
                ? { "&::before": { content: `"${content.botMessageText}"`, display: "block", marginBottom: 1 } }
                : {}),
            }}
          >
            {msg.textOutput.text}
          </Typography>
        )}
        {msg.imageOutputs?.map((img, index) => (
          <Box key={index} sx={{ maxWidth: "100%", mt: 1 }}>
            <img
              src={img.url}
              alt="Message content"
              style={{
                maxWidth: "100%",
                borderRadius: "4px",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Stack>
    );
  };

  const renderOptions = (
    optionMetas: Record<
      string,
      { description?: string; imageData?: { url: string } }
    >
  ) => {
    return (
      <Stack spacing={1} mt={1}>
        {Object.entries(optionMetas).map(([option, meta]) => (
          <Button
            key={option}
            variant="outlined"
            onClick={() => handleSendOption(option)}
            sx={{
              textTransform: "none",
              justifyContent: "flex-start",
              textAlign: "left",
              padding: "12px",
              borderColor: styles.botMessage[currentBreakpoint].backgroundColor,
              color: styles.botMessage[currentBreakpoint].color,
              backgroundColor: "transparent",
              "&:hover": {
                borderColor:
                  styles.sendButton[currentBreakpoint].backgroundColor,
                backgroundColor: `${styles.sendButton[currentBreakpoint].backgroundColor}10`,
              },
              fontFamily: "Montserrat",
            }}
          >
            <Stack spacing={1} width="100%">
              <Typography sx={{ fontFamily: "Montserrat" }}>
                {option}
              </Typography>
              {meta.description && (
                <Typography
                  variant="caption"
                  sx={{
                    color: `${styles.botMessage[currentBreakpoint].color}80`,
                    fontFamily: "Montserrat",
                  }}
                >
                  {meta.description}
                </Typography>
              )}
              {meta.imageData?.url && (
                <Box sx={{ width: "100%", mt: 1 }}>
                  <img
                    src={meta.imageData.url}
                    alt={option}
                    style={{
                      maxWidth: "100%",
                      borderRadius: "4px",
                      display: "block",
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
        {msg.optionExpected &&
          msg.expectedOptionMetas &&
          renderOptions(msg.expectedOptionMetas)}
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
      <Box
        sx={{
          ...styles.header[currentBreakpoint],
          justifyContent: "space-between",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {content?.profilePicture && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                overflow: "hidden",
                marginRight: 2,
                border: `2px solid ${styles.headerContent[currentBreakpoint].color}40`,
              }}
            >
              <img
                src={content.profilePicture.url}
                alt="Bot Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}
          <Typography 
            sx={{ 
              ...styles.headerContent[currentBreakpoint],
              fontFamily: "Montserrat",
            }}
          >
            {content?.headerText || "Chat"}
          </Typography>
        </Box>
        <IconButton
          onClick={initConversation}
          sx={{
            color: styles.headerContent[currentBreakpoint].color,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <RefreshIcon />
        </IconButton>
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
            sx={{
              ...(msg.role === "user"
                ? styles.senderMessage[currentBreakpoint]
                : styles.botMessage[currentBreakpoint]),
              ...(messageErrors.has(index) && {
                borderColor: "#ff4444",
                borderWidth: 2,
                borderStyle: "solid",
              }),
            }}
          >
            {renderMessage(msg)}
            {messageErrors.has(index) && (
              <Typography
                sx={{
                  color: "#ff4444",
                  fontSize: "0.75rem",
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                Error sending message
                <Button
                  size="small"
                  onClick={initConversation}
                  sx={{
                    color: "#ff4444",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255, 68, 68, 0.1)",
                    },
                  }}
                >
                  Start New Conversation
                </Button>
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px 20px",
          ...styles.messageInputSection[currentBreakpoint],
        }}
      >
        {messages[messages.length - 1]?.textExpected && (
          <>
            <Box sx={{ ...styles.messageInput[currentBreakpoint], flex: 1 }}>
              <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={content?.inputPlaceholder || "Type a message..."}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: `${styles.messageInput[currentBreakpoint]["& .MuiOutlinedInput-root"].backgroundColor} !important`,
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

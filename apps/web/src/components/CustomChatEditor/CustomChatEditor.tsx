import React, { useState } from "react";

import { Box, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  ChatComponent,
  setSelectedComponent,
} from "@chatbot-builder/store/slices/Builder/Chat";
import SendButton from "./SendButton";
import {
  selectChatStyles,
  selectCurrentBreakpoint,
  selectSelectedComponent,
} from "@chatbot-builder/store/slices/Builder/Chat/selectors";
import { RootState } from "@chatbot-builder/store/store";

const ChatContainerSX = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "visible",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
};

const ChatDimensionsBreakpoints = {
  xs: { width: "390px", height: "844px" },
  sm: { width: "576px", height: "934px" },
  md: { width: "768px", height: "1024px" },
  lg: { width: "1024px", height: "768px" },
  xl: { width: "1440px", height: "900px" },
};

type ChatSectionProps = {
  sectionName: ChatComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles: any;
  hoveredSection: string[];
  onHover: (section: string) => void;
  onLeave: () => void;
  children: React.ReactNode;
  stopPropagation?: boolean;
  isSelected: boolean;
};

const ChatSection: React.FC<ChatSectionProps> = ({
  sectionName,
  styles,
  hoveredSection,
  onHover,
  onLeave,
  children,
  stopPropagation = false,
  isSelected,
}) => {
  const dispatch = useDispatch();

  if (!sectionName) return null;

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onHover(sectionName);
  };

  return (
    <Box
      sx={{
        ...styles,
        position: "relative",
        transition: "all 0.2s ease",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          borderRadius: styles?.borderRadius || 0,
          zIndex: 9999,
          transition: "all 0.2s ease",
          outline: isSelected
            ? "2px solid #2196f3"
            : hoveredSection[hoveredSection.length - 1] === sectionName
            ? "1px solid rgba(33, 150, 243, 0.5)"
            : "none",
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedComponent(sectionName));
      }}
    >
      <Box sx={{ display: "contents" }}>{children}</Box>
    </Box>
  );
};

const CustomChatEditor: React.FC = () => {
  const styles = useSelector(selectChatStyles);
  const currentBreakpoint = useSelector(selectCurrentBreakpoint);
  const { width, height } = ChatDimensionsBreakpoints[currentBreakpoint];
  const [hoveredSection, setHoveredSection] = useState<string[]>([]);
  const selectedComponent = useSelector(selectSelectedComponent);
  const content = useSelector((state: RootState) => state.builder.chat.content);
  const handleMouseEnter = (section: string) =>
    setHoveredSection((prev) => [...prev, section]);

  const handleMouseLeave = () => setHoveredSection((prev) => prev.slice(0, -1));
  if (!styles) return null;

  return (
    <Box sx={{ ...ChatContainerSX, width, height }}>
      <ChatSection
        sectionName="header"
        styles={styles.header[currentBreakpoint]}
        hoveredSection={hoveredSection}
        onHover={handleMouseEnter}
        onLeave={handleMouseLeave}
        isSelected={selectedComponent === "header"}
      >
        <ChatSection
          sectionName="headerContent"
          styles={styles.headerContent[currentBreakpoint]}
          hoveredSection={hoveredSection}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
          stopPropagation
          isSelected={selectedComponent === "headerContent"}
        >
          <Typography>{content.headerText}</Typography>
        </ChatSection>
      </ChatSection>

      <ChatSection
        sectionName="background"
        styles={{ ...styles.background[currentBreakpoint], height: "100%" }}
        hoveredSection={hoveredSection}
        onHover={handleMouseEnter}
        onLeave={handleMouseLeave}
        isSelected={selectedComponent === "background"}
      >
        <ChatSection
          sectionName="botMessage"
          styles={styles.botMessage[currentBreakpoint]}
          hoveredSection={hoveredSection}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
          stopPropagation
          isSelected={selectedComponent === "botMessage"}
        >
          <Typography>{content.botMessageText}</Typography>
        </ChatSection>

        <ChatSection
          sectionName="senderMessage"
          styles={styles.senderMessage[currentBreakpoint]}
          hoveredSection={hoveredSection}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
          stopPropagation
          isSelected={selectedComponent === "senderMessage"}
        >
          <Typography>{content.senderMessageText}</Typography>
        </ChatSection>
      </ChatSection>

      <ChatSection
        sectionName="messageInputSection"
        styles={{
          ...styles.messageInputSection[currentBreakpoint],
          display: "flex",
          alignItems: "center",
        }}
        hoveredSection={hoveredSection}
        onHover={handleMouseEnter}
        onLeave={handleMouseLeave}
        isSelected={selectedComponent === "messageInputSection"}
      >
        <ChatSection
          sectionName="messageInput"
          styles={styles.messageInput[currentBreakpoint]}
          hoveredSection={hoveredSection}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
          stopPropagation
          isSelected={selectedComponent === "messageInput"}
        >
          <TextField
            fullWidth
            placeholder={content.inputPlaceholder}
            variant="outlined"
            size="small"
            disabled
            sx={{ pointerEvents: "none" }}
          />
        </ChatSection>

        <ChatSection
          sectionName="sendButton"
          styles={styles.sendButton[currentBreakpoint]}
          hoveredSection={hoveredSection}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
          stopPropagation
          isSelected={selectedComponent === "sendButton"}
        >
          <SendButton styles={styles.sendButton[currentBreakpoint] as any} />
        </ChatSection>
      </ChatSection>
    </Box>
  );
};

export default CustomChatEditor;

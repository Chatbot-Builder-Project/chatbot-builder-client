import React, { useState } from "react";
import {
  selectCurrentBreakpoint,
  selectChatStyles,
  ChatComponent,
  selectSelectedComponent,
} from "@chatbot-builder/store/slices/Builder/Chat";
import { Box, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedComponent } from "@chatbot-builder/store/slices/Builder/Chat";

const ChatContainerSX = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  overflow: "visible",
  backgroundColor: "#ffffff",
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
          outline:
            isSelected ||
            hoveredSection[hoveredSection.length - 1] === sectionName
              ? "3px solid #2196f3"
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
  const handleMouseEnter = (section: string) =>
    setHoveredSection((prev) => [...prev, section]);

  const handleMouseLeave = () => setHoveredSection((prev) => prev.slice(0, -1));

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
        <Typography variant="h6">Chat Header</Typography>
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
          <Typography>Hello! How can I help you today</Typography>
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
          <Typography>Hi! I have a question.</Typography>
        </ChatSection>
      </ChatSection>

      <ChatSection
        sectionName="messageInputSection"
        styles={styles.messageInputSection[currentBreakpoint]}
        hoveredSection={hoveredSection}
        onHover={handleMouseEnter}
        onLeave={handleMouseLeave}
        isSelected={selectedComponent === "messageInputSection"}
      >
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="outlined"
          sx={styles.messageInput[currentBreakpoint]}
        />
      </ChatSection>
    </Box>
  );
};

export default CustomChatEditor;

import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { setSelectedComponent } from "@chatbot-builder/store/slices/Builder/Chat";
import { SidebarTitle } from "./LeftSidebar.styles";
import { selectSelectedComponent } from "@chatbot-builder/store/slices/Builder/Chat/selectors";

interface ComponentTreeItemProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
  level?: number;
  children?: React.ReactNode;
}

const ComponentTreeItem: React.FC<ComponentTreeItemProps> = ({
  name,
  isSelected,
  onClick,
  level = 0,
  children,
}) => (
  <Box sx={{ ml: level * 2 }}>
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "6px 12px",
        cursor: "pointer",
        borderRadius: "4px",
        transition: "all 0.2s ease",
        backgroundColor: isSelected ? "#2b2b2b" : "transparent",
        "&:hover": {
          backgroundColor: isSelected ? "#2b2b2b" : "#1e1e1e",
        },
        border: isSelected ? "1px solid #ffffff20" : "1px solid transparent",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
          color: isSelected ? "#fff" : "#ffffff80",
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {name}
      </Typography>
    </Box>
    {children && <Box sx={{ mt: 0.5 }}>{children}</Box>}
  </Box>
);

export const ChatSidebar = () => {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);

  const handleComponentSelect = (component: string) => {
    dispatch(setSelectedComponent(component));
  };

  return (
    <Box sx={{ p: 2 }}>
      <SidebarTitle>Chat Components</SidebarTitle>
      <Box sx={{ mt: 2 }}>
        <ComponentTreeItem
          name="Header"
          isSelected={selectedComponent === "header"}
          onClick={() => handleComponentSelect("header")}
        >
          <ComponentTreeItem
            name="Header Content"
            isSelected={selectedComponent === "headerContent"}
            onClick={() => handleComponentSelect("headerContent")}
            level={1}
          />
        </ComponentTreeItem>

        <ComponentTreeItem
          name="Background"
          isSelected={selectedComponent === "background"}
          onClick={() => handleComponentSelect("background")}
        >
          <ComponentTreeItem
            name="Bot Message"
            isSelected={selectedComponent === "botMessage"}
            onClick={() => handleComponentSelect("botMessage")}
            level={1}
          />
          <ComponentTreeItem
            name="Sender Message"
            isSelected={selectedComponent === "senderMessage"}
            onClick={() => handleComponentSelect("senderMessage")}
            level={1}
          />
        </ComponentTreeItem>

        <ComponentTreeItem
          name="Message Input Section"
          isSelected={selectedComponent === "messageInputSection"}
          onClick={() => handleComponentSelect("messageInputSection")}
        >
          <ComponentTreeItem
            name="Message Input"
            isSelected={selectedComponent === "messageInput"}
            onClick={() => handleComponentSelect("messageInput")}
            level={1}
          />
          <ComponentTreeItem
            name="Send Button"
            isSelected={selectedComponent === "sendButton"}
            onClick={() => handleComponentSelect("sendButton")}
            level={1}
          />
        </ComponentTreeItem>
      </Box>
    </Box>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { ChatContainer, DesktopPreview } from "./CustonChatEditor.styles";
import { setSelected } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { selectChatConfig } from "@chatbot-builder/store/slices/Builder/Chat";
import { ChatHeader, ChatBody, ChatInput } from "./components";

const CustomChatEditor = () => {
  const dispatch = useDispatch();
  const chatConfig = useSelector(selectChatConfig);

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelected(null));
  };

  return (
    <DesktopPreview onClick={handleContainerClick}>
      <ChatContainer
        style={{
          backgroundColor: chatConfig.backgroundColor,
          color: chatConfig.textColor,
          padding: `${chatConfig.padding}px`,
          borderRadius: `${chatConfig.borderRadius}px`,
          fontFamily: chatConfig.fontFamily,
          fontSize: `${chatConfig.fontSize}px`,
        }}
      >
        <ChatHeader />
        <ChatBody />
        <ChatInput />
      </ChatContainer>
    </DesktopPreview>
  );
};

export default CustomChatEditor;

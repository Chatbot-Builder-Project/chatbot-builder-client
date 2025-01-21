import { useDispatch } from "react-redux";
import { ChatContainer, DesktopPreview } from "./CustonChatEditor.styles";
import { setSelected } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { ChatHeader, ChatBody, ChatInput } from "./components";

const CustomChatEditor = () => {
  const dispatch = useDispatch();

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelected(null));
  };

  return (
    <DesktopPreview onClick={handleContainerClick}>
      <ChatContainer>
        <ChatHeader />
        <ChatBody />
        <ChatInput />
      </ChatContainer>
    </DesktopPreview>
  );
};

export default CustomChatEditor;

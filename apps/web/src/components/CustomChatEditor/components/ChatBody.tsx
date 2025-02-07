import { useDispatch, useSelector } from "react-redux";
// import { setSelected } from "@chatbot-builder/store/slices/Builder/Chat/slice";
import { selectChatConfig } from "@chatbot-builder/store/slices/Builder/Chat";
import styled from "styled-components";

const BodyContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  cursor: pointer;
`;

const Message = styled.div<{
  isUser: boolean;
  align: "left" | "right";
  bgColor: string;
}>`
  max-width: 70%;
  margin: ${(props) => (props.align === "right" ? "0 0 0 auto" : "0 auto 0 0")};
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${(props) => props.bgColor};
  text-align: ${(props) => props.align};
`;

export const ChatBody = () => {
  // const dispatch = useDispatch();
  const chatConfig = useSelector(selectChatConfig);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // dispatch(setSelected("body"));
  };

  return (
    <BodyContainer
      onClick={handleClick}
      style={{
        padding: `${chatConfig.padding}px`,
        backgroundColor: chatConfig.backgroundColor,
      }}
    >
      <Message
        isUser={false}
        align={chatConfig.botMessageAlign}
        bgColor={chatConfig.botMessageBgColor}
        style={{
          color: chatConfig.textColor,
          fontSize: `${chatConfig.fontSize}px`,
          fontFamily: chatConfig.fontFamily,
          marginBottom: `${chatConfig.messageSpacing}px`,
        }}
      >
        Hello! How can I help you today?
      </Message>
      <Message
        isUser={true}
        align={chatConfig.userMessageAlign}
        bgColor={chatConfig.userMessageBgColor}
        style={{
          color: chatConfig.textColor,
          fontSize: `${chatConfig.fontSize}px`,
          fontFamily: chatConfig.fontFamily,
          marginBottom: `${chatConfig.messageSpacing}px`,
        }}
      >
        I have a question about your services.
      </Message>
    </BodyContainer>
  );
};

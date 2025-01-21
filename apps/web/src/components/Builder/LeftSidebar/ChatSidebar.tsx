import { useSelector } from "react-redux";
import { selectElementId } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { NodesContainer, SidebarTitle } from "./LeftSidebar.styles";
import { ChatElementConfig } from "./ChatElementConfig";

export const ChatSidebar = () => {
  const selectedId = useSelector(selectElementId);
  const isChatElement =
    typeof selectedId === "string" &&
    (selectedId === "header" ||
      selectedId === "body" ||
      selectedId === "input");

  return (
    <>
      {isChatElement ? (
        <ChatElementConfig elementId={selectedId} />
      ) : (
        <>
          <SidebarTitle>Chat Elements</SidebarTitle>
          <NodesContainer>
            <p style={{ color: "#fff", padding: "10px" }}>
              Click on any chat element to configure it
            </p>
          </NodesContainer>
        </>
      )}
    </>
  );
};

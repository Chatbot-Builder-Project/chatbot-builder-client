import { LeftSidebarContainer } from "./LeftSidebar.styles";
import { LeftSidebarProps } from "./types";
import { FlowSidebar } from "./FlowSidebar";
import { ChatSidebar } from "./ChatSidebar";

const LeftSidebar: React.FC<LeftSidebarProps> = ({ mode }) => {
  return (
    <LeftSidebarContainer>
      {mode === "flow" ? <FlowSidebar /> : <ChatSidebar />}
    </LeftSidebarContainer>
  );
};

export default LeftSidebar;

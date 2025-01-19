import { NodeType } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { NODES } from "../Nodes/nodes";
import { LeftSidebarContainer, NodesContainer, SidebarTitle } from "./LeftSidebar.styles";
import { SidebarNode } from "./SidebarNode";

const LeftSidebar: React.FC = () => {
  return (
    <LeftSidebarContainer>
      <SidebarTitle>Nodes</SidebarTitle>
      <NodesContainer>
        {Object.entries(NODES).map(([nodeType, value]) => (
          <SidebarNode
            key={nodeType}
            nodeType={nodeType as NodeType}
            nodeDetails={value}
          />
        ))}
      </NodesContainer>
    </LeftSidebarContainer>
  );
};

export default LeftSidebar;

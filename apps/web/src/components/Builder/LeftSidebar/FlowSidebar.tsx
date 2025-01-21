import { NodeType } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { NODES } from "../Nodes/nodes";
import { NodesContainer, SidebarTitle } from "./LeftSidebar.styles";
import { SidebarNode } from "./SidebarNode";

export const FlowSidebar = () => {
  return (
    <>
      <SidebarTitle>Flow Nodes</SidebarTitle>
      <NodesContainer>
        {Object.entries(NODES).map(([nodeType, value]) => (
          <SidebarNode
            key={nodeType}
            nodeType={nodeType as NodeType}
            nodeDetails={value}
          />
        ))}
      </NodesContainer>
    </>
  );
};

import { NodeData, NodeType } from "@chatbot-builder/store/slices/Builder/Nodes/types";

export interface SidebarNodeProps {
  nodeType: NodeType;
  nodeDetails: NodeData;
}

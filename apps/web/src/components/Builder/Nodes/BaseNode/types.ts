import { NodeData } from "@chatbot-builder/store/slices/Builder/Nodes/types";

interface BaseNodeProps {
  data: NodeData;
  isLeftSidebar?: boolean;
  onPositionChange?: (id: number, x: number, y: number) => void;
  children: React.ReactNode;
}

export type { BaseNodeProps };

import { NodeData } from "@chatbot-builder/store/slices/Builder/Nodes/types";

interface BaseNodeProps {
  id: number;
  isSelected: boolean;
  render: (node: NodeData) => React.ReactNode;
  onPositionChange?: (id: number, x: number, y: number) => void;
}

export type { BaseNodeProps };

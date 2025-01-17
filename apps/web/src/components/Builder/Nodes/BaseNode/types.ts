import { NodeData, NodeVisual } from "@chatbot-builder/store/slices/Builder/Nodes/types";

interface BaseNodeProps {
  id: number;
  isSelected: boolean;
  render: (node: NodeData) => React.ReactNode;
  onPositionChange?: (id: number, visual: NodeVisual) => void;
}

export type { BaseNodeProps };

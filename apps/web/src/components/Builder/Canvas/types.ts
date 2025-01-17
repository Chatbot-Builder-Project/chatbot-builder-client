import { NodeVisual } from "@chatbot-builder/store/slices/Builder/Nodes/types";

export interface NodesLayerProps {
  onPositionChange: (id: number, visual: NodeVisual) => void;
}

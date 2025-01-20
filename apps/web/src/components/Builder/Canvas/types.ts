import { NodeVisual } from "@chatbot-builder/store/slices/Builder/Nodes/types";

export interface NodesLayerProps {
  onPositionChange: (id: number, visual: NodeVisual) => void;
}

export interface CanvasProps {
  children: (props: {
    onPositionChange: (id: number, visual: NodeVisual) => void;
  }) => React.ReactNode;
    dimensions: {
    width: number;
    height: number;
  };
}

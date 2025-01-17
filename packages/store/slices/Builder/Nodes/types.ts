import { EntityState } from "@reduxjs/toolkit";

export enum NodeType {
  Interaction = "Interaction",
  Static = "Static",
  Switch = "Switch",
  Prompt = "Prompt",
}

interface BaseInfo {
  id: number;
  name: string;
}

interface Port {
  info: BaseInfo;
  nodeId: number;
  dataType: string;
}

export interface NodeVisual {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

interface BaseNode {
  type: NodeType;
  info: BaseInfo;
  visual: NodeVisual;
}

export type NodeTemplate<T extends NodeData> = Omit<T, "info"> & {
  info: { id: 0; name: "" };
};

export type NodeTemplates = {
  [K in NodeType]: NodeTemplate<Extract<NodeData, { type: K }>>;
};

export interface InteractionNode extends BaseNode {
  type: NodeType.Interaction;
  textInputPort: Port;
  outputEnumId: number;
  optionOutputPort: Port;
  outputOptionMetas: Record<string, { Description: string }>;
}

export interface StaticNode extends BaseNode {
  type: NodeType.Static;
  data: {
    type: string;
    text: string;
  };
  outputPort: Port;
}

export interface SwitchNode extends BaseNode {
  type: NodeType.Switch;
  enumId: number;
  inputPort: Port;
  optionFlowLinkIds: Record<string, number>;
}

export interface PromptNode extends BaseNode {
  type: NodeType.Prompt;
  template: string;
  outputPort: Port;
  inputPorts: Port[];
}

export type NodeData = InteractionNode | StaticNode | SwitchNode | PromptNode;

export interface DataLink {
  info: BaseInfo;
  sourcePortId: number;
  targetPortId: number;
}

interface Point {
  x: number;
  y: number;
}

export interface ControlPoint {
  id: string;
  position: Point;
}

export interface FlowLink {
  info: BaseInfo;
  sourceNodeId: number;
  targetNodeId: number;
  visual?: {
    points: ControlPoint[];
  };
}

export interface BuilderState {
  nodes: EntityState<NodeData>;
  dataLinks: EntityState<DataLink>;
  flowLinks: EntityState<FlowLink>;
  selectedNodeId: number | null;
  startNodeId: number | null;
  nextNodeId: number;
  pendingFlowLinkSourceId: number | null;
}

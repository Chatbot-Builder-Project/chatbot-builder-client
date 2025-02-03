import { EntityState } from "@reduxjs/toolkit";

export enum NodeType {
  Interaction = "Interaction",
  Static = "Static",
  Switch = "Switch",
  Prompt = "Prompt",
  SmartSwitch = "SmartSwitch",
  ApiAction = "ApiAction",
  Generation = "Generation",
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
  visual: { data: NodeVisual };
}

export type NodeTemplate<T extends NodeData> = Omit<T, "info"> & {
  info: { id: number; name: string };
};

export type NodeTemplates = {
  [K in NodeType]: NodeTemplate<Extract<NodeData, { type: K }>>;
};

export interface InteractionNode extends BaseNode {
  type: NodeType.Interaction;
  textInputPort?: Port;
  imageInputPorts: Port[];
  textOutputPort?: Port;
  outputEnumId?: number;
  optionOutputPort?: Port;
  outputOptionMetas?: Record<string, { Description: string }>;
}

export interface StaticNode extends BaseNode {
  type: NodeType.Static;
  data: {
    type: string;
    text?: string;
    url?: string;
    option?: string;
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

export interface SmartSwitchNode extends BaseNode {
  type: NodeType.SmartSwitch;
  enumId: number;
  inputPort: Port;
  optionFlowLinkIds: Record<string, number>;
  fallbackFlowLinkId: number | null;
}

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Patch = "PATCH",
  Head = "HEAD",
  Options = "OPTIONS",
}

export interface ApiActionNode extends BaseNode {
  type: NodeType.ApiAction;
  urlInputPort: Port;
  httpMethod: HttpMethod;
  headers?: Record<string, string>;
  bodyInputPort?: Port;
  responseOutputPort: Port;
}
export interface GenerationNode extends BaseNode {
  type: NodeType.Generation;
  inputPort: Port;
  outputPort: Port;
  options: {
    useMemory: boolean;
    responseSchema?: any;
  };
}

export type NodeData =
  | SmartSwitchNode
  | ApiActionNode
  | GenerationNode
  | InteractionNode
  | StaticNode
  | SwitchNode
  | PromptNode;

export interface DataLink {
  info: BaseInfo;
  sourcePortId: number;
  targetPortId: number;
}

export interface Point {
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
    data: {
      points: ControlPoint[];
    };
  };
}

export interface Enum {
  info: BaseInfo;
  visual: { data: NodeVisual };
  options: {
    type: string;
    option: string;
  }[];
}

export interface BuilderState {
  nodes: EntityState<NodeData>;
  enums: EntityState<Enum>;
  dataLinks: EntityState<DataLink>;
  flowLinks: EntityState<FlowLink>;
  selectedId: number | null;
  startNodeId: number | null;
  nextNodeId: number;
  pendingFlowLinkSourceId: number | null;
}

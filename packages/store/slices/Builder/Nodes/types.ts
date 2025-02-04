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

export interface BaseInfo {
  id: number;
  name: string;
}

// dataType can be: "text", "image", "option"
// Data objects are one of these:
// {"type": "image", "url", "..."}
// {"type": "text", "text": "..."}
// {"type": "option", "option": "..."}

export interface Port {
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
  textInputPort?: Port; // text datatype
  imageInputPorts: Port[]; // image datatypes
  textOutputPort?: Port; // text datatype
  outputEnumId?: number;
  optionOutputPort?: Port; // option datatype
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
  outputPort: Port; // datatype matches data.type
}

export interface SwitchNode extends BaseNode {
  type: NodeType.Switch;
  enumId: number;
  inputPort: Port; // option datatype
  optionFlowLinkIds: Record<string, number>;
}

export interface PromptNode extends BaseNode {
  type: NodeType.Prompt;
  template: string;
  outputPort: Port; // text datatype
  inputPorts: Port[]; // text datatypes
}

export interface SmartSwitchNode extends BaseNode {
  type: NodeType.SmartSwitch;
  enumId: number;
  inputPort: Port; // text dattype
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
  urlInputPort: Port; // text datatype
  httpMethod: HttpMethod;
  headers?: Record<string, string>;
  bodyInputPort?: Port; // text dattype
  responseOutputPort: Port; // text dattype
}
export interface GenerationNode extends BaseNode {
  type: NodeType.Generation;
  inputPort: Port; // text dattype
  outputPort: Port; // text dattype
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
    // option data objects
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

import { EntityState } from "@reduxjs/toolkit";

export type NodeType = "Static" | "Input" | "Output";
export type DataType = "Text" | "Number" | "Boolean";

export interface VisualData {
  x: number;
  y: number;
}

export interface InfoData {
  id: number;
  name: string;
}

export interface PortData {
  info: InfoData;
  visual: VisualData;
  nodeId: number;
  dataType: DataType;
}

export interface NodeData {
  type: NodeType;
  info: InfoData;
  visual: VisualData;
  data: {
    type: DataType;
    text?: string;
    number?: number;
    boolean?: boolean;
  };
  outputPort: PortData;
}

export interface DataLink {
  info: InfoData;
  sourcePortId: number;
  targetPortId: number;
}

export interface FlowLink {
  info: InfoData;
  sourceNodeId: number;
  targetNodeId: number;
}


export interface BuilderState {
  nodes: EntityState<NodeData>;
  dataLinks: EntityState<DataLink>;
  flowLinks: EntityState<FlowLink>;
  selectedNodeId: number | null;
  startNodeId: number | null;
}

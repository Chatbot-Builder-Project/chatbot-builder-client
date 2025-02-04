import {
  NodeData,
  Enum,
  DataLink,
  FlowLink,
} from "../../slices/Builder/Nodes/types";

interface Visual {
  data: Record<string, any>;
}

export interface WorkflowResponse {
  id: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  graph: {
    visual: Visual;
    startNodeId: number;
    nodes: NodeData[];
    dataLinks: DataLink[];
    flowLinks: FlowLink[];
    enums: Enum[];
  };
  visual: Visual;
  stats: null;
}

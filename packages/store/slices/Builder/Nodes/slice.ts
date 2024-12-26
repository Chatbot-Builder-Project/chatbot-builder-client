import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { BaseNodeData } from "../../../../../apps/web/src/types/nodes";

// Default nodes for initialization
const defaultNodes: BaseNodeData[] = [
  {
    id: "start-node",
    type: "staticNode",
    x: 500,
    y: 200,
    label: "Start Node",
  },
  {
    id: "welcome-node",
    type: "staticNode",
    x: 500,
    y: 500,
    label: "Welcome Message",
  },
];

export interface NodesState {
  ids: string[];
  entities: { [key: string]: BaseNodeData };
  selectedNodeId: string | null;
}

const nodesAdapter = createEntityAdapter<BaseNodeData>({
  selectId: (node) => node.id,
});

const initialState = nodesAdapter.getInitialState<NodesState>({
  ids: defaultNodes.map(node => node.id),
  entities: defaultNodes.reduce((acc, node) => {
    acc[node.id] = node;
    return acc;
  }, {} as { [key: string]: BaseNodeData }),
  selectedNodeId: "start-node",
});

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: nodesAdapter.addOne,
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const { id, x, y } = action.payload;
      if (state.entities[id]) {
        state.entities[id] = { ...state.entities[id], x, y };
      }
    },
    removeNode: nodesAdapter.removeOne,
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
  },
});

export const {
  selectAll: selectAllNodes,
  selectById: selectNodeById,
  selectIds: selectNodeIds,
} = nodesAdapter.getSelectors<RootState>((state) => state.builder.nodes);

export const selectSelectedNodeId = (state: RootState) =>
  state.builder.nodes.selectedNodeId;

export const { addNode, updateNodePosition, removeNode, setSelectedNode } =
  nodesSlice.actions;

export default nodesSlice.reducer;

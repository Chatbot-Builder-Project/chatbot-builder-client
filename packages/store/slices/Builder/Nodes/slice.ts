import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { NodeData, DataLink, FlowLink, BuilderState } from "./types";

const nodesAdapter = createEntityAdapter<NodeData>({
  selectId: (node) => node.info.id,
});

const dataLinksAdapter = createEntityAdapter<DataLink>({
  selectId: (link) => link.info.id,
});

const flowLinksAdapter = createEntityAdapter<FlowLink>({
  selectId: (link) => link.info.id,
});

const defaultNodes: NodeData[] = [
  {
    type: "Static",
    info: {
      id: 4,
      name: "Static_4",
    },
    visual: {
      x: 5000,
      y: 5000,
    },
    data: {
      type: "Text",
      text: "Hello user, say something.",
    },
    outputPort: {
      info: {
        id: 5,
        name: "OutputPort_5",
      },
      visual: { x: 0, y: 0 },
      nodeId: 4,
      dataType: "Text",
    },
  },
  {
    type: "Static",
    info: {
      id: 6,
      name: "Static_4",
    },
    visual: {
      x: 5500,
      y: 5000,
    },
    data: {
      type: "Text",
      text: "Hello user, say something.",
    },
    outputPort: {
      info: {
        id: 5,
        name: "OutputPort_5",
      },
      visual: { x: 0, y: 0 },
      nodeId: 4,
      dataType: "Text",
    },
  },
];

const initialState: BuilderState = {
  nodes: nodesAdapter.setAll(nodesAdapter.getInitialState(), defaultNodes),
  dataLinks: dataLinksAdapter.getInitialState(),
  flowLinks: flowLinksAdapter.getInitialState(),
  selectedNodeId: null,
  startNodeId: 1,
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<NodeData>) => {
      nodesAdapter.addOne(state.nodes, action.payload);
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: number; x: number; y: number }>
    ) => {
      const { id, x, y } = action.payload;
      const node = state.nodes.entities[id];
      if (node) {
        node.visual = { x, y };
      }
    },
    removeNode: (state, action: PayloadAction<number>) => {
      nodesAdapter.removeOne(state.nodes, action.payload);
    },
    setSelectedNode: (state, action: PayloadAction<number | null>) => {
      state.selectedNodeId = action.payload;
    },
    addDataLink: (state, action: PayloadAction<DataLink>) => {
      dataLinksAdapter.addOne(state.dataLinks, action.payload);
    },
    removeDataLink: (state, action: PayloadAction<number>) => {
      dataLinksAdapter.removeOne(state.dataLinks, action.payload);
    },
    addFlowLink: (state, action: PayloadAction<FlowLink>) => {
      flowLinksAdapter.addOne(state.flowLinks, action.payload);
    },
    removeFlowLink: (state, action: PayloadAction<number>) => {
      flowLinksAdapter.removeOne(state.flowLinks, action.payload);
    },
    setStartNode: (state, action: PayloadAction<number>) => {
      state.startNodeId = action.payload;
    },
  },
});

export const {
  selectAll: selectAllNodes,
  selectById: selectNodeById,
  selectIds: selectNodeIds,
} = nodesAdapter.getSelectors<RootState>((state) => state.builder.nodes);

export const { selectAll: selectAllDataLinks, selectById: selectDataLinkById } =
  dataLinksAdapter.getSelectors<RootState>((state) => state.builder.dataLinks);

export const { selectAll: selectAllFlowLinks, selectById: selectFlowLinkById } =
  flowLinksAdapter.getSelectors<RootState>((state) => state.builder.flowLinks);

export const selectSelectedNodeId = (state: RootState) =>
  state.builder.selectedNodeId;

export const selectStartNodeId = (state: RootState) =>
  state.builder.startNodeId;

export const {
  addNode,
  updateNodePosition,
  removeNode,
  setSelectedNode,
  addDataLink,
  removeDataLink,
  addFlowLink,
  removeFlowLink,
  setStartNode,
} = builderSlice.actions;

export default builderSlice.reducer;

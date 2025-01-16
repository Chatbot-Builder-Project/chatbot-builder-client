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

const defaultNodes: NodeData[] = [];

const initialState: BuilderState = {
  nodes: nodesAdapter.setAll(nodesAdapter.getInitialState(), defaultNodes),
  dataLinks: dataLinksAdapter.getInitialState(),
  flowLinks: flowLinksAdapter.getInitialState(),
  selectedNodeId: null,
  startNodeId: 1,
  nextNodeId: 1,
  pendingFlowLinkSourceId: null,
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<NodeData>) => {
      const newId = state.nextNodeId;
      state.nextNodeId += 1;
      const newNode = {
        ...action.payload,
        info: {
          ...action.payload.info,
          name: `${action.payload.type}_Node_${newId}`,
          id: newId,
        },
      };
      nodesAdapter.addOne(state.nodes, newNode);
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
    updateNode: (state, action: PayloadAction<Omit<NodeData, "visual">>) => {
      const node = state.nodes.entities[action.payload.info.id];
      if (node) {
        const visual = node.visual;
        nodesAdapter.updateOne(state.nodes, {
          id: action.payload.info.id,
          changes: { ...action.payload, visual },
        });
      }
    },
    setStartNode: (state, action: PayloadAction<number>) => {
      state.startNodeId = action.payload;
    },
    setPendingFlowLinkSource: (state, action: PayloadAction<number | null>) => {
      state.pendingFlowLinkSourceId = action.payload;
    },
    createFlowLink: (state, action: PayloadAction<number>) => {
      if (state.pendingFlowLinkSourceId) {
        const newLink: FlowLink = {
          info: {
            id: state.nextNodeId++,
            name: `FlowLink_${state.nextNodeId}`,
          },
          sourceNodeId: state.pendingFlowLinkSourceId,
          targetNodeId: action.payload,
        };
        flowLinksAdapter.addOne(state.flowLinks, newLink);
        state.pendingFlowLinkSourceId = null;
      }
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

export const selectPendingFlowLinkSourceId = (state: RootState) =>
  state.builder.pendingFlowLinkSourceId;

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
  updateNode,
  setPendingFlowLinkSource,
  createFlowLink,
} = builderSlice.actions;

export default builderSlice.reducer;

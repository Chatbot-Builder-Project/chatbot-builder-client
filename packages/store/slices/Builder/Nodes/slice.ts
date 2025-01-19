import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import {
  NodeData,
  DataLink,
  FlowLink,
  BuilderState,
  ControlPoint,
  NodeVisual,
} from "./types";

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
  selectedId: null, // Combined selection
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
    updateNodeVisual: (
      state,
      action: PayloadAction<{ id: number; visual: NodeVisual }>
    ) => {
      const { id, visual } = action.payload;
      const node = state.nodes.entities[id];
      if (node) {
        node.visual = { ...node.visual, ...visual };
      }
    },
    removeNode: (state, action: PayloadAction<number>) => {
      const nodeId = action.payload;

      const dataLinksToRemove = Object.values(state.dataLinks.entities)
        .filter(
          (link) =>
            link?.sourcePortId === nodeId || link?.targetPortId === nodeId
        )
        .map((link) => link!.info.id);
      dataLinksAdapter.removeMany(state.dataLinks, dataLinksToRemove);
      const flowLinksToRemove = Object.values(state.flowLinks.entities)
        .filter(
          (link) =>
            link?.sourceNodeId === nodeId || link?.targetNodeId === nodeId
        )
        .map((link) => link!.info.id);
      flowLinksAdapter.removeMany(state.flowLinks, flowLinksToRemove);

      nodesAdapter.removeOne(state.nodes, nodeId);
    },
    setSelected: (state, action: PayloadAction<number | null>) => {
      state.selectedId = action.payload;
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
          visual: {
            points: [],
          },
        };
        flowLinksAdapter.addOne(state.flowLinks, newLink);
        state.pendingFlowLinkSourceId = null;
      }
    },
    updateFlowLinkPoints: (
      state,
      action: PayloadAction<{ linkId: number; points: ControlPoint[] }>
    ) => {
      const { linkId, points } = action.payload;
      flowLinksAdapter.updateOne(state.flowLinks, {
        id: linkId,
        changes: {
          visual: { points },
        },
      });
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

export const selectElementId = (state: RootState) => state.builder.selectedId;

export const selectStartNodeId = (state: RootState) =>
  state.builder.startNodeId;

export const selectPendingFlowLinkSourceId = (state: RootState) =>
  state.builder.pendingFlowLinkSourceId;

export const {
  addNode,
  updateNodeVisual,
  removeNode,
  setSelected, // Export new action
  addDataLink,
  removeDataLink,
  addFlowLink,
  removeFlowLink,
  setStartNode,
  updateNode,
  setPendingFlowLinkSource,
  createFlowLink,
  updateFlowLinkPoints,
} = builderSlice.actions;

export default builderSlice.reducer;

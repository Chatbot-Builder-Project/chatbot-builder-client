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
  Enum,
  NodeType,
  Port,
  WorkflowVisual,
} from "./types";
import { getAllInputPorts } from "../../../../../apps/web/src/components/Builder/ItemConfigSidebar/utils";
import { WorkflowResponse } from "../../../API/builder/types";

const nodesAdapter = createEntityAdapter<NodeData>({
  selectId: (node) => node.info.id,
});

const dataLinksAdapter = createEntityAdapter<DataLink>({
  selectId: (link) => link.info.id,
});

const flowLinksAdapter = createEntityAdapter<FlowLink>({
  selectId: (link) => link.info.id,
});

const enumsAdapter = createEntityAdapter<Enum>({
  selectId: (enum_) => enum_.info.id,
});

const defaultNodes: NodeData[] = [];
const defaultEnums: Enum[] = [];

const initialState: BuilderState = {
  nodes: nodesAdapter.setAll(nodesAdapter.getInitialState(), defaultNodes),
  enums: enumsAdapter.setAll(enumsAdapter.getInitialState(), defaultEnums),
  dataLinks: dataLinksAdapter.getInitialState(),
  flowLinks: flowLinksAdapter.getInitialState(),
  selectedId: null,
  startNodeId: null,
  nextNodeId: 1,
  pendingFlowLinkSourceId: null,
  workflowId: null,
  workflowVisual: {
    zoom: 1,
    position: { x: 0, y: 0 },
  },
  workflowName: "",
  workflowDescription: "",
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<NodeData>) => {
      const nodeId = state.nextNodeId++;

      const createPortWithUniqueId = (
        port: Port | null,
        type: string
      ): Port | null => {
        if (!port)
          return {
            info: { id: state.nextNodeId++, name: `Port_${state.nextNodeId}` },
            visual: { data: {} },
            nodeId,
            dataType: type,
          };
        return {
          ...port,
          nodeId,
          info: { ...port.info, id: state.nextNodeId++ },
        };
      };

      const newNode = {
        ...action.payload,
        info: {
          ...action.payload.info,
          name: `${action.payload.type}_Node_${nodeId}`,
          id: nodeId,
        },
      };

      // Assign unique IDs to all ports
      switch (newNode.type) {
        case NodeType.Interaction:
          newNode.textInputPort = createPortWithUniqueId(
            newNode.textInputPort,
            "text"
          )!;
          newNode.textOutputPort = createPortWithUniqueId(
            newNode.textOutputPort,
            "text"
          )!;
          newNode.optionOutputPort = createPortWithUniqueId(
            newNode.optionOutputPort,
            "option"
          )!;
          newNode.imageInputPorts =
            newNode.imageInputPorts?.map(
              (port) => createPortWithUniqueId(port, "image")!
            ) ?? [];
          break;
        case NodeType.Static:
          newNode.outputPort = createPortWithUniqueId(
            newNode.outputPort,
            newNode.data.type
          )!;
          break;
        case NodeType.Switch:
          newNode.inputPort = createPortWithUniqueId(
            newNode.inputPort,
            "option"
          )!;
          break;
        case NodeType.Prompt:
          newNode.outputPort = createPortWithUniqueId(
            newNode.outputPort,
            "text"
          )!;
          newNode.inputPorts =
            newNode.inputPorts?.map(
              (port) => createPortWithUniqueId(port, "text")!
            ) ?? [];
          break;
        case NodeType.SmartSwitch:
          newNode.inputPort = createPortWithUniqueId(
            newNode.inputPort,
            "text"
          )!;
          break;
        case NodeType.ApiAction:
          newNode.urlInputPort = createPortWithUniqueId(
            newNode.urlInputPort,
            "text"
          )!;
          newNode.bodyInputPort = createPortWithUniqueId(
            newNode.bodyInputPort,
            "text"
          )!;
          newNode.responseOutputPort = createPortWithUniqueId(
            newNode.responseOutputPort,
            "text"
          )!;
          break;
        case NodeType.Generation:
          newNode.inputPort = createPortWithUniqueId(
            newNode.inputPort,
            "text"
          )!;
          newNode.outputPort = createPortWithUniqueId(
            newNode.outputPort,
            "text"
          )!;
          break;
      }

      nodesAdapter.addOne(state.nodes, newNode);
    },
    updateNodeVisual: (
      state,
      action: PayloadAction<{ id: number; visual: NodeVisual }>
    ) => {
      const { id, visual } = action.payload;
      const node = state.nodes.entities[id];
      if (node) {
        node.visual.data = { ...node.visual.data, ...visual };
      }
    },
    removeNode: (state, action: PayloadAction<number>) => {
      const nodeId = action.payload;
      const node = state.nodes.entities[nodeId];
      const sourcePorts = getAllInputPorts(node);
      const targetPorts = getAllInputPorts(node);
      const dataLinksToRemove = Object.values(state.dataLinks.entities)
        .filter((link) =>
          sourcePorts
            .concat(targetPorts)
            .some((port) =>
              [link?.sourcePortId, link?.targetPortId].includes(port?.info.id)
            )
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
      const newLink = {
        ...action.payload,
        info: {
          ...action.payload.info,
          id: state.nextNodeId,
          name: `DataLink_${state.nextNodeId}`,
        },
      };
      state.nextNodeId++;
      dataLinksAdapter.addOne(state.dataLinks, newLink);
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
        const linkId = state.nextNodeId++;
        const newLink: FlowLink = {
          info: {
            id: linkId,
            name: `FlowLink_${linkId}`,
          },
          sourceNodeId: state.pendingFlowLinkSourceId,
          targetNodeId: action.payload,
          visual: {
            data: {
              points: [],
            },
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
          visual: { data: { points } },
        },
      });
    },
    addEnum: (state, action: PayloadAction<Enum>) => {
      const newId = state.nextNodeId;
      state.nextNodeId += 1;
      const newEnum = {
        ...action.payload,
        info: {
          ...action.payload.info,
          name: `Enum_${newId}`,
          id: newId,
        },
      };
      enumsAdapter.addOne(state.enums, newEnum);
    },
    updateEnum: (state, action: PayloadAction<Enum>) => {
      enumsAdapter.updateOne(state.enums, {
        id: action.payload.info.id,
        changes: action.payload,
      });
    },
    removeEnum: (state, action: PayloadAction<number>) => {
      enumsAdapter.removeOne(state.enums, action.payload);
    },
    updateEnumVisual: (
      state,
      action: PayloadAction<{ id: number; visual: NodeVisual }>
    ) => {
      const { id, visual } = action.payload;
      const enum_ = state.enums.entities[id];
      if (enum_) {
        enum_.visual = { ...enum_.visual, ...visual };
      }
    },
    setWorkflowId: (state, action: PayloadAction<string | null>) => {
      state.workflowId = action.payload;
    },
    initWorkflow: (state, action: PayloadAction<WorkflowResponse["graph"]>) => {
      const {
        nodes,
        enums,
        dataLinks,
        flowLinks,
        startNodeId,
        id,
        visual,
        name,
        description,
      } = action.payload;

      // Reset all adapters
      nodesAdapter.setAll(state.nodes, nodes);
      enumsAdapter.setAll(state.enums, enums);
      dataLinksAdapter.setAll(state.dataLinks, dataLinks);
      flowLinksAdapter.setAll(state.flowLinks, flowLinks);

      // Set workflow metadata
      state.startNodeId = startNodeId;
      state.workflowId = id;

      // Set workflow visual
      if (visual) {
        state.workflowVisual = visual.data;
      }

      // Calculate next node ID
      const maxId = Math.max(
        ...nodes.map((n) => n.info.id),
        ...enums.map((e) => e.info.id),
        ...dataLinks.map((l) => l.info.id),
        ...flowLinks.map((l) => l.info.id)
      );
      state.nextNodeId = maxId + 1;

      // Set workflow metadata
      state.workflowName = name || "";
      state.workflowDescription = description || "";
    },
    updateWorkflowMetadata: (
      state,
      action: PayloadAction<{ name: string; description: string }>
    ) => {
      state.workflowName = action.payload.name;
      state.workflowDescription = action.payload.description;
    },
    updateWorkflowVisual: (
      state,
      action: PayloadAction<Partial<WorkflowVisual>>
    ) => {
      state.workflowVisual = { ...state.workflowVisual, ...action.payload };
    },
    setNextNodeId: (state, action: PayloadAction<number>) => {
      state.nextNodeId = action.payload;
    },
  },
});

export const {
  selectAll: selectAllNodes,
  selectById: selectNodeById,
  selectIds: selectNodeIds,
} = nodesAdapter.getSelectors<RootState>((state) => state.builder.nodes.nodes);

export const { selectAll: selectAllDataLinks, selectById: selectDataLinkById } =
  dataLinksAdapter.getSelectors<RootState>(
    (state) => state.builder.nodes.dataLinks
  );

export const {
  selectAll: selectAllFlowLinks,
  selectById: selectFlowLinkById,
  selectIds: selectFlowLinkIds,
} = flowLinksAdapter.getSelectors<RootState>(
  (state) => state.builder.nodes.flowLinks
);

export const {
  selectAll: selectAllEnums,
  selectById: selectEnumById,
  selectIds: selectEnumIds,
} = enumsAdapter.getSelectors<RootState>((state) => state.builder.nodes.enums);

export const selectFlowLinksBySourceId = (state: RootState, sourceId: number) =>
  selectAllFlowLinks(state).filter((link) => link.sourceNodeId === sourceId);

export const selectElementId = (state: RootState) =>
  state.builder.nodes.selectedId;

export const selectStartNodeId = (state: RootState) =>
  state.builder.nodes.startNodeId;

export const selectPendingFlowLinkSourceId = (state: RootState) =>
  state.builder.nodes.pendingFlowLinkSourceId;

export const selectWorkflowId = (state: RootState) =>
  state.builder.nodes.workflowId;

export const selectWorkflowVisual = (state: RootState) =>
  state.builder.nodes.workflowVisual;

export const selectWorkflowMetadata = (state: RootState) => ({
  name: state.builder.nodes.workflowName,
  description: state.builder.nodes.workflowDescription,
});

export const {
  addNode,
  updateNodeVisual,
  removeNode,
  setSelected,
  addDataLink,
  removeDataLink,
  addFlowLink,
  removeFlowLink,
  setStartNode,
  updateNode,
  setPendingFlowLinkSource,
  createFlowLink,
  updateFlowLinkPoints,
  addEnum,
  updateEnum,
  removeEnum,
  updateEnumVisual,
  setWorkflowId,
  initWorkflow,
  updateWorkflowMetadata,
  updateWorkflowVisual,
  setNextNodeId,
} = builderSlice.actions;

export default builderSlice.reducer;

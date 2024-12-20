import { BuilderNode } from "@chatbot-builder/client";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

const nodesAdapter = createEntityAdapter<BuilderNode>();

const initialState = nodesAdapter.getInitialState();

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: nodesAdapter.addOne,
    updateNode: nodesAdapter.updateOne,
    removeNode: nodesAdapter.removeOne,
  },
});

export const { addNode, updateNode, removeNode } = nodesSlice.actions;
export default nodesSlice.reducer;

export const { selectAll: selectAllNodes, selectById: selectNodeById } =
  nodesAdapter.getSelectors((state: RootState) => state.builder.nodes);

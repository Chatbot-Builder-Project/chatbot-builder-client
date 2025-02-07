import { combineReducers } from "@reduxjs/toolkit";
import { nodesReducer } from "./Nodes";
import { chatReducer } from "./Chat";

export const builderReducer = combineReducers({
  nodes: nodesReducer,
  chat: chatReducer,
});

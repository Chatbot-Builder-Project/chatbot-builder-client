import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChatState,
  ChatComponentStyles,
  ChatBreakpoint,
  ChatComponent,
  StyleUpdate,
} from "./types";
import { defaultStyles } from "./default";
import _ from "lodash";

const initialState: ChatState = {
  currentBreakpoint: "lg",
  selectedComponent: null,
  styles: defaultStyles,
  content: {
    headerText: "Chat with Bot",
    botMessageText: "Hello! How can I help you today?",
    senderMessageText: "Hi there!",
    inputPlaceholder: "Type a message...",
  },
};

const updateNestedStyle = (obj: any, path: string[], value: any): void => {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!(path[i] in current)) {
      current[path[i]] = {};
    }
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
};

const chatSlice = createSlice({
  name: "builderChat",
  initialState,
  reducers: {
    updateComponentStyle: (
      state,
      action: PayloadAction<{
        component: keyof ChatComponentStyles;
        styleUpdate: StyleUpdate;
      }>
    ) => {
      const { component, styleUpdate } = action.payload;
      const componentStyle = _.get(state.styles, [
        component,
        state.currentBreakpoint,
      ]);
      updateNestedStyle(componentStyle, styleUpdate.path, styleUpdate.value);
    },
    resetChatStyles: (state) => {
      state.styles = JSON.parse(JSON.stringify(defaultStyles));
      state.currentBreakpoint = initialState.currentBreakpoint;
      state.selectedComponent = initialState.selectedComponent;
    },
    updateBreakpoint: (state, action: PayloadAction<ChatBreakpoint>) => {
      state.currentBreakpoint = action.payload;
    },
    setSelectedComponent: (state, action: PayloadAction<ChatComponent>) => {
      state.selectedComponent = action.payload;
    },
  },
});

export const {
  updateComponentStyle,
  resetChatStyles,
  updateBreakpoint,
  setSelectedComponent,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;

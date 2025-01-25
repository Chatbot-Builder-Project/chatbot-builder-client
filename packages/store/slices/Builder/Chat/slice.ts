import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, ChatUIConfig } from "./types";

const initialState: ChatState = {
  config: {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    fontSize: 14,
    padding: 16,
    borderRadius: 8,
    messageSpacing: 12,
    userMessageAlign: "right",
    botMessageAlign: "left",
    userMessageBgColor: "#e3f2fd",
    botMessageBgColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },
};

const chatSlice = createSlice({
  name: "builderChat",
  initialState,
  reducers: {
    updateChatConfig: (state, action: PayloadAction<Partial<ChatUIConfig>>) => {
      state.config = { ...state.config, ...action.payload };
    },
    resetChatConfig: (state) => {
      state.config = initialState.config;
    },
  },
});

export const { updateChatConfig, resetChatConfig } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;

import { RootState } from "../../../store";
import { ChatComponentStyles } from "./types";

export const selectCurrentBreakpoint = (state: RootState) =>
  state.builder.chat.currentBreakpoint;
export const selectSelectedComponent = (state: RootState) =>
  state.builder.chat.selectedComponent;
export const selectChatStyles = (state: RootState) => state.builder.chat.styles;
export const selectChatContent = (state: RootState) =>
  state.builder.chat.content;

export const selectComponentStyle =
  (component: keyof ChatComponentStyles) => (state: RootState) => {
    return state.builder.chat.styles[component];
  };

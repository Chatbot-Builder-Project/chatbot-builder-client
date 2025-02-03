import type { SxProps, Theme } from "@mui/material/styles";

export type ChatBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export type ChatComponentStyle = Record<ChatBreakpoint, SxProps<Theme>>;

export interface ChatComponentStyles {
  header: ChatComponentStyle;
  background: ChatComponentStyle;
  senderMessage: ChatComponentStyle;
  botMessage: ChatComponentStyle;
  messageInputSection: ChatComponentStyle;
  messageInput: ChatComponentStyle;
}

export type ChatComponent = keyof ChatComponentStyles | null;

export interface ChatState {
  currentBreakpoint: ChatBreakpoint;
  selectedComponent: ChatComponent;
  styles: ChatComponentStyles;
}

export type StyleUpdate = {
  path: string[];
  value: string | number;
};

export const isChatComponent = (value: unknown): value is ChatComponent => {
  if (!value) return false;
  return [
    "header",
    "background",
    "senderMessage",
    "botMessage",
    "messageInputSection",
    "messageInput",
  ].includes(value as string);
};

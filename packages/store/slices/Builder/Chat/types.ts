import type { SxProps, Theme } from "@mui/material/styles";

export type ChatBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export type ChatComponentStyle = Record<ChatBreakpoint, SxProps<Theme>>;

export interface ChatComponentStyles {
  header: ChatComponentStyle;
  headerContent: ChatComponentStyle;
  background: ChatComponentStyle;
  senderMessage: ChatComponentStyle;
  botMessage: ChatComponentStyle;
  messageInputSection: ChatComponentStyle;
  messageInput: ChatComponentStyle;
  sendButton: ChatComponentStyle;
}

export type ChatComponent =
  | "header"
  | "headerContent"
  | "background"
  | "botMessage"
  | "senderMessage"
  | "messageInputSection"
  | "messageInput"
  | "sendButton";

export interface SendButtonConfig {
  icon: string;
  showText: boolean;
  text: string;
  iconPosition: "left" | "right";
}

export interface ChatContent {
  headerText: string;
  botMessageText: string;
  senderMessageText: string;
  inputPlaceholder: string;
  profilePicture?: {
    url: string;
    id: string;
  };
}

export interface ChatState {
  currentBreakpoint: ChatBreakpoint;
  selectedComponent: ChatComponent | null;
  styles: ChatComponentStyles;
  content: ChatContent;
}

export type StyleUpdate = {
  path: string[];
  value: string | number;
};

export const isChatComponent = (value: unknown): value is ChatComponent => {
  if (!value) return false;
  return [
    "header",
    "headerContent",
    "background",
    "senderMessage",
    "botMessage",
    "messageInputSection",
    "messageInput",
    "sendButton",
  ].includes(value as string);
};

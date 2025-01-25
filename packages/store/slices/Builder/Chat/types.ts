export interface ChatUIConfig {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  padding: number;
  borderRadius: number;
  messageSpacing: number;
  userMessageAlign: "left" | "right";
  botMessageAlign: "left" | "right";
  userMessageBgColor: string;
  botMessageBgColor: string;
  fontFamily: string;
}

export interface ChatState {
  config: ChatUIConfig;
}

import {
  NodeData,
  Enum,
  DataLink,
  FlowLink,
} from "../../slices/Builder/Nodes/types";

interface Visual {
  data: Record<string, any>;
}

export interface WorkflowResponse {
  id: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  graph: {
    visual: Visual;
    startNodeId: number;
    nodes: NodeData[];
    dataLinks: DataLink[];
    flowLinks: FlowLink[];
    enums: Enum[];
  };
  visual: Visual;
  stats: null;
}

export interface CreateChatbotRequest {
  workflowId: string;
  isPublic: boolean;
}

export interface CreateChatbotResponse {
  id: string;
}

export interface CreateConversationRequest {
  chatbotId: string;
  name: string;
}

export interface MessageOutput {
  text: string;
  type: "Text";
}

export interface OptionMeta {
  description: string;
  imageData: string | null;
}

export interface ConversationMessage {
  createdAt: string;
  textOutput?: MessageOutput;
  imageOutputs: any[];
  textExpected: boolean;
  optionExpected: boolean;
  expectedOptionMetas: Record<string, OptionMeta> | null;
}

export interface CreateConversationResponse {
  conversationId: string;
  initialMessage: ConversationMessage;
}

export interface TextInput {
  text: string;
  type: "Text" | "Image";
}

export interface OptionInput {
  option: string;
  type: "Text";
}

export interface SendMessageRequest {
  text?: TextInput;
  option?: OptionInput;
}

export interface SendMessageResponse {
  output: ConversationMessage;
}

export interface ConversationResponse {
  id: string;
  ownerId: string;
  chatbotId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  visual: {
    data: {
      imageUrl: string;
      ui: any;
    };
  };
}

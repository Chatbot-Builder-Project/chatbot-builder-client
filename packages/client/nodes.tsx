import {
  NodeType,
  NodeTemplates,
  HttpMethod,
} from "@chatbot-builder/store/slices/Builder/Nodes/types";
import {
  IconRoute,
  IconDatabaseExport,
  IconSwitch2,
  IconPrompt,
  IconAi,
  IconApi,
  IconLogicBuffer,
} from "@tabler/icons-react";

export const NODES: NodeTemplates = {
  [NodeType.Interaction]: {
    type: NodeType.Interaction,
    info: { id: 0, name: "New Interaction" },
    visual: { data: { x: 0, y: 0, width: 200, height: 150 } },
    textInputPort: {
      info: { id: 0, name: "Input" },
      nodeId: 0,
      dataType: "Text",
    },
    imageInputPorts: [],
    textOutputPort: null,
    outputEnumId: null,
    optionOutputPort: null,
    outputOptionMetas: {},
  },
  [NodeType.Static]: {
    type: NodeType.Static,
    info: { id: 0, name: "New Static" },
    visual: { data: { x: 0, y: 0, width: 180, height: 100 } },
    data: {
      type: "text",
      text: "Enter text here",
    },
    outputPort: null,
  },
  [NodeType.Switch]: {
    type: NodeType.Switch,
    info: { id: 0, name: "New Switch" },
    visual: { data: { x: 0, y: 0, width: 160, height: 120 } },
    enumId: null,
    inputPort: null,
    optionFlowLinkIds: null,
  },
  [NodeType.Prompt]: {
    type: NodeType.Prompt,
    info: { id: 0, name: "New Prompt" },
    visual: { data: { x: 0, y: 0, width: 200, height: 120 } },
    template: "Enter prompt template here",
    outputPort: {
      info: { id: 0, name: "Output" },
      nodeId: 0,
      dataType: "Text",
    },
    inputPorts: [],
  },
  [NodeType.SmartSwitch]: {
    type: NodeType.SmartSwitch,
    info: { id: 0, name: "New Smart Switch" },
    visual: { data: { x: 0, y: 0, width: 180, height: 140 } },
    enumId: null,
    inputPort: null,
    optionFlowLinkIds: null,
    fallbackFlowLinkId: null,
  },
  [NodeType.ApiAction]: {
    type: NodeType.ApiAction,
    info: { id: 0, name: "New API Action" },
    visual: { data: { x: 0, y: 0, width: 200, height: 160 } },
    urlInputPort: null,
    httpMethod: HttpMethod.Get,
    headers: {},
    responseOutputPort: null,
  },
  [NodeType.Generation]: {
    type: NodeType.Generation,
    info: { id: 0, name: "New Generation" },
    visual: { data: { x: 0, y: 0, width: 200, height: 140 } },
    inputPort: null,
    outputPort: null,
    options: {
      useMemory: false,
      responseSchema: null,
    },
  },
};

export const NODES_ICONS = {
  [NodeType.Interaction]: <IconRoute />,
  [NodeType.Static]: <IconDatabaseExport />,
  [NodeType.Switch]: <IconSwitch2 />,
  [NodeType.Prompt]: <IconPrompt />,
  [NodeType.SmartSwitch]: <IconLogicBuffer />,
  [NodeType.ApiAction]: <IconApi />,
  [NodeType.Generation]: <IconAi />,
};

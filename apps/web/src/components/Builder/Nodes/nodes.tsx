import {
  NodeType,
  NodeTemplates,
} from "@chatbot-builder/store/slices/Builder/Nodes/types";
import {
  IconRoute,
  IconDatabaseExport,
  IconSwitch2,
  IconPrompt,
} from "@tabler/icons-react";

export const NODES: NodeTemplates = {
  [NodeType.Interaction]: {
    type: NodeType.Interaction,
    info: { id: 0, name: "" },
    visual: { x: 0, y: 0 },
    textInputPort: {
      info: { id: 0, name: "" },
      nodeId: 0,
      dataType: "Text",
    },
    outputEnumId: 0,
    optionOutputPort: {
      info: { id: 0, name: "" },
      nodeId: 0,
      dataType: "Option",
    },
    outputOptionMetas: {},
  },
  [NodeType.Static]: {
    type: NodeType.Static,
    info: { id: 0, name: "" },
    visual: { x: 0, y: 0 },
    data: {
      type: "Text",
      text: "",
    },
    outputPort: {
      info: { id: 0, name: "" },
      nodeId: 0,
      dataType: "Text",
    },
  },
  [NodeType.Switch]: {
    type: NodeType.Switch,
    info: { id: 0, name: "" },
    visual: { x: 0, y: 0 },
    enumId: 0,
    inputPort: {
      info: { id: 0, name: "" },
      nodeId: 0,
      dataType: "Option",
    },
    optionFlowLinkIds: {},
  },
  [NodeType.Prompt]: {
    type: NodeType.Prompt,
    info: { id: 0, name: "" },
    visual: { x: 0, y: 0 },
    template: "",
    outputPort: {
      info: { id: 0, name: "" },
      nodeId: 0,
      dataType: "Text",
    },
    inputPorts: [],
  },
};

export const NODES_ICONS = {
  [NodeType.Interaction]: <IconRoute />,
  [NodeType.Static]: <IconDatabaseExport />,
  [NodeType.Switch]: <IconSwitch2 />,
  [NodeType.Prompt]: <IconPrompt />,
};

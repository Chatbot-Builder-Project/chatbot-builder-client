import {
  NodeData,
  Port,
  NodeType,
  BaseInfo,
} from "@chatbot-builder/store/slices/Builder/Nodes/types";

export function getAllInputPorts(node?: NodeData): Array<Port> {
  const list: Array<Port> = [];
  if (!node) {
    return list;
  }
  list.push(...getInputPorts(node, "text"));
  list.push(...getInputPorts(node, "image"));
  list.push(...getInputPorts(node, "option"));
  return list;
}

export function getAllOutputPorts(node?: NodeData): Array<Port> {
  const list: Array<Port> = [];
  if (!node) {
    return list;
  }
  list.push(...getOutputPorts(node, "text"));
  list.push(...getOutputPorts(node, "image"));
  list.push(...getOutputPorts(node, "option"));
  return list;
}

export function getInputPorts(
  node: NodeData,
  type: "text" | "image" | "option"
): Array<Port> {
  const list: Array<Port> = [];
  if (type == "text") {
    switch (node.type) {
      case NodeType.Interaction:
        if ("textInputPort" in node && node.textInputPort) {
          list.push(node.textInputPort);
        }
        break;
      case NodeType.Prompt:
        if ("inputPorts" in node) {
          list.push(...node.inputPorts);
        }
        break;
      case NodeType.SmartSwitch:
        if ("inputPort" in node) {
          list.push(node.inputPort);
        }
        break;
      case NodeType.ApiAction:
        if ("urlInputPort" in node) {
          list.push(node.urlInputPort);
        }
        if ("bodyInputPort" in node && node.bodyInputPort) {
          list.push(node.bodyInputPort);
        }
        break;
      case NodeType.Generation:
        if ("inputPort" in node) {
          list.push(node.inputPort);
        }
        break;
    }
  } else if (type == "image") {
    switch (node.type) {
      case NodeType.Interaction:
        if ("imageInputPorts" in node && node.imageInputPorts) {
          list.push(...node.imageInputPorts);
        }
        break;
    }
  } else if (type == "option") {
    switch (node.type) {
      case NodeType.Switch:
        if ("inputPort" in node) {
          list.push(node.inputPort);
        }
        break;
    }
  }
  return list;
}

export function getOutputPorts(
  node: NodeData,
  type: "text" | "image" | "option"
): Array<Port> {
  const list: Array<Port> = [];
  if (type === "text") {
    switch (node.type) {
      case NodeType.Interaction:
        if ("textOutputPort" in node && node.textOutputPort) {
          list.push(node.textOutputPort);
        }
        break;
      case NodeType.Static:
        if ("data" in node && node.data.type === "text") {
          list.push(node.outputPort);
        }
        break;
      case NodeType.Prompt:
        if ("outputPort" in node) {
          list.push(node.outputPort);
        }
        break;
      case NodeType.ApiAction:
        if ("responseOutputPort" in node) {
          list.push(node.responseOutputPort);
        }
        break;
      case NodeType.Generation:
        if ("outputPort" in node) {
          list.push(node.outputPort);
        }
        break;
    }
  } else if (type === "image") {
    switch (node.type) {
      case NodeType.Static:
        if ("data" in node && node.data.type === "image") {
          list.push(node.outputPort);
        }
        break;
    }
  } else if (type === "option") {
    switch (node.type) {
      case NodeType.Interaction:
        if ("optionOutputPort" in node && node.optionOutputPort) {
          list.push(node.optionOutputPort);
        }
        break;
      case NodeType.Static:
        if ("data" in node && node.data.type === "option") {
          list.push(node.outputPort);
        }
        break;
    }
  }
  return list;
}

export function getInputPortsWithNodeInfo(
  node: NodeData,
  type: "text" | "image" | "option"
): Array<{ inputPort: Port; nodeInfo: BaseInfo }> {
  return getInputPorts(node, type).map((inputPort) => ({
    inputPort,
    nodeInfo: node.info,
  }));
}

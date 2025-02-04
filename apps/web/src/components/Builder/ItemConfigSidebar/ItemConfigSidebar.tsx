import {
  selectNodeById,
  selectElementId,
  updateNode,
  selectAllNodes,
  selectAllDataLinks,
  addDataLink,
  removeDataLink,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import {
  Container,
  InputField,
  TextArea,
  SectionTitle,
  Select,
  ArrayContainer,
  ArrayItem,
  IconButton,
} from "./ItemConfigSidebar.styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@chatbot-builder/store/store";
import {
  NodeType,
  HttpMethod,
  NodeData,
  Port,
  BaseInfo,
} from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { cloneDeep } from "lodash";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Autocomplete, TextField, Switch, Divider } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import Editor from "@monaco-editor/react";

const StyledAutocomplete = muiStyled(Autocomplete)`
  & .MuiOutlinedInput-root {
    color: ${(props) => props.theme.palette.text.primary};
    background: ${(props) => props.theme.palette.background.paper};
    border-radius: 4px;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.primary.main};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.primary.main};
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.palette.divider};
  }

  & .MuiAutocomplete-tag {
    background: ${(props) => props.theme.palette.primary.dark};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }

  & .MuiAutocomplete-clearIndicator,
  & .MuiAutocomplete-popupIndicator {
    color: ${(props) => props.theme.palette.text.secondary};
  }

  & .MuiAutocomplete-paper {
    background: ${(props) => props.theme.palette.background.paper};
    color: ${(props) => props.theme.palette.text.primary};
  }

  & .MuiAutocomplete-option {
    &:hover {
      background: ${(props) => props.theme.palette.action.hover};
    }
    &[aria-selected="true"] {
      background: ${(props) => props.theme.palette.action.selected};
    }
  }
`;

const StyledSwitch = muiStyled(Switch)`
  & .MuiSwitch-switchBase.Mui-checked {
    color: #009bff;
    &:hover {
      background-color: rgba(0, 155, 255, 0.08);
    }
  }
  & .MuiSwitch-switchBase {
     background-color: #373737 ;
  }
  & .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: #009bff;
  }
`;

export function getInputPortsWithNodeInfo(
  node: NodeData,
  type: "text" | "image" | "option"
): Array<{ inputPort: Port; nodeInfo: BaseInfo }> {
  const list: Array<{ inputPort: Port; nodeInfo: BaseInfo }> = [];
  if (type === "text") {
    switch (node.type) {
      case NodeType.Interaction:
        if (node.textInputPort)
          list.push({ inputPort: node.textInputPort, nodeInfo: node.info });
        break;
      case NodeType.Static:
        if ("data" in node && node.data.type === "text" && node.outputPort)
          list.push({ inputPort: node.outputPort, nodeInfo: node.info });
        break;
      case NodeType.SmartSwitch:
        if (node.inputPort)
          list.push({ inputPort: node.inputPort, nodeInfo: node.info });
        break;
      case NodeType.Prompt:
        if (node.inputPorts)
          list.push(
            ...node.inputPorts.map((inputPort) => ({
              inputPort,
              nodeInfo: node.info,
            }))
          );
        break;
      case NodeType.ApiAction:
        if (node.urlInputPort)
          list.push({ inputPort: node.urlInputPort, nodeInfo: node.info });
        if (node.bodyInputPort)
          list.push({ inputPort: node.bodyInputPort, nodeInfo: node.info });
        break;
      case NodeType.Generation:
        if (node.inputPort)
          list.push({ inputPort: node.inputPort, nodeInfo: node.info });
        break;
    }
  } else if (type === "image") {
    switch (node.type) {
      case NodeType.Interaction:
        if (node.imageInputPorts)
          list.push(
            ...node.imageInputPorts.map((imageInputPort) => ({
              inputPort: imageInputPort,
              nodeInfo: node.info,
            }))
          );
        break;
      case NodeType.Static:
        if ("data" in node && node.data.type === "image" && node.outputPort)
          list.push({ inputPort: node.outputPort, nodeInfo: node.info });
        break;
    }
  } else if (type === "option") {
    switch (node.type) {
      case NodeType.Interaction:
        if (node.optionOutputPort)
          list.push({ inputPort: node.optionOutputPort, nodeInfo: node.info });
        break;
      case NodeType.Static:
        if ("data" in node && node.data.type === "option" && node.outputPort)
          list.push({ inputPort: node.outputPort, nodeInfo: node.info });
        break;
      case NodeType.Switch:
        if (node.inputPort)
          list.push({ inputPort: node.inputPort, nodeInfo: node.info });
        break;
    }
  }
  return list;
}

const ItemConfigSidebar = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectElementId);
  const selectedNode = useSelector((state: RootState) =>
    selectedId ? selectNodeById(state, selectedId) : null
  );

  const allNodes = useSelector(selectAllNodes);
  const allDataLinks = useSelector(selectAllDataLinks);
  const allTextInputPortsWithNodeInfo = allNodes
    .map((node) => getInputPortsWithNodeInfo(node, "text"))
    .flat();

  const allImageInputPortsWithNodeInfo = allNodes
    .map((node) => getInputPortsWithNodeInfo(node, "image"))
    .flat();
  const allOptionInputPortsWithNodeInfo = allNodes
    .map((node) => getInputPortsWithNodeInfo(node, "option"))
    .flat();

  console.log("asdasddsdasdasdASD", {
    allTextInputPortsWithNodeInfo,
    selectedNode,
  });
  const renderNodeIdSelect = (
    path: string[],
    currentValue: number | undefined,
    label: string
  ) => (
    <StyledAutocomplete
      value={allNodes.find((node) => node.info.id === currentValue) || null}
      onChange={(_, newValue) => {
        if (!selectedNode) return;
        const updated = cloneDeep(selectedNode);
        let target = updated;
        path.slice(0, -1).forEach((key) => {
          if (!target[key]) target[key] = {};
          target = target[key];
        });
        target[path[path.length - 1]] = newValue?.info.id;
        dispatch(updateNode(updated));
      }}
      options={allNodes}
      getOptionLabel={(option) => option.info.name}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" size="small" />
      )}
    />
  );

  const renderPortIdSelect = (
    path: string[],
    currentValue: number | undefined,
    sourceNodeId: number | undefined,
    label: string
  ) => {
    const sourceNode = allNodes.find((n) => n.info.id === sourceNodeId);
    const availablePorts = sourceNode?.inputPorts || [];

    return (
      <StyledAutocomplete
        value={
          availablePorts.find((port) => port.info.id === currentValue) || null
        }
        onChange={(_, newValue) => {
          if (!selectedNode) return;
          const updated = cloneDeep(selectedNode);
          let target = updated;
          path.slice(0, -1).forEach((key) => {
            if (!target[key]) target[key] = {};
            target = target[key];
          });
          target[path[path.length - 1]] = newValue?.info.id;
          dispatch(updateNode(updated));
        }}
        options={availablePorts}
        getOptionLabel={(option) => option.info.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            size="small"
          />
        )}
      />
    );
  };

  const renderPromptNode = () =>
    selectedNode?.type === NodeType.Prompt ? (
      <>
        <SectionTitle>Template</SectionTitle>
        <TextArea
          value={selectedNode?.template || ""}
          onChange={(e) => {
            const updated = cloneDeep(selectedNode);
            updated.template = e.target.value;
            dispatch(updateNode(updated));
          }}
        />
        <SectionTitle>Input Ports</SectionTitle>
        <ArrayContainer>
          {selectedNode?.inputPorts?.map((port, index) => (
            <ArrayItem key={index}>
              <InputField
                value={port.info.name}
                onChange={(e) => {
                  const updated = cloneDeep(selectedNode);
                  updated.inputPorts[index].info.name = e.target.value;
                  dispatch(updateNode(updated));
                }}
              />
              <IconButton
                onClick={() => {
                  const updated = cloneDeep(selectedNode);
                  updated.inputPorts = selectedNode.inputPorts.filter(
                    (_, i) => i !== index
                  );
                  dispatch(updateNode(updated));
                }}
              >
                <IconTrash size={18} />
              </IconButton>
            </ArrayItem>
          ))}
          <IconButton
            onClick={() => {
              const updated = cloneDeep(selectedNode);
              const newPort = {
                info: { id: Date.now(), name: `Input_${Date.now()}` },
                nodeId: selectedNode!.info.id,
                dataType: "string",
              };
              updated.inputPorts = [
                ...(selectedNode?.inputPorts || []),
                newPort,
              ];
              dispatch(updateNode(updated));
            }}
          >
            <IconPlus size={18} />
          </IconButton>
        </ArrayContainer>
      </>
    ) : null;

  const renderStaticNode = () =>
    selectedNode?.type === NodeType.Static ? (
      <>
        <SectionTitle>Static Text</SectionTitle>
        <TextArea
          value={selectedNode?.data?.text || ""}
          onChange={(e) => {
            const updated = cloneDeep(selectedNode);
            updated.data.text = e.target.value;
            dispatch(updateNode(updated));
          }}
        />
      </>
    ) : null;

  const renderInteractionNode = () =>
    selectedNode?.type === NodeType.Interaction ? (
      <>
        <SectionTitle>Text Input Port</SectionTitle>
        {renderPortIdSelect(
          ["textInputPort"],
          selectedNode?.textInputPort?.info.id,
          selectedNode?.info.id,
          "Select Input Port"
        )}

        <SectionTitle>Options</SectionTitle>
        <ArrayContainer>
          {Object.entries(selectedNode?.outputOptionMetas || {}).map(
            ([key, value], index) => (
              <ArrayItem key={index}>
                <InputField
                  placeholder="Option"
                  value={key}
                  onChange={(e) => {
                    const updated = cloneDeep(selectedNode);
                    const newMetas = { ...selectedNode?.outputOptionMetas };
                    delete newMetas[key];
                    newMetas[e.target.value] = value;
                    updated.outputOptionMetas = newMetas;
                    dispatch(updateNode(updated));
                  }}
                />
                <InputField
                  placeholder="Description"
                  value={value.Description}
                  onChange={(e) => {
                    const updated = cloneDeep(selectedNode);
                    const newMetas = { ...selectedNode?.outputOptionMetas };
                    newMetas[key] = { Description: e.target.value };
                    updated.outputOptionMetas = newMetas;
                    dispatch(updateNode(updated));
                  }}
                />
                <IconButton
                  onClick={() => {
                    const updated = cloneDeep(selectedNode);
                    const newMetas = { ...selectedNode?.outputOptionMetas };
                    delete newMetas[key];
                    updated.outputOptionMetas = newMetas;
                    dispatch(updateNode(updated));
                  }}
                >
                  <IconTrash size={18} />
                </IconButton>
              </ArrayItem>
            )
          )}
          <IconButton
            onClick={() => {
              const updated = cloneDeep(selectedNode);
              const newMetas = { ...selectedNode?.outputOptionMetas };
              newMetas[`Option_${Date.now()}`] = { Description: "" };
              updated.outputOptionMetas = newMetas;
              dispatch(updateNode(updated));
            }}
          >
            <IconPlus size={18} />
          </IconButton>
        </ArrayContainer>

        <SectionTitle>Output Enum</SectionTitle>
        {renderNodeIdSelect(
          ["outputEnumId"],
          selectedNode?.outputEnumId,
          "Select Enum"
        )}
      </>
    ) : null;

  const renderApiActionNode = () =>
    selectedNode?.type === NodeType.ApiAction ? (
      <>
        <SectionTitle>HTTP Method</SectionTitle>
        <Select
          value={selectedNode?.httpMethod}
          onChange={(e) => {
            const updated = cloneDeep(selectedNode);
            updated.httpMethod = e.target.value as HttpMethod;
            dispatch(updateNode(updated));
          }}
        >
          {Object.values(HttpMethod).map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </Select>

        <SectionTitle>Headers</SectionTitle>
        <ArrayContainer>
          {Object.entries(selectedNode?.headers || {}).map(
            ([key, value], index) => (
              <ArrayItem key={index}>
                <InputField
                  placeholder="Header Key"
                  value={key}
                  onChange={(e) => {
                    const updated = cloneDeep(selectedNode);
                    const newHeaders = { ...selectedNode?.headers };
                    delete newHeaders[key];
                    newHeaders[e.target.value] = value;
                    updated.headers = newHeaders;
                    dispatch(updateNode(updated));
                  }}
                />
                <InputField
                  placeholder="Header Value"
                  value={value}
                  onChange={(e) => {
                    const updated = cloneDeep(selectedNode);
                    const newHeaders = { ...selectedNode?.headers };
                    newHeaders[key] = e.target.value;
                    updated.headers = newHeaders;
                    dispatch(updateNode(updated));
                  }}
                />
                <IconButton
                  onClick={() => {
                    const updated = cloneDeep(selectedNode);
                    const newHeaders = { ...selectedNode?.headers };
                    delete newHeaders[key];
                    updated.headers = newHeaders;
                    dispatch(updateNode(updated));
                  }}
                >
                  <IconTrash size={18} />
                </IconButton>
              </ArrayItem>
            )
          )}
          <IconButton
            onClick={() => {
              const updated = cloneDeep(selectedNode);
              const newHeaders = { ...selectedNode?.headers, "": "" };
              updated.headers = newHeaders;
              dispatch(updateNode(updated));
            }}
          >
            <IconPlus size={18} />
          </IconButton>
        </ArrayContainer>
      </>
    ) : null;
  console.log(
    "asdfhjklasdfjkhl;azsdfhjklasdfkhjlasdfhjklafds",
    allTextInputPortsWithNodeInfo.filter(
      (item) =>
        item.nodeInfo.id !== selectedNode?.info.id &&
        allDataLinks.some(
          (link) =>
            link.sourcePortId === selectedNode?.outputPort.info.id &&
            link.targetPortId === item.inputPort.info.id
        )
    )
  );
  const renderGenerationNode = () =>
    selectedNode?.type === NodeType.Generation ? (
      <>
        <SectionTitle>Response Schema</SectionTitle>
        <Editor
          height="200px"
          defaultLanguage="json"
          value={JSON.stringify(
            selectedNode?.options?.responseSchema || {},
            null,
            2
          )}
          onChange={(value) => {
            try {
              const updated = cloneDeep(selectedNode);
              const schema = JSON.parse(value || "{}");
              updated.options.responseSchema = schema;
              dispatch(updateNode(updated));
            } catch (err) {
              console.log(err);
            }
          }}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 12,
          }}
        />
        <Divider
          sx={{ width: "100%", bgcolor: "white", marginY: 3, marginX: "auto" }}
        />
        <SectionTitle>Send Generated Text To Input Ports: </SectionTitle>
        <StyledAutocomplete
          multiple
          options={allTextInputPortsWithNodeInfo.filter(
            (item) => item.inputPort.nodeId !== selectedNode.info.id
          )}
          value={allTextInputPortsWithNodeInfo.filter((item) =>
            allDataLinks.some(
              (link) =>
                link.sourcePortId === selectedNode.outputPort.info.id &&
                link.targetPortId === item.inputPort.info.id
            )
          )}
          onChange={(_, newValue) => {
            // Remove existing links from this output port
            const linksToRemove = allDataLinks.filter(
              (link) => link.sourcePortId === selectedNode.outputPort.info.id
            );
            linksToRemove.forEach((link) => {
              dispatch(removeDataLink(link.info.id));
            });

            // Create new links for selected ports
            newValue.forEach((item) => {
              dispatch(
                addDataLink({
                  info: {
                    id: Date.now() + Math.random(),
                    name: `DataLink_${Date.now()}`,
                  },
                  sourcePortId: selectedNode.outputPort.info.id,
                  targetPortId: item.inputPort.info.id,
                })
              );
            });
          }}
          getOptionLabel={(option) =>
            `${option.nodeInfo.name} - ${option.inputPort.info.name}`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Input Ports"
              variant="outlined"
              size="small"
            />
          )}
        />
      </>
    ) : null;

  return (
    <Container $isOpened={!!selectedNode}>
      {selectedNode && (
        <>
          <SectionTitle>Node Type</SectionTitle>
          <div>{selectedNode.type}</div>

          <SectionTitle>Node Name</SectionTitle>
          <InputField
            value={selectedNode.info.name}
            onChange={(e) => {
              const updated = cloneDeep(selectedNode);
              updated.info.name = e.target.value;
              dispatch(updateNode(updated));
            }}
          />

          {selectedNode.type === NodeType.Generation && renderGenerationNode()}
          {selectedNode.type === NodeType.Prompt && renderPromptNode()}
          {selectedNode.type === NodeType.Static && renderStaticNode()}
          {selectedNode.type === NodeType.Interaction &&
            renderInteractionNode()}
          {selectedNode.type === NodeType.ApiAction && renderApiActionNode()}
        </>
      )}
    </Container>
  );
};

export default ItemConfigSidebar;

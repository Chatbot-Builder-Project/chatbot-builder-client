import {
  selectNodeById,
  selectElementId,
  updateNode,
  selectAllNodes,
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
  SaveButton,
} from "./ItemConfigSidebar.styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@chatbot-builder/store/store";
import { useEffect, useState } from "react";
import {
  NodeData,
  NodeType,
  HttpMethod,
} from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { cloneDeep } from "lodash";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Autocomplete, TextField } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

interface UpdatePath {
  path: string[];
  value: unknown;
}

const StyledAutocomplete = muiStyled(Autocomplete)`
  background: ${(props) => props.theme.palette.background.paper};
  border-radius: 4px;
  
  & .MuiOutlinedInput-root {
    color: white;
  }
  
  & .MuiOutlinedInput-notchedOutline {
    border-color: #373737;
  }
`;

const ItemConfigSidebar = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectElementId);
  const selectedNode = useSelector((state: RootState) =>
    selectedId ? selectNodeById(state, selectedId) : null
  );
  const allNodes = useSelector(selectAllNodes);
  const [localNode, setLocalNode] = useState<NodeData | null>(null);

  useEffect(() => {
    setLocalNode(selectedNode ? cloneDeep(selectedNode) : null);
  }, [selectedNode]);

  const updateLocalNode = (update: UpdatePath) => {
    if (!localNode) return;
    const updated = cloneDeep(localNode);
    let target: Record<string, any> = updated;
    const { path, value } = update;
    const lastKey = path[path.length - 1];

    path.slice(0, -1).forEach((key) => {
      if (!target[key]) target[key] = {};
      target = target[key];
    });

    target[lastKey] = value;
    setLocalNode(updated as NodeData);
  };

  const renderNodeIdSelect = (
    path: string[],
    currentValue: number | undefined,
    label: string
  ) => (
    <StyledAutocomplete
      value={allNodes.find((node) => node.info.id === currentValue) || null}
      onChange={(_, newValue) => {
        updateLocalNode({
          path,
          value: newValue?.info.id,
        });
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
          updateLocalNode({
            path,
            value: newValue?.info.id,
          });
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

  const renderPromptNode = () => (
    <>
      <SectionTitle>Template</SectionTitle>
      <TextArea
        value={localNode?.template || ""}
        onChange={(e) =>
          updateLocalNode({ path: ["template"], value: e.target.value })
        }
      />
      <SectionTitle>Input Ports</SectionTitle>
      <ArrayContainer>
        {localNode?.inputPorts?.map((port, index) => (
          <ArrayItem key={index}>
            <InputField
              value={port.info.name}
              onChange={(e) => {
                const newPorts = [...localNode.inputPorts];
                newPorts[index].info.name = e.target.value;
                updateLocalNode({ path: ["inputPorts"], value: newPorts });
              }}
            />
            <IconButton
              onClick={() => {
                const newPorts = localNode.inputPorts.filter(
                  (_, i) => i !== index
                );
                updateLocalNode({ path: ["inputPorts"], value: newPorts });
              }}
            >
              <IconTrash size={18} />
            </IconButton>
          </ArrayItem>
        ))}
        <IconButton
          onClick={() => {
            const newPort = {
              info: { id: Date.now(), name: `Input_${Date.now()}` },
              nodeId: localNode!.info.id,
              dataType: "string",
            };
            updateLocalNode({
              path: ["inputPorts"],
              value: [...(localNode?.inputPorts || []), newPort],
            });
          }}
        >
          <IconPlus size={18} />
        </IconButton>
      </ArrayContainer>
    </>
  );

  const renderStaticNode = () => (
    <>
      <SectionTitle>Static Text</SectionTitle>
      <TextArea
        value={localNode?.data?.text || ""}
        onChange={(e) =>
          updateLocalNode({ path: ["data", "text"], value: e.target.value })
        }
      />
    </>
  );

  const renderInteractionNode = () => (
    <>
      <SectionTitle>Text Input Port</SectionTitle>
      {renderPortIdSelect(
        ["textInputPort"],
        localNode?.textInputPort?.info.id,
        localNode?.info.id,
        "Select Input Port"
      )}

      <SectionTitle>Options</SectionTitle>
      <ArrayContainer>
        {Object.entries(localNode?.outputOptionMetas || {}).map(
          ([key, value], index) => (
            <ArrayItem key={index}>
              <InputField
                placeholder="Option"
                value={key}
                onChange={(e) => {
                  const newMetas = { ...localNode?.outputOptionMetas };
                  delete newMetas[key];
                  newMetas[e.target.value] = value;
                  updateLocalNode({
                    path: ["outputOptionMetas"],
                    value: newMetas,
                  });
                }}
              />
              <InputField
                placeholder="Description"
                value={value.Description}
                onChange={(e) => {
                  const newMetas = { ...localNode?.outputOptionMetas };
                  newMetas[key] = { Description: e.target.value };
                  updateLocalNode({
                    path: ["outputOptionMetas"],
                    value: newMetas,
                  });
                }}
              />
              <IconButton
                onClick={() => {
                  const newMetas = { ...localNode?.outputOptionMetas };
                  delete newMetas[key];
                  updateLocalNode({
                    path: ["outputOptionMetas"],
                    value: newMetas,
                  });
                }}
              >
                <IconTrash size={18} />
              </IconButton>
            </ArrayItem>
          )
        )}
        <IconButton
          onClick={() => {
            const newMetas = { ...localNode?.outputOptionMetas };
            newMetas[`Option_${Date.now()}`] = { Description: "" };
            updateLocalNode({ path: ["outputOptionMetas"], value: newMetas });
          }}
        >
          <IconPlus size={18} />
        </IconButton>
      </ArrayContainer>

      <SectionTitle>Output Enum</SectionTitle>
      {renderNodeIdSelect(
        ["outputEnumId"],
        localNode?.outputEnumId,
        "Select Enum"
      )}
    </>
  );

  const renderApiActionNode = () => (
    <>
      <SectionTitle>HTTP Method</SectionTitle>
      <Select
        value={localNode?.httpMethod}
        onChange={(e) =>
          updateLocalNode({ path: ["httpMethod"], value: e.target.value })
        }
      >
        {Object.values(HttpMethod).map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </Select>

      <SectionTitle>Headers</SectionTitle>
      <ArrayContainer>
        {Object.entries(localNode?.headers || {}).map(([key, value], index) => (
          <ArrayItem key={index}>
            <InputField
              placeholder="Header Key"
              value={key}
              onChange={(e) => {
                const newHeaders = { ...localNode?.headers };
                delete newHeaders[key];
                newHeaders[e.target.value] = value;
                updateLocalNode({ path: ["headers"], value: newHeaders });
              }}
            />
            <InputField
              placeholder="Header Value"
              value={value}
              onChange={(e) => {
                const newHeaders = { ...localNode?.headers };
                newHeaders[key] = e.target.value;
                updateLocalNode({ path: ["headers"], value: newHeaders });
              }}
            />
            <IconButton
              onClick={() => {
                const newHeaders = { ...localNode?.headers };
                delete newHeaders[key];
                updateLocalNode({ path: ["headers"], value: newHeaders });
              }}
            >
              <IconTrash size={18} />
            </IconButton>
          </ArrayItem>
        ))}
        <IconButton
          onClick={() => {
            const newHeaders = { ...localNode?.headers, "": "" };
            updateLocalNode({ path: ["headers"], value: newHeaders });
          }}
        >
          <IconPlus size={18} />
        </IconButton>
      </ArrayContainer>
    </>
  );

  const renderGenerationNode = () => (
    <>
      <SectionTitle>Use Memory</SectionTitle>
      <input
        type="checkbox"
        checked={localNode?.options?.useMemory || false}
        onChange={(e) =>
          updateLocalNode({
            path: ["options", "useMemory"],
            value: e.target.checked,
          })
        }
      />

      <SectionTitle>Response Schema</SectionTitle>
      <TextArea
        value={JSON.stringify(
          localNode?.options?.responseSchema || {},
          null,
          2
        )}
        onChange={(e) => {
          try {
            const schema = JSON.parse(e.target.value);
            updateLocalNode({
              path: ["options", "responseSchema"],
              value: schema,
            });
          } catch (err) {
            // Handle invalid JSON
          }
        }}
      />
    </>
  );

  const handleSave = () => {
    if (localNode) {
      // Validate all required fields before dispatch
      const isValid = validateNode(localNode);
      if (isValid) {
        dispatch(updateNode(localNode));
      } else {
        // Show error message
        console.error("Invalid node configuration");
      }
    }
  };

  // Add validation function
  const validateNode = (node: NodeData): boolean => {
    switch (node.type) {
      case NodeType.Interaction:
        return (
          !!node.outputEnumId &&
          Object.keys(node.outputOptionMetas || {}).length > 0
        );
      case NodeType.Prompt:
        return !!node.template && node.inputPorts.length > 0;
      // Add other validations...
      default:
        return true;
    }
  };

  if (!localNode) return null;

  return (
    <Container $isOpened={!!selectedNode}>
      <SectionTitle>Node Type</SectionTitle>
      <div>{localNode.type}</div>

      <SectionTitle>Node Name</SectionTitle>
      <InputField
        value={localNode.info.name}
        onChange={(e) =>
          updateLocalNode({ path: ["info", "name"], value: e.target.value })
        }
      />

      {localNode.type === NodeType.Prompt && renderPromptNode()}
      {localNode.type === NodeType.Static && renderStaticNode()}
      {localNode.type === NodeType.Interaction && renderInteractionNode()}
      {localNode.type === NodeType.ApiAction && renderApiActionNode()}
      {localNode.type === NodeType.Generation && renderGenerationNode()}

      <SaveButton onClick={handleSave}>Save Changes</SaveButton>
    </Container>
  );
};

export default ItemConfigSidebar;

import {
  selectNodeById,
  selectElementId,
  updateNode,
  selectAllNodes,
  selectAllDataLinks,
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
} from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { cloneDeep } from "lodash";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Divider } from "@mui/material";
import Editor from "@monaco-editor/react";
import { InputPortsAutocomplete } from "./InputPortsAutocomplete";
import { getInputPortsWithNodeInfo } from "./utils";
import { ImageModalUploader } from "../../ImageModalUploader/ImageModalUploader";
import { useState } from "react";

const ItemConfigSidebar = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectElementId);
  const selectedNode = useSelector((state: RootState) =>
    selectedId ? selectNodeById(state, selectedId) : null
  );
  const [isUploadImageModalOpen, setIsUploadImageModalOpen] = useState(false);
  const allNodes = useSelector(selectAllNodes);
  const allDataLinks = useSelector(selectAllDataLinks);

  // const renderNodeIdSelect = (
  //   path: string[],
  //   currentValue: number | undefined,
  //   label: string
  // ) => (
  //   <StyledAutocomplete
  //     value={allNodes.find((node) => node.info.id === currentValue) || null}
  //     onChange={(_, newValue) => {
  //       if (!selectedNode) return;
  //       const updated = cloneDeep(selectedNode);
  //       let target = updated;
  //       path.slice(0, -1).forEach((key) => {
  //         if (!target[key]) target[key] = {};
  //         target = target[key];
  //       });
  //       target[path[path.length - 1]] = newValue?.info.id;
  //       dispatch(updateNode(updated));
  //     }}
  //     options={allNodes}
  //     getOptionLabel={(option) => option.info.name}
  //     renderInput={(params) => (
  //       <TextField {...params} label={label} variant="outlined" size="small" />
  //     )}
  //   />
  // );

  // const renderPortIdSelect = (
  //   path: string[],
  //   currentValue: number | undefined,
  //   sourceNodeId: number | undefined,
  //   label: string
  // ) => {
  //   const sourceNode = allNodes.find((n) => n.info.id === sourceNodeId);
  //   const availablePorts = sourceNode?.inputPorts || [];

  //   return (
  //     <StyledAutocomplete
  //       value={
  //         availablePorts.find((port) => port.info.id === currentValue) || null
  //       }
  //       onChange={(_, newValue) => {
  //         if (!selectedNode) return;
  //         const updated = cloneDeep(selectedNode);
  //         let target = updated;
  //         path.slice(0, -1).forEach((key) => {
  //           if (!target[key]) target[key] = {};
  //           target = target[key];
  //         });
  //         target[path[path.length - 1]] = newValue?.info.id;
  //         dispatch(updateNode(updated));
  //       }}
  //       options={availablePorts}
  //       getOptionLabel={(option) => option.info.name}
  //       renderInput={(params) => (
  //         <TextField
  //           {...params}
  //           label={label}
  //           variant="outlined"
  //           size="small"
  //         />
  //       )}
  //     />
  //   );
  // };

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
        <ImageModalUploader
          open={isUploadImageModalOpen}
          onClose={() => setIsUploadImageModalOpen(false)}
        />
        <SectionTitle>Static Text</SectionTitle>
        <TextArea
          value={selectedNode?.data?.text || ""}
          onChange={(e) => {
            const updated = cloneDeep(selectedNode);
            updated.data.text = e.target.value;
            dispatch(updateNode(updated));
          }}
        />
        <InputPortsAutocomplete
          allDataInputPorts={allNodes
            .map((node) =>
              getInputPortsWithNodeInfo(node, selectedNode.data.type)
            )
            .flat()}
          allDataLinks={allDataLinks}
          selectedNodeId={selectedNode.info.id}
          sourcePortId={selectedNode.outputPort.info.id}
        />
      </>
    ) : null;

  const renderInteractionNode = () =>
    selectedNode?.type === NodeType.Interaction ? (
      <>
        <SectionTitle>Text Input Port</SectionTitle>
        {/* {renderPortIdSelect(
          ["textInputPort"],
          selectedNode?.textInputPort?.info.id,
          selectedNode?.info.id,
          "Select Input Port"
        )} */}

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
        {/* {renderNodeIdSelect(
          ["outputEnumId"],
          selectedNode?.outputEnumId,
          "Select Enum"
        )} */}
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
        <InputPortsAutocomplete
          allDataInputPorts={allNodes
            .map((node) => getInputPortsWithNodeInfo(node, "text"))
            .flat()}
          allDataLinks={allDataLinks}
          selectedNodeId={selectedNode.info.id}
          sourcePortId={selectedNode.outputPort.info.id}
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

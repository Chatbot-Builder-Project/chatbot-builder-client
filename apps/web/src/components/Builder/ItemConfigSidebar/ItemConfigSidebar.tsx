import {
  selectNodeById,
  selectElementId,
  updateNode,
  selectAllNodes,
  selectAllDataLinks,
  selectAllEnums,
  updateNodeVisual,
  selectAllFlowLinks,
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
  OutputTypeSwitch,
  SwitchLabel,
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
import Switch from "@mui/material/Switch";
import Editor from "@monaco-editor/react";
import { InputPortsAutocomplete } from "./InputPortsAutocomplete";
import { getInputPortsWithNodeInfo } from "./utils";
import { ImageSelectorButton } from "../../ImageModalUploader/ImageModalUploader";
let idCounter = 1;
const ItemConfigSidebar = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectElementId);
  const selectedNode = useSelector((state: RootState) =>
    selectedId ? selectNodeById(state, selectedId) : null
  );
  const allNodes = useSelector(selectAllNodes);
  const allDataLinks = useSelector(selectAllDataLinks);
  const allEnums = useSelector(selectAllEnums);
  const allFlowLinks = useSelector(selectAllFlowLinks);

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
          placeholder="Enter your template here..."
        />

        <SectionTitle>Text Input Ports</SectionTitle>
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
              <SwitchLabel style={{ minWidth: "120px" }}>
                id: {`${port.info.id}`}
              </SwitchLabel>
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
                info: { id: idCounter, name: `Input_${idCounter}` },
                nodeId: selectedNode.info.id,
                dataType: "text",
              };
              idCounter++;
              updated.inputPorts = [...(updated.inputPorts || []), newPort];
              dispatch(updateNode(updated));
            }}
          >
            <IconPlus size={18} />
          </IconButton>
        </ArrayContainer>

        <Divider
          sx={{ width: "100%", bgcolor: "white", marginY: 3, marginX: "auto" }}
        />

        <SectionTitle>Output Configuration</SectionTitle>
        <InputPortsAutocomplete
          allDataInputPorts={allNodes
            .map((node) => getInputPortsWithNodeInfo(node, "text"))
            .flat()}
          allDataLinks={allDataLinks}
          selectedNodeId={selectedNode.info.id}
          sourcePortId={selectedNode.outputPort?.info?.id}
        />
      </>
    ) : null;

  const renderStaticNode = () =>
    selectedNode?.type === NodeType.Static ? (
      <>
        <SectionTitle>Content Type</SectionTitle>
        <Select
          value={selectedNode?.data?.type || "text"}
          onChange={(e) => {
            const updated = cloneDeep(selectedNode);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updated.data = { type: e.target.value as any };
            dispatch(updateNode(updated));
          }}
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="option">Option</option>
        </Select>

        {selectedNode?.data?.type === "text" && (
          <>
            <SectionTitle>Static Text</SectionTitle>
            <TextArea
              value={selectedNode?.data?.text || ""}
              onChange={(e) => {
                const updated = cloneDeep(selectedNode);
                updated.data.text = e.target.value;
                dispatch(updateNode(updated));
              }}
              style={{ minHeight: "100px" }}
            />
          </>
        )}

        {selectedNode?.data?.type === "image" && (
          <>
            <SectionTitle>Image</SectionTitle>
            <ImageSelectorButton
              onImageSelect={(url) => {
                const updated = cloneDeep(selectedNode);
                updated.data.url = url;
                dispatch(updateNode(updated));
              }}
            />
            {selectedNode.data.url && (
              <img
                src={selectedNode.data.url}
                alt="Selected"
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "contain",
                  borderRadius: "4px",
                  marginTop: "8px",
                  backgroundColor: "#2a2a2a",
                }}
              />
            )}
          </>
        )}

        {selectedNode?.data?.type === "option" && (
          <>
            <SectionTitle>Select Enum</SectionTitle>
            <Select
              value={selectedNode?.visual?.data?.enumId || ""}
              onChange={(e) => {
                dispatch(
                  updateNodeVisual({
                    id: selectedNode.info.id,
                    visual: {
                      enumId: parseInt(e.target.value),
                    },
                  })
                );
              }}
              style={{ marginBottom: "12px" }}
            >
              <option value="">Select an enum</option>
              {allEnums.map((enum_) => (
                <option key={enum_.info.id} value={enum_.info.id}>
                  {enum_.info.name}
                </option>
              ))}
            </Select>

            {selectedNode?.visual?.data?.enumId && (
              <>
                <SectionTitle>Select Option</SectionTitle>
                <Select
                  value={selectedNode?.data?.option || ""}
                  onChange={(e) => {
                    const updated = cloneDeep(selectedNode);
                    updated.data.option = e.target.value;
                    dispatch(updateNode(updated));
                  }}
                >
                  <option value="">Select an option</option>
                  {allEnums
                    .find(
                      (enum_) =>
                        enum_.info.id === selectedNode?.visual?.data?.enumId
                    )
                    ?.options.map((opt) => (
                      <option key={opt.option} value={opt.option}>
                        {opt.option}
                      </option>
                    ))}
                </Select>
              </>
            )}
          </>
        )}

        <InputPortsAutocomplete
          allDataInputPorts={allNodes
            .map((node) =>
              getInputPortsWithNodeInfo(node, selectedNode.data.type)
            )
            .flat()}
          allDataLinks={allDataLinks}
          selectedNodeId={selectedNode.info.id}
          sourcePortId={selectedNode.outputPort?.info?.id}
        />
      </>
    ) : null;

  const renderInteractionNode = () =>
    selectedNode?.type === NodeType.Interaction ? (
      <>
        <SectionTitle>Image Input Ports</SectionTitle>
        <ArrayContainer>
          {selectedNode?.imageInputPorts?.map((port, index) => (
            <ArrayItem key={index}>
              <InputField
                value={port.info.name}
                onChange={(e) => {
                  const updated = cloneDeep(selectedNode);
                  updated.imageInputPorts[index].info.name = e.target.value;
                  dispatch(updateNode(updated));
                }}
              />
              <IconButton
                onClick={() => {
                  const updated = cloneDeep(selectedNode);
                  updated.imageInputPorts = updated.imageInputPorts.filter(
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
                info: { id: Date.now(), name: `Image_Input_${Date.now()}` },
                nodeId: selectedNode.info.id,
                dataType: "image",
              };
              updated.imageInputPorts = [
                ...(updated.imageInputPorts || []),
                newPort,
              ];
              dispatch(updateNode(updated));
            }}
          >
            <IconPlus size={18} />
          </IconButton>
        </ArrayContainer>
        <Divider
          sx={{ width: "100%", bgcolor: "white", marginY: 3, marginX: "auto" }}
        />
        <SectionTitle>Output Configuration</SectionTitle>
        <OutputTypeSwitch>
          <Switch
            checked={!!selectedNode?.textOutputPort}
            onChange={(_, checked) => {
              const updated = cloneDeep(selectedNode);
              if (checked) {
                updated.textOutputPort = {
                  info: { id: Date.now(), name: `Text_Output_${Date.now()}` },
                  nodeId: selectedNode.info.id,
                  dataType: "text",
                };
              } else if (updated.optionOutputPort) {
                updated.textOutputPort = null;
              }
              dispatch(updateNode(updated));
            }}
            disabled={
              !selectedNode?.textOutputPort && !selectedNode?.optionOutputPort
            }
          />
          <SwitchLabel>Text Output</SwitchLabel>
        </OutputTypeSwitch>
        <OutputTypeSwitch>
          <Switch
            checked={!!selectedNode?.optionOutputPort}
            onChange={(_, checked) => {
              const updated = cloneDeep(selectedNode);
              if (checked) {
                updated.optionOutputPort = {
                  info: { id: Date.now(), name: `Option_Output_${Date.now()}` },
                  nodeId: selectedNode.info.id,
                  dataType: "option",
                };
              } else if (updated.textOutputPort) {
                updated.optionOutputPort = null;
                updated.outputEnumId = null;
                updated.outputOptionMetas = null;
              }
              dispatch(updateNode(updated));
            }}
            disabled={
              !selectedNode?.textOutputPort && !selectedNode?.optionOutputPort
            }
          />
          <SwitchLabel>Option Output</SwitchLabel>
        </OutputTypeSwitch>

        {selectedNode.textOutputPort && (
          <>
            <SectionTitle>Text Output Configuration</SectionTitle>
            <InputPortsAutocomplete
              allDataInputPorts={allNodes
                .map((node) => getInputPortsWithNodeInfo(node, "text"))
                .flat()}
              allDataLinks={allDataLinks}
              selectedNodeId={selectedNode.info.id}
              sourcePortId={selectedNode.textOutputPort?.info?.id}
            />
          </>
        )}
        {selectedNode.optionOutputPort && (
          <>
            <SectionTitle>Option Output Configuration</SectionTitle>
            <InputPortsAutocomplete
              allDataInputPorts={allNodes
                .map((node) => getInputPortsWithNodeInfo(node, "option"))
                .flat()}
              allDataLinks={allDataLinks}
              selectedNodeId={selectedNode.info.id}
              sourcePortId={selectedNode.optionOutputPort?.info?.id}
            />

            <SectionTitle>Output Enum</SectionTitle>
            <Select
              value={selectedNode?.outputEnumId || ""}
              onChange={(e) => {
                const updated = cloneDeep(selectedNode);
                const enumId = parseInt(e.target.value);
                updated.outputEnumId = enumId;

                // Reset and initialize metadata for all enum options
                const selectedEnum = allEnums.find(
                  (enum_) => enum_.info.id === enumId
                );
                if (selectedEnum) {
                  updated.outputOptionMetas = {};
                  selectedEnum.options.forEach((opt) => {
                    updated.outputOptionMetas![opt.option] = {
                      Description: "",
                    };
                  });
                }

                dispatch(updateNode(updated));
              }}
            >
              <option value="">Select an enum</option>
              {allEnums.map((enum_) => (
                <option key={enum_.info.id} value={enum_.info.id}>
                  {enum_.info.name}
                </option>
              ))}
            </Select>

            {selectedNode.outputEnumId && (
              <>
                <SectionTitle>Option Descriptions</SectionTitle>
                <ArrayContainer>
                  {allEnums
                    .find(
                      (enum_) => enum_.info.id === selectedNode.outputEnumId
                    )
                    ?.options.map((opt) => (
                      <ArrayItem key={opt.option}>
                        <SwitchLabel style={{ minWidth: "120px" }}>
                          {opt.option}
                        </SwitchLabel>
                        <InputField
                          placeholder="Description"
                          value={
                            selectedNode.outputOptionMetas?.[opt.option]
                              ?.Description || ""
                          }
                          onChange={(e) => {
                            const updated = cloneDeep(selectedNode);
                            if (!updated.outputOptionMetas)
                              updated.outputOptionMetas = {};
                            updated.outputOptionMetas[opt.option] = {
                              Description: e.target.value,
                            };
                            dispatch(updateNode(updated));
                          }}
                        />
                      </ArrayItem>
                    ))}
                </ArrayContainer>
              </>
            )}
          </>
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

        <Divider
          sx={{ width: "100%", bgcolor: "white", marginY: 3, marginX: "auto" }}
        />

        <SectionTitle>Send Response To Input Ports</SectionTitle>
        <InputPortsAutocomplete
          allDataInputPorts={allNodes
            .map((node) => getInputPortsWithNodeInfo(node, "text"))
            .flat()}
          allDataLinks={allDataLinks}
          selectedNodeId={selectedNode.info.id}
          sourcePortId={selectedNode?.responseOutputPort?.info?.id}
        />
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
          sourcePortId={selectedNode.outputPort?.info?.id}
        />
      </>
    ) : null;

  const renderSwitchNode = () =>
    selectedNode?.type === NodeType.Switch ? (
      <>
        <SectionTitle>Select Enum</SectionTitle>
        <Select
          value={selectedNode?.enumId || ""}
          onChange={(e) => {
            const updated = cloneDeep(selectedNode);
            updated.enumId = parseInt(e.target.value);
            updated.optionFlowLinkIds = {}; // Reset flow links when enum changes
            dispatch(updateNode(updated));
          }}
        >
          <option value="">Select an enum</option>
          {allEnums.map((enum_) => (
            <option key={enum_.info.id} value={enum_.info.id}>
              {enum_.info.name}
            </option>
          ))}
        </Select>

        {selectedNode?.enumId && (
          <>
            <SectionTitle>Configure Option Flow Links</SectionTitle>
            <ArrayContainer>
              {allEnums
                .find((enum_) => enum_.info.id === selectedNode.enumId)
                ?.options.map((opt, index) => (
                  <ArrayItem key={`opt.option-${index}`}>
                    <SwitchLabel style={{ minWidth: "120px" }}>
                      {opt.option}
                    </SwitchLabel>
                    <Select
                      value={selectedNode.optionFlowLinkIds[opt.option] || ""}
                      onChange={(e) => {
                        const updated = cloneDeep(selectedNode);
                        const flowLinkId = parseInt(e.target.value);
                        updated.optionFlowLinkIds = {
                          ...updated.optionFlowLinkIds,
                          [opt.option]: flowLinkId,
                        };
                        dispatch(updateNode(updated));
                      }}
                    >
                      <option value="">Select flow link</option>
                      {allFlowLinks // Use allFlowLinks here instead
                        .filter(
                          (link) => link.sourceNodeId === selectedNode.info.id
                        )
                        .map((link) => (
                          <option key={link.info.id} value={link.info.id}>
                            {
                              allNodes.find(
                                (nodeItem) =>
                                  nodeItem.info.id === link.targetNodeId
                              )?.info.name
                            }
                          </option>
                        ))}
                    </Select>
                  </ArrayItem>
                ))}
            </ArrayContainer>
          </>
        )}
      </>
    ) : null;

  const renderSmartSwitchNode = () =>
    selectedNode?.type === NodeType.SmartSwitch ? (
      <>
        <SectionTitle>Select Enum</SectionTitle>
        <Select
          value={selectedNode?.enumId || ""}
          onChange={(e) => {
            const updated = cloneDeep(selectedNode);
            updated.enumId = parseInt(e.target.value);
            updated.optionFlowLinkIds = {}; // Reset flow links when enum changes
            updated.fallbackFlowLinkId = null;
            dispatch(updateNode(updated));
          }}
        >
          <option value="">Select an enum</option>
          {allEnums.map((enum_) => (
            <option key={enum_.info.id} value={enum_.info.id}>
              {enum_.info.name}
            </option>
          ))}
        </Select>

        {selectedNode?.enumId && (
          <>
            <SectionTitle>Configure Option Flow Links</SectionTitle>
            <ArrayContainer>
              {allEnums
                .find((enum_) => enum_.info.id === selectedNode.enumId)
                ?.options.map((opt, index) => (
                  <ArrayItem key={`opt.option-${index}`}>
                    <SwitchLabel style={{ minWidth: "120px" }}>
                      {opt.option}
                    </SwitchLabel>
                    <Select
                      value={selectedNode.optionFlowLinkIds[opt.option] || ""}
                      onChange={(e) => {
                        const updated = cloneDeep(selectedNode);
                        const flowLinkId = parseInt(e.target.value);
                        updated.optionFlowLinkIds = {
                          ...updated.optionFlowLinkIds,
                          [opt.option]: flowLinkId,
                        };
                        dispatch(updateNode(updated));
                      }}
                    >
                      <option value="">Select flow link</option>
                      {allFlowLinks
                        .filter(
                          (link) => link.sourceNodeId === selectedNode.info.id
                        )
                        .map((link) => (
                          <option key={link.info.id} value={link.info.id}>
                            {
                              allNodes.find(
                                (nodeItem) =>
                                  nodeItem.info.id === link.targetNodeId
                              )?.info.name
                            }
                          </option>
                        ))}
                    </Select>
                  </ArrayItem>
                ))}
              <ArrayItem>
                <SwitchLabel style={{ minWidth: "120px" }}>
                  Fallback
                </SwitchLabel>
                <Select
                  value={selectedNode.fallbackFlowLinkId || ""}
                  onChange={(e) => {
                    const updated = cloneDeep(selectedNode);
                    const flowLinkId = parseInt(e.target.value);
                    updated.fallbackFlowLinkId = flowLinkId;
                    dispatch(updateNode(updated));
                  }}
                >
                  <option value="">Select fallback flow link</option>
                  {allFlowLinks
                    .filter(
                      (link) => link.sourceNodeId === selectedNode.info.id
                    )
                    .map((link) => (
                      <option key={link.info.id} value={link.info.id}>
                        {
                          allNodes.find(
                            (nodeItem) => nodeItem.info.id === link.targetNodeId
                          )?.info.name
                        }
                      </option>
                    ))}
                </Select>
              </ArrayItem>
            </ArrayContainer>
          </>
        )}
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
          {selectedNode.type === NodeType.Switch && renderSwitchNode()}
          {selectedNode.type === NodeType.SmartSwitch &&
            renderSmartSwitchNode()}
        </>
      )}
    </Container>
  );
};

export default ItemConfigSidebar;

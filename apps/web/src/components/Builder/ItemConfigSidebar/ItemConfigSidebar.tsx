import {
  selectNodeById,
  selectElementId, // Changed from selectSelectedNodeId
  updateNode,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import {
  Container,
  InputField,
  TextArea,
  SectionTitle,
  OptionContainer,
  OptionRow,
} from "./ItemConfigSidebar.styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@chatbot-builder/store/store";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { NodeType } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { cloneDeep } from "lodash";

const ItemConfigSidebar = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectElementId); // Changed from selectSelectedNodeId
  const selectedNode = useSelector(
    (state: RootState) =>
      selectedId ? selectNodeById(state, selectedId) : null // Changed from selectedNodeId
  );

  const { register, reset, watch } = useForm({
    defaultValues: {
      nodeName: selectedNode?.info.name || "",
      template: selectedNode?.type === "Prompt" ? selectedNode.template : "",
      staticText: selectedNode?.type === "Static" ? selectedNode.data.text : "",
      options:
        selectedNode?.type === "Interaction"
          ? Object.entries(selectedNode.outputOptionMetas || {}).map(
              ([key, value]) => ({
                option: key,
                description: value.Description,
              })
            )
          : [],
    },
  });

  useEffect(() => {
    reset({
      nodeName: selectedNode?.info.name || "",
      template: selectedNode?.type === "Prompt" ? selectedNode.template : "",
      staticText: selectedNode?.type === "Static" ? selectedNode.data.text : "",
      options:
        selectedNode?.type === "Interaction"
          ? Object.entries(selectedNode.outputOptionMetas || {}).map(
              ([key, value]) => ({
                option: key,
                description: value.Description,
              })
            )
          : [],
    });
  }, [reset, selectedNode]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNodeUpdate = (fieldName: string, value: any) => {
    if (!selectedNode) return;

    // eslint-disable-next-line prefer-const
    let updatedNode = cloneDeep(selectedNode);

    switch (selectedNode.type) {
      case "Prompt":
        if (fieldName === "template") {
          (updatedNode as { template: string }).template = value;
        }
        break;
      case "Static":
        if (fieldName === "staticText") {
          (updatedNode as { data: { text: string } }).data.text = value;
        }
        break;
      case "Interaction":
        if (fieldName === "options") {
          const optionMetas: Record<string, { Description: string }> = {};
          value.forEach((opt: { option: string; description: string }) => {
            optionMetas[opt.option] = { Description: opt.description };
          });
          (
            updatedNode as { outputOptionMetas: typeof optionMetas }
          ).outputOptionMetas = optionMetas;
        }
        break;
    }

    if (fieldName === "nodeName") {
      updatedNode.info.name = value;
    }

    dispatch(updateNode(updatedNode));
  };

  // if (!selectedNode) return null;

  return (
    <Container $isOpened={!!selectedNode}>
      {selectedNode && (
        <>
          <SectionTitle>Node Type</SectionTitle>
          <div>{selectedNode.type}</div>

          <SectionTitle>Node Name</SectionTitle>
          <InputField
            {...register("nodeName")}
            onChange={(e) => handleNodeUpdate("nodeName", e.target.value)}
          />

          {selectedNode.type === NodeType.Prompt && (
            <>
              <SectionTitle>Template</SectionTitle>
              <TextArea
                {...register("template")}
                onChange={(e) => handleNodeUpdate("template", e.target.value)}
              />
            </>
          )}

          {selectedNode.type === NodeType.Static && (
            <>
              <SectionTitle>Static Text</SectionTitle>
              <TextArea
                {...register("staticText")}
                onChange={(e) => handleNodeUpdate("staticText", e.target.value)}
              />
            </>
          )}

          {selectedNode.type === NodeType.Interaction && (
            <>
              <SectionTitle>Options</SectionTitle>
              <OptionContainer>
                {watch("options")?.map((_, index) => (
                  <OptionRow key={index}>
                    <InputField
                      {...register(`options.${index}.option`)}
                      placeholder="Option"
                      onChange={(e) => {
                        const options = [...watch("options")];
                        options[index].option = e.target.value;
                        handleNodeUpdate("options", options);
                      }}
                    />
                    <InputField
                      {...register(`options.${index}.description`)}
                      placeholder="Description"
                      onChange={(e) => {
                        const options = [...watch("options")];
                        options[index].description = e.target.value;
                        handleNodeUpdate("options", options);
                      }}
                    />
                  </OptionRow>
                ))}
              </OptionContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ItemConfigSidebar;

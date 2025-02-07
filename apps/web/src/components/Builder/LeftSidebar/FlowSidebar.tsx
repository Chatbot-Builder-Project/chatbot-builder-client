import { NodeType } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { NODES } from "@chatbot-builder/client/nodes";
import {
  NodesContainer,
  SidebarEnumContainer,
  SidebarTitle,
  EnumItem,
  EnumOptionsContainer,
  EnumHeader,
  EnumButton,
  IconButton,
  TextField,
  EnumField,
} from "./LeftSidebar.styles";
import { SidebarNode } from "./SidebarNode";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEnum,
  selectAllEnums,
  updateEnum,
  removeEnum,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";

export const FlowSidebar = () => {
  const dispatch = useDispatch();
  const enums = useSelector(selectAllEnums);

  const handleAddEnum = () => {
    dispatch(
      addEnum({
        info: { id: 0, name: "" },
        visual: { data: {} },
        options: [],
      })
    );
  };

  const handleAddOption = (
    enumId: number,
    currentOptions: { type: string; option: string }[]
  ) => {
    dispatch(
      updateEnum({
        info: { id: enumId, name: `Enum_${enumId}` },
        visual: { data: {} },
        options: [...currentOptions, { type: "option", option: "" }],
      })
    );
  };

  const handleOptionChange = (
    enumId: number,
    optionIndex: number,
    value: string,
    currentOptions: { type: string; option: string }[]
  ) => {
    const newOptions = [...currentOptions];
    newOptions[optionIndex] = { type: "option", option: value };
    dispatch(
      updateEnum({
        info: { id: enumId, name: `Enum_${enumId}` },
        visual: { data: {} },
        options: newOptions,
      })
    );
  };

  const handleDeleteEnum = (enumId: number) => {
    dispatch(removeEnum(enumId));
  };

  const handleDeleteOption = (
    enumId: number,
    optionIndex: number,
    currentOptions: { type: string; option: string }[]
  ) => {
    const newOptions = currentOptions.filter((_, idx) => idx !== optionIndex);
    dispatch(
      updateEnum({
        info: { id: enumId, name: `Enum_${enumId}` },
        visual: { data: {} },
        options: newOptions,
      })
    );
  };

  return (
    <>
      <SidebarTitle>Nodes</SidebarTitle>
      <NodesContainer>
        {Object.entries(NODES).map(([nodeType, value]) => (
          <SidebarNode
            key={nodeType}
            nodeType={nodeType as NodeType}
            nodeDetails={value}
          />
        ))}
      </NodesContainer>
      <hr style={{ width: "90%", borderColor: "gray" }} />
      <SidebarEnumContainer>
        <EnumHeader>
          <SidebarTitle>Custom Enums</SidebarTitle>
          <EnumButton onClick={handleAddEnum}>
            <IconPlus size={20} />
            Enum
          </EnumButton>
        </EnumHeader>
        {enums.map((enum_) => (
          <EnumItem key={enum_.info.id}>
            <EnumField>
              <TextField
                color="#fff"
                placeholder={`Enum ${enum_.info.id}`}
                defaultValue={enum_.info.name}
                onChange={(e) =>
                  dispatch(
                    updateEnum({
                      info: { id: enum_.info.id, name: e.target.value },
                      visual: { data: {} },
                      options: enum_.options,
                    })
                  )
                }
              />
              <IconButton
                onClick={() => handleAddOption(enum_.info.id, enum_.options)}
              >
                <IconPlus size={18} />
              </IconButton>
              <IconButton
                isDelete
                onClick={() => handleDeleteEnum(enum_.info.id)}
              >
                <IconTrash size={18} />
              </IconButton>
            </EnumField>
            <EnumOptionsContainer>
              {enum_.options.map((option, idx) => (
                <EnumField key={idx}>
                  <TextField
                    placeholder="Option value"
                    value={option.option}
                    color="#fff"
                    onChange={(e) =>
                      handleOptionChange(
                        enum_.info.id,
                        idx,
                        e.target.value,
                        enum_.options
                      )
                    }
                  />
                  <IconButton
                    isDelete
                    onClick={() =>
                      handleDeleteOption(enum_.info.id, idx, enum_.options)
                    }
                  >
                    <IconTrash size={18} />
                  </IconButton>
                </EnumField>
              ))}
            </EnumOptionsContainer>
          </EnumItem>
        ))}
      </SidebarEnumContainer>
    </>
  );
};

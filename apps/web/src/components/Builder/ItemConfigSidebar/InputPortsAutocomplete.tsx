import { useDispatch } from "react-redux";
import {
  addDataLink,
  removeDataLink,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import {
  DataLink,
  Port,
  BaseInfo,
} from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { Autocomplete, TextField } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

const StyledAutocomplete = muiStyled(Autocomplete)`
  & .MuiOutlinedInput-root {
    color: #fff;
    background: #1e1e1e;
    border-radius: 4px;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.primary.main};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.primary.main};
    }
  }

  & .MuiInputLabel-root {
    color: #fff;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.palette.divider};
  }

  & .MuiAutocomplete-tag {
    background-color:  #009bff;
    color: #fff;
  }
    

  & .MuiAutocomplete-clearIndicator,
  & .MuiAutocomplete-popupIndicator {
    color: #fff;
  }

  & .MuiAutocomplete-popper {
    & .MuiPaper-root {
      background: #1e1e1e;
      color: #fff;
    }
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

interface InputPortsAutocompleteProps {
  allDataInputPorts: Array<{ inputPort: Port; nodeInfo: BaseInfo }>;
  allDataLinks: DataLink[];
  selectedNodeId: number;
  sourcePortId: number;
  label?: string;
}

export const InputPortsAutocomplete = ({
  allDataInputPorts,
  allDataLinks,
  selectedNodeId,
  sourcePortId,
  label = "Select Input Ports",
}: InputPortsAutocompleteProps) => {
  const dispatch = useDispatch();

  const filteredOptions = allDataInputPorts.filter(
    (item) => item.nodeInfo.id !== selectedNodeId
  );

  const selectedValues = allDataInputPorts.filter((item) =>
    allDataLinks.some(
      (link) =>
        link.sourcePortId === sourcePortId &&
        link.targetPortId === item.inputPort.info.id
    )
  );

  const handleChange = (
    _,
    newValue: Array<{ inputPort: Port; nodeInfo: BaseInfo }>
  ) => {
    const existingLinks = allDataLinks.filter(
      (link) => link.sourcePortId === sourcePortId
    );

    existingLinks.forEach((link) => {
      if (
        !newValue.some((item) => item.inputPort.info.id === link.targetPortId)
      ) {
        dispatch(removeDataLink(link.info.id));
      }
    });

    newValue.forEach((item) => {
      const linkExists = existingLinks.some(
        (link) => link.targetPortId === item.inputPort.info.id
      );

      if (!linkExists) {
        dispatch(
          addDataLink({
            info: { id: Date.now(), name: `DataLink_${Date.now()}` },
            sourcePortId: sourcePortId,
            targetPortId: item.inputPort.info.id,
          })
        );
      }
    });
  };

  return (
    <StyledAutocomplete
      multiple
      options={filteredOptions}
      value={selectedValues}
      onChange={handleChange}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getOptionLabel={(option: any) =>
        `${option.nodeInfo.name} - ${option.inputPort.info.name}`
      }
      isOptionEqualToValue={(option, value) =>
        option.inputPort.info.id === value.inputPort.info.id
      }
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" size="small" />
      )}
    />
  );
};

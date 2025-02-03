import { Box, Typography, TextField, SxProps, Theme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  selectSelectedComponent,
  updateComponentStyle,
  selectCurrentBreakpoint,
  selectChatStyles,
} from "@chatbot-builder/store/slices/Builder/Chat";
import { isChatComponent } from "@chatbot-builder/store/slices/Builder/Chat/types";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);
  const currentBreakpoint = useSelector(selectCurrentBreakpoint);
  const styles = useSelector(selectChatStyles);

  const componentStyle =
    selectedComponent && styles[selectedComponent]?.[currentBreakpoint];

  const handleStyleChange = (path: string[], value: string) => {
    if (!selectedComponent || !isChatComponent(selectedComponent)) return;

    dispatch(
      updateComponentStyle({
        component: selectedComponent,
        styleUpdate: {
          path,
          value: value.match(/^\d+$/) ? parseInt(value, 10) : value,
        },
      })
    );
  };

  const flattenStyles = (
    styles: SxProps<Theme>,
    prefix: string[] = []
  ): Array<[string[], string | number]> => {
    return _.reduce(
      styles as Record<string, unknown>,
      (acc: Array<[string[], string | number]>, value, key) => {
        if (_.isNil(value)) return acc;

        if (_.isPlainObject(value)) {
          if (key.startsWith("& .")) {
            const classPath = key.substring(3).split(".");
            return [
              ...acc,
              ..._.map(
                value as Record<string, unknown>,
                (v, k) => [[...classPath, k], v] as [string[], string | number]
              ),
            ];
          }
          return [
            ...acc,
            ...flattenStyles(value as Record<string, unknown>, [
              ...prefix,
              key,
            ]),
          ];
        }
        return [...acc, [[...prefix, key], value as string | number]];
      },
      []
    );
  };

  if (!componentStyle) return null;
  return (
    <Box
      p={2}
      style={{
        position: "absolute",
        right: 0,
        top: 120,
        width: "300px",
      }}
      bgcolor={"#f9f9f9"}
    >
      <Typography variant="h6" gutterBottom>
        {selectedComponent} Styles
      </Typography>
      {componentStyle &&
        flattenStyles(componentStyle).map(([path, value]) => (
          <TextField
            key={path.join(".")}
            fullWidth
            label={path.join(".")}
            value={value?.toString() ?? ""}
            onChange={(e) => handleStyleChange(path, e.target.value)}
            margin="normal"
            size="small"
          />
        ))}
    </Box>
  );
};

export default RightSidebar;

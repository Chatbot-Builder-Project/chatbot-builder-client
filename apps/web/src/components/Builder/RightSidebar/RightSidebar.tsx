import { Box, Typography, TextField, SxProps, Theme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { updateComponentStyle } from "@chatbot-builder/store/slices/Builder/Chat";
import { isChatComponent } from "@chatbot-builder/store/slices/Builder/Chat/types";
import IconSelect from "../../CustomChatEditor/IconSelect";
import {
  selectSelectedComponent,
  selectCurrentBreakpoint,
  selectChatStyles,
} from "@chatbot-builder/store/slices/Builder/Chat/selectors";

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

  const renderField = (path: string[], value: string | number) => {
    if (path[path.length - 1] === "icon") {
      return (
        <IconSelect
          value={value as string}
          onChange={(newValue) => handleStyleChange(path, newValue)}
        />
      );
    }

    return (
      <TextField
        fullWidth
        value={value?.toString() ?? ""}
        onChange={(e) => handleStyleChange(path, e.target.value)}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#2b2b2b",
            height: "28px",
            fontSize: "0.75rem",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#363636",
            },
            "& input": {
              color: "white",
              fontFamily: "Montserrat",
              padding: "2px 8px",
            },
            "& fieldset": {
              borderColor: "#ffffff20",
              transition: "all 0.2s ease",
            },
            "&:hover fieldset": {
              borderColor: "#ffffff40",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2196f3",
            },
          },
        }}
      />
    );
  };

  return (
    <Box
      p={1.5}
      style={{
        position: "absolute",
        right: 0,
        top: 60,
        height: "calc(100vh - 60px)",
        width: "240px",
      }}
      bgcolor={"#111111"}
    >
      {componentStyle && (
        <>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "Montserrat",
              fontSize: "0.85rem",
              fontWeight: 600,
              mb: 1.5,
              color: "#ffffff80",
            }}
          >
            {selectedComponent} Styles
          </Typography>
          {componentStyle &&
            flattenStyles(componentStyle).map(([path, value]) => (
              <Box key={path.join(".")} sx={{ mb: 0.75 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "Montserrat",
                    color: "#ffffff80",
                    mb: 0.25,
                    display: "block",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                  }}
                >
                  {path.join(".")}
                </Typography>
                {renderField(path, value)}
              </Box>
            ))}
        </>
      )}
    </Box>
  );
};

export default RightSidebar;

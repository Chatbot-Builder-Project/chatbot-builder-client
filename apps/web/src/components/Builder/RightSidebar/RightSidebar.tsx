import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  Button,
  SxProps,
  Theme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { MuiColorInput } from "mui-color-input";
import {
  updateComponentStyle,
  updateContent,
} from "@chatbot-builder/store/slices/Builder/Chat";
import { useUploadComponent } from "@chatbot-builder/store/API/imageUploader/useUploadComponent";
import _ from "lodash";
import {
  ChatContent,
  isChatComponent,
} from "@chatbot-builder/store/slices/Builder/Chat/types";
import IconSelect from "../../CustomChatEditor/IconSelect";
import {
  selectSelectedComponent,
  selectCurrentBreakpoint,
  selectChatStyles,
  selectChatContent,
} from "@chatbot-builder/store/slices/Builder/Chat/selectors";
import { useState } from "react";

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#2b2b2b",
    height: "32px",
    fontSize: "0.75rem",
    fontFamily: "Montserrat",
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
};

const RightSidebar = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const { uploadAndGetImage } = useUploadComponent();
  const selectedComponent = useSelector(selectSelectedComponent);
  const currentBreakpoint = useSelector(selectCurrentBreakpoint);
  const styles = useSelector(selectChatStyles);
  const content = useSelector(selectChatContent);

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

  const handleColorChange = (path: string[], color: string) => {
    if (!selectedComponent || !isChatComponent(selectedComponent)) return;
    dispatch(
      updateComponentStyle({
        component: selectedComponent,
        styleUpdate: {
          path,
          value: color,
        },
      })
    );
  };

  const handleContentChange = (field: keyof ChatContent, value: string) => {
    dispatch(updateContent({ [field]: value }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const result = await uploadAndGetImage({ file, isProfilePicture: true });
      if (result) {
        dispatch(
          updateContent({
            profilePicture: {
              url: result.url,
              id: result.id,
            },
          })
        );
      }
    }
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

  const renderStyleField = (path: string[], value: string | number) => {
    // Handle object values (like padding, margin etc)
    if (typeof value === "object" && value !== null) {
      return (
        <TextField
          fullWidth
          value={JSON.stringify(value)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              handleStyleChange(path, parsed);
            } catch {
              // Handle invalid JSON input
              console.error("Invalid JSON input");
            }
          }}
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
    }

    // Handle color values
    if (
      typeof value === "string" &&
      (value.startsWith("#") || value.startsWith("rgb"))
    ) {
      return (
        <MuiColorInput
          value={value}
          onChange={(color) => handleColorChange(path, color)}
          format="hex"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#ffffff",
              height: "28px",
              fontSize: "0.75rem",
              transition: "all 0.2s ease",
              "& input": {
                color: "#000000",
                fontFamily: "Montserrat",
                padding: "2px 8px",
              },
              "& fieldset": {
                borderColor: "#ffffff20",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff40",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2196f3",
              },
            },
            "& .MuiColorInput-button": {
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              marginRight: "4px",
            },
          }}
        />
      );
    }

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
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        sx={{
          "& .MuiTab-root": {
            color: "#ffffff80",
            "&.Mui-selected": {
              color: "#ffffff",
            },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Tab label="Styles" />
        <Tab label="Content" />
      </Tabs>

      {tab === 0 && componentStyle && (
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
                {renderStyleField(path, value)}
              </Box>
            ))}
        </>
      )}

      {tab === 1 && (
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1.5,
              fontFamily: "Montserrat",
              color: "#ffffff80",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            Content Settings
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: "Montserrat",
                color: "#ffffff80",
                display: "block",
                fontSize: "0.65rem",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              Header Text
            </Typography>
            <TextField
              fullWidth
              value={content.headerText}
              onChange={(e) =>
                handleContentChange("headerText", e.target.value)
              }
              size="small"
              sx={textFieldStyle}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: "Montserrat",
                color: "#ffffff80",
                display: "block",
                fontSize: "0.65rem",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              Bot Message
            </Typography>
            <TextField
              fullWidth
              value={content.botMessageText}
              onChange={(e) =>
                handleContentChange("botMessageText", e.target.value)
              }
              size="small"
              sx={textFieldStyle}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: "Montserrat",
                color: "#ffffff80",
                display: "block",
                fontSize: "0.65rem",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              Input Placeholder
            </Typography>
            <TextField
              fullWidth
              value={content.inputPlaceholder}
              onChange={(e) =>
                handleContentChange("inputPlaceholder", e.target.value)
              }
              size="small"
              sx={textFieldStyle}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: "Montserrat",
                color: "#ffffff80",
                display: "block",
                fontSize: "0.65rem",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              Profile Picture
            </Typography>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="profile-picture-upload"
            />
            <label htmlFor="profile-picture-upload">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{
                  mt: 1,
                  fontFamily: "Montserrat",
                  textTransform: "none",
                  borderColor: "#ffffff20",
                  color: "#fff",
                  "&:hover": {
                    borderColor: "#ffffff40",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                Upload Image
              </Button>
            </label>
            {content.profilePicture && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={content.profilePicture.url}
                  alt="Profile"
                  style={{ width: "100%", borderRadius: "4px" }}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RightSidebar;

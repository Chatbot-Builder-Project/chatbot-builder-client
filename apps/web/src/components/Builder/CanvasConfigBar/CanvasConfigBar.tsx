import { useCanvas } from "../../../contexts/CanvasContext";
import AppLogo from "../../AppLogo";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button } from "@mui/material";
import {
  updateBreakpoint,
  selectCurrentBreakpoint,
} from "@chatbot-builder/store/slices/Builder/Chat";
import { ChatBreakpoint } from "@chatbot-builder/store/slices/Builder/Chat/types";
import {
  CanvasConfigContainerBar,
  SaveButton,
  PublishButton,
  CenterButton,
  ConfigContainer,
  LogoContainer,
} from "./CanvasConfigBar.styles";
import { IconFocus2 } from "@tabler/icons-react";

interface CanvasConfigBarProps {
  mode: "flow" | "chat";
}

const CanvasConfigBar: React.FC<CanvasConfigBarProps> = ({ mode }) => {
  const { resetPosition } = useCanvas();
  const dispatch = useDispatch();
  const currentBreakpoint = useSelector(selectCurrentBreakpoint);

  const handleSave = () => {
    // TODO: Implement save functionality
  };

  const handlePublish = () => {
    // TODO: Implement publish functionality
  };

  const handleBreakpointChange = (breakpoint: ChatBreakpoint) => {
    dispatch(updateBreakpoint(breakpoint));
  };

  return (
    <CanvasConfigContainerBar>
      <LogoContainer>
        <AppLogo />
        {mode === "chat" && (
          <ButtonGroup variant="outlined" size="small" sx={{ mr: 2 }}>
            {(["xs", "sm", "md", "lg", "xl"] as ChatBreakpoint[]).map(
              (breakpoint) => (
                <Button
                  key={breakpoint}
                  onClick={() => handleBreakpointChange(breakpoint)}
                  variant={
                    currentBreakpoint === breakpoint ? "contained" : "outlined"
                  }
                  sx={{
                    fontFamily: "inherit",
                    backgroundColor:
                      currentBreakpoint === breakpoint ? "#028ce5" : "#e0e0e0",
                    color:
                      currentBreakpoint === breakpoint ? "#e0e0e0" : "black",
                    "&:hover": {
                      backgroundColor:
                        currentBreakpoint === breakpoint
                          ? "#028ce5"
                          : "#e0e0e0",
                    },
                  }}
                >
                  {breakpoint.toUpperCase()}
                </Button>
              )
            )}
          </ButtonGroup>
        )}
      </LogoContainer>

      <ConfigContainer>
        <SaveButton onClick={handleSave}>Save</SaveButton>
        <PublishButton onClick={handlePublish}>Publish</PublishButton>
        <CenterButton onClick={resetPosition}>
          <IconFocus2 size={18} />
        </CenterButton>
      </ConfigContainer>
    </CanvasConfigContainerBar>
  );
};

export default CanvasConfigBar;

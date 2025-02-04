import { useCanvas } from "../../../contexts/CanvasContext";
import AppLogo from "../../AppLogo";
import { useDispatch, useSelector } from "react-redux";
import { useSaveWorkflowMutation } from "@chatbot-builder/store/API/SaveBuilder/SaveBuilder";
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
import {
  selectStartNodeId,
  selectAllNodes,
  selectAllDataLinks,
  selectAllFlowLinks,
  selectAllEnums,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import _ from "lodash";

interface CanvasConfigBarProps {
  mode: "flow" | "chat";
}

const traverseAndAddVisualData = (obj: any) => {
  if (obj && typeof obj === "object") {
    Object.keys(obj).forEach((key) => {
      if (key.endsWith("Port") && !obj[key]?.visual?.data && obj[key]) {
        obj[key].visual = { data: {} };
      }
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item: any) => traverseAndAddVisualData(item));
      } else if (typeof obj[key] === "object") {
        traverseAndAddVisualData(obj[key]);
      }
    });
  }
};

const CanvasConfigBar: React.FC<CanvasConfigBarProps> = ({ mode }) => {
  const { resetPosition } = useCanvas();
  const dispatch = useDispatch();
  const currentBreakpoint = useSelector(selectCurrentBreakpoint);
  const [saveWorkflow] = useSaveWorkflowMutation();
  const state = useSelector((state) => state);
  const handleSave = async () => {
    try {
      const body = _.cloneDeep({
        name: "My Workflow",
        description: "Workflow description",
        visual: { data: {} },
        graph: {
          visual: { data: {} },
          startNodeId: selectStartNodeId(state),
          nodes: selectAllNodes(state),
          dataLinks: selectAllDataLinks(state),
          flowLinks: selectAllFlowLinks(state),
          enums: selectAllEnums(state),
        },
      });
      traverseAndAddVisualData(body);

      await saveWorkflow(body);
      // You can add a success notification here
    } catch (error) {
      // You can add error handling here
      console.error("Failed to save workflow:", error);
    }
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

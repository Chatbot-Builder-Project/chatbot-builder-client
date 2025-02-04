import { useCanvas } from "../../../contexts/CanvasContext";
import AppLogo from "../../AppLogo";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateWorkflowMutation } from "@chatbot-builder/store/API/builder/builder";
import { ButtonGroup, Button } from "@mui/material";
import { updateBreakpoint } from "@chatbot-builder/store/slices/Builder/Chat";
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
  selectWorkflowVisual,
  selectWorkflowMetadata,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import _ from "lodash";
import { selectCurrentBreakpoint } from "@chatbot-builder/store/slices/Builder/Chat/selectors";
import { RootState } from "@chatbot-builder/store/store";
import { traverseAndAddVisualData } from "./utils";
import { useParams } from "react-router-dom";

interface CanvasConfigBarProps {
  mode: "flow" | "chat";
}

const CanvasConfigBar: React.FC<CanvasConfigBarProps> = ({ mode }) => {
  const { resetPosition } = useCanvas();
  const dispatch = useDispatch();
  const currentBreakpoint = useSelector(selectCurrentBreakpoint);
  const [updateWorkflow] = useUpdateWorkflowMutation();
  const state = useSelector((state: RootState) => state);
  const { id } = useParams<{ id: string }>();
  const workflowVisual = useSelector(selectWorkflowVisual);
  const { name, description } = useSelector(selectWorkflowMetadata);

  const handleSave = async () => {
    try {
      const body = _.cloneDeep({
        name,
        description,
        visual: { data: {} },
        graph: {
          visual: workflowVisual,
          startNodeId: selectStartNodeId(state),
          nodes: selectAllNodes(state),
          dataLinks: selectAllDataLinks(state),
          flowLinks: selectAllFlowLinks(state),
          enums: selectAllEnums(state),
          name,
          description,
        },
      });
      traverseAndAddVisualData(body);

      if (id) {
        console.log("asdasdsdasasd");

        await updateWorkflow({
          id,
          body,
        });
      }
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

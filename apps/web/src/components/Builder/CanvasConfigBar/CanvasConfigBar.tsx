import { useCanvas } from "../../../contexts/CanvasContext";
import AppLogo from "../../AppLogo";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateWorkflowMutation,
  useCreateChatbotMutation,
} from "@chatbot-builder/store/API/builder/builder";
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
import {
  IconFocus2,
  IconEye,
  IconArrowLeft,
  IconTool,
  IconDownload,
  IconUpload,
} from "@tabler/icons-react";
import {
  selectStartNodeId,
  selectAllNodes,
  selectAllDataLinks,
  selectAllFlowLinks,
  selectAllEnums,
  selectWorkflowVisual,
  selectWorkflowMetadata,
  initWorkflow,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import _ from "lodash";
import {
  selectChatContent,
  selectCurrentBreakpoint,
} from "@chatbot-builder/store/slices/Builder/Chat/selectors";
import { RootState } from "@chatbot-builder/store/store";
import { traverseAndAddVisualData } from "./utils";
import { useParams, useNavigate } from "react-router-dom";
import { defaultStyles } from "@chatbot-builder/store/slices/Builder/Chat/default";

interface CanvasConfigBarProps {
  mode: "flow" | "chat";
}

const CanvasConfigBar: React.FC<CanvasConfigBarProps> = ({ mode }) => {
  const { resetPosition } = useCanvas();
  const dispatch = useDispatch();
  const currentBreakpoint = useSelector(selectCurrentBreakpoint);
  const [updateWorkflow] = useUpdateWorkflowMutation();
  const [createChatbot] = useCreateChatbotMutation();
  const state = useSelector((state: RootState) => state);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workflowVisual = useSelector(selectWorkflowVisual);
  const { name, description } = useSelector(selectWorkflowMetadata);
  const { handleDownloadScreenshot } = useCanvas();
  const chatStyles = useSelector(
    (state: RootState) => state.builder.chat.styles
  );
  const content = useSelector(selectChatContent);

  const handleSave = async () => {
    try {
      const imageUrl = await handleDownloadScreenshot();
      const body = _.cloneDeep({
        name,
        description,
        visual: {
          data: {
            imageUrl,
            ui:
              mode === "chat"
                ? chatStyles
                : _.isEmpty(workflowVisual)
                ? defaultStyles
                : workflowVisual,
            content,
          },
        },
        graph: {
          visual: { data: mode === "chat" ? chatStyles : workflowVisual },
          startNodeId: selectStartNodeId(state),
          nodes: selectAllNodes(state),
          dataLinks: selectAllDataLinks(state),
          flowLinks: selectAllFlowLinks(state),
          enums: selectAllEnums(state),
        },
      });

      if (mode === "flow") {
        traverseAndAddVisualData(body);
      }

      if (id) {
        await updateWorkflow({
          id,
          body,
        });
      }
    } catch (error) {
      console.error("Failed to save workflow:", error);
    }
  };

  const handlePublish = async () => {
    try {
      // First save the workflow
      await handleSave();

      // Then create the chatbot
      const response = await createChatbot({
        workflowId: id!,
        isPublic: true,
      });

      if ("data" in response) {
        // Navigate to the chat view
        navigate(`/chat/${response.data.id}`);
      }
    } catch (error) {
      console.error("Failed to publish chatbot:", error);
    }
  };

  const handleBreakpointChange = (breakpoint: ChatBreakpoint) => {
    dispatch(updateBreakpoint(breakpoint));
  };

  const handleExport = () => {
    const graphData = {
      name,
      description,
      visual: workflowVisual,
      startNodeId: selectStartNodeId(state),
      nodes: selectAllNodes(state),
      dataLinks: selectAllDataLinks(state),
      flowLinks: selectAllFlowLinks(state),
      enums: selectAllEnums(state),
    };

    const blob = new Blob([JSON.stringify(graphData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name || "workflow"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = JSON.parse(e.target?.result as string);
            dispatch(
              initWorkflow({
                ...content,
                id: id || "temp",
                visual: content.visual,
              })
            );
          } catch (error) {
            console.error("Failed to parse workflow file:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handlePreview = async () => {
    await handleSave();
    navigate(`/builder/chat/${id}`);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleGoToBuilder = () => {
    navigate(`/builder/flow/${id}`);
  };

  return (
    <CanvasConfigContainerBar>
      <LogoContainer>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AppLogo />
          <CenterButton onClick={handleBackToDashboard}>
            <IconArrowLeft size={18} />
          </CenterButton>
        </div>
        {mode === "chat" && (
          <>
            <ButtonGroup variant="outlined" size="small" sx={{ mr: 2 }}>
              {(["xs", "sm", "md", "lg", "xl"] as ChatBreakpoint[]).map(
                (breakpoint) => (
                  <Button
                    key={breakpoint}
                    onClick={() => handleBreakpointChange(breakpoint)}
                    variant={
                      currentBreakpoint === breakpoint
                        ? "contained"
                        : "outlined"
                    }
                    sx={{
                      fontFamily: "inherit",
                      backgroundColor:
                        currentBreakpoint === breakpoint
                          ? "#028ce5"
                          : "#e0e0e0",
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
          </>
        )}
      </LogoContainer>

      <ConfigContainer>
        <CenterButton onClick={handleExport}>
          <IconUpload size={18} />
        </CenterButton>
        <CenterButton onClick={handleImport}>
          <IconDownload size={18} />
        </CenterButton>
        <CenterButton onClick={resetPosition}>
          <IconFocus2 size={18} />
        </CenterButton>
        {mode === "flow" && (
          <CenterButton onClick={handlePreview}>
            <IconEye size={18} />
          </CenterButton>
        )}
        {mode === "chat" && (
          <CenterButton onClick={handleGoToBuilder}>
            <IconTool size={18} />
          </CenterButton>
        )}
        <SaveButton onClick={handleSave}>Save</SaveButton>
        <PublishButton onClick={handlePublish}>Publish</PublishButton>
      </ConfigContainer>
    </CanvasConfigContainerBar>
  );
};

export default CanvasConfigBar;

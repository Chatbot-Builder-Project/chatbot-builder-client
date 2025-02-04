import { useGetWorkflowQuery } from "@chatbot-builder/store/API/builder/builder";
import { initWorkflow, updateWorkflowVisual } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Canvas } from "../../components/Builder/Canvas";
import NodesLayer from "../../components/Builder/Canvas/NodesLayer";
import { CircularProgress } from "@mui/material";

const FLOW_DIMENSIONS = {
  width: 10000,
  height: 10000,
};

const FlowBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data: workflow, isLoading } = useGetWorkflowQuery(id);

  useEffect(() => {
    if (workflow) {
      dispatch(initWorkflow(workflow.graph));
      if (workflow.graph.visual) {
        dispatch(updateWorkflowVisual(workflow.graph.visual));
      }
    }
  }, [workflow, dispatch]);

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Canvas dimensions={FLOW_DIMENSIONS}>
      {({ onPositionChange }) => (
        <NodesLayer onPositionChange={onPositionChange} />
      )}
    </Canvas>
  );
};

export default FlowBuilder;

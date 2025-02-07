import { Canvas } from "../../components/Builder/Canvas";
import NodesLayer from "../../components/Builder/Canvas/NodesLayer";

const FLOW_DIMENSIONS = {
  width: 10000,
  height: 10000,
};

export const FlowBuilder: React.FC = () => {
  return (
    <Canvas dimensions={FLOW_DIMENSIONS}>
      {({ onPositionChange }) => (
        <NodesLayer onPositionChange={onPositionChange} />
      )}
    </Canvas>
  );
};

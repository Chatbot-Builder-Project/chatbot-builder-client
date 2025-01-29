import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Path } from "react-native-svg";
import { useWindowDimensions } from "react-native";
import { selectNodeById } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";

interface PendingArrowProps {
  sourceId: number;
  scale: number;
}

const PendingArrow: React.FC<PendingArrowProps> = ({ sourceId, scale }) => {
  const { width, height } = useWindowDimensions();
  const [touchPosition, setTouchPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const sourceNode = useSelector((state: RootState) =>
    selectNodeById(state, sourceId)
  );

  useEffect(() => {
    const handleTouchMove = (e: any) => {
      const { pageX, pageY } = e.nativeEvent;
      // Ensure pageX/pageY are in bounds:
      const xPos = Math.min(Math.max(0, pageX), width);
      const yPos = Math.min(Math.max(0, pageY), height);
      setTouchPosition({ x: xPos / scale, y: yPos / scale });
    };

    // ...subscribe to gesture/touch or pointer events...
    return () => {
      // ...cleanup...
    };
  }, [scale, width, height]);

  if (!sourceNode?.visual || !touchPosition) return null;

  const startX = (sourceNode.visual.x || 0) + (sourceNode.visual.width || 0);
  const startY =
    (sourceNode.visual.y || 0) + (sourceNode.visual.height || 0) / 2;

  const d = `M${startX},${startY} L${touchPosition.x},${touchPosition.y}`;

  return (
    <Path
      d={d}
      stroke="#666"
      strokeWidth={5}
      strokeDasharray="5,5"
      fill="none"
      markerEnd="url(#arrowhead)"
    />
  );
};

export default PendingArrow;

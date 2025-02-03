import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectNodeById } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";

interface PendingArrowProps {
  sourceId: number;
  svgRef: React.RefObject<SVGSVGElement>;
  scale: number;
}

const PendingArrow: React.FC<PendingArrowProps> = ({
  sourceId,
  svgRef,
  scale,
}) => {
  const [mousePosition, setMousePosition] = useState<null | {
    x: number;
    y: number;
  }>(null);
  const sourceNode = useSelector((state: RootState) =>
    selectNodeById(state, sourceId)
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const x = (e.clientX - svgRect.left) / scale;
      const y = (e.clientY - svgRect.top) / scale;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [scale, svgRef]);

  if (
    !sourceNode?.visual.data ||
    !sourceNode.visual.data.x ||
    !sourceNode.visual.data.y
  )
    return null;

  const startX = sourceNode.visual.data.x + (sourceNode.visual.data.width || 0);
  const startY =
    sourceNode.visual.data.y + (sourceNode.visual.data.height || 0) / 2;
  if (!mousePosition) return null;
  return (
    <path
      d={`M ${startX},${startY} L ${mousePosition.x},${mousePosition.y}`}
      stroke="#666"
      strokeWidth="5"
      strokeDasharray="5,5"
      fill="none"
      markerEnd="url(#arrowhead)"
    />
  );
};

export default PendingArrow;

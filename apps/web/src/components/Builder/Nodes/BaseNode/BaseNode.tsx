import React from "react";
import { useDrag } from "react-dnd";
import { BaseNodeProps } from "./types";
import { NodeContainer } from "./BaseNode.styles";

export const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  x,
  y,
  label,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "NODE",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <NodeContainer ref={drag} x={x} y={y} isDragging={isDragging}>
      <strong>{label}</strong>
      <div>{children}</div>
    </NodeContainer>
  );
};

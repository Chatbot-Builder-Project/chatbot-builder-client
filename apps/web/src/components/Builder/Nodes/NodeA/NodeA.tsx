import React from "react";
import { NodeTypeAProps } from "./types";
import { BaseNode } from "../BaseNode/BaseNode";

const NodeTypeA: React.FC<NodeTypeAProps> = ({
  id,
  x,
  y,
  label,
  extraPropertyA,
}) => {
  return (
    <BaseNode id={id} x={x} y={y} label={label}>
      <p>Extra: {extraPropertyA}</p>
    </BaseNode>
  );
};

export default NodeTypeA;

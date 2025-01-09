import React, { memo } from "react";
import { BaseNode } from "../Nodes/BaseNode";
import { shallowEqual, useSelector } from "react-redux";
import {
  selectNodeIds,
  selectSelectedNodeId,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { NodesLayerProps } from "./types";

const NodesLayer: React.FC<NodesLayerProps> = ({ onPositionChange }) => {
  const nodes = useSelector(selectNodeIds, shallowEqual);
  const selectedNodeId = useSelector(selectSelectedNodeId);

  return (
    <>
      {nodes.map((node) => (
        <BaseNode
          key={`${node}`}
          id={node as number}
          isSelected={selectedNodeId === node}
          onPositionChange={onPositionChange}
        >
          <div>{node}</div>
        </BaseNode>
      ))}
    </>
  );
};

export default memo(NodesLayer);

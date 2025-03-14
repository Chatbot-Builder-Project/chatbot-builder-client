import React, { memo } from "react";
import { BaseNode } from "../Nodes/BaseNode";
import { shallowEqual, useSelector } from "react-redux";
import {
  selectNodeIds,
  selectElementId,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { NodesLayerProps } from "./types";
import Node from "../Nodes/Node";
import { ArrowsLayer } from "../ArrowsLayer";

const NodesLayer: React.FC<NodesLayerProps> = ({ onPositionChange }) => {
  const nodesIds = useSelector(selectNodeIds, shallowEqual);
  const selectedId = useSelector(selectElementId);

  return (
    <>
      {nodesIds.map((nodeId) => (
        <BaseNode
          key={`${nodeId}`}
          id={nodeId as number}
          render={(node) => <Node node={node} />}
          isSelected={selectedId === nodeId}
          onPositionChange={onPositionChange}
        />
      ))}
      <ArrowsLayer />
    </>
  );
};

export default memo(NodesLayer);

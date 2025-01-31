import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  selectNodeIds,
  selectElementId,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import BaseNode from "./BaseNode";
import ArrowsLayer from "./ArrowsLayer";

interface NodesLayerProps {
  scale: number;
}

const NodesLayer: React.FC<NodesLayerProps> = ({ scale }) => {
  const nodesIds = useSelector(selectNodeIds, shallowEqual);
  const selectedId = useSelector(selectElementId);
  console.log("ghkghghjghjghj");
  return (
    <>
      <ArrowsLayer />
      {nodesIds.map((nodeId) => (
        <BaseNode
          key={`${nodeId}`}
          isSelected={selectedId === nodeId}
          scale={scale}
          id={nodeId as number}
        />
      ))}
    </>
  );
};

export default NodesLayer;

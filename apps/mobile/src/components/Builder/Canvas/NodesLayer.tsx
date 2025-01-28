import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  selectNodeIds,
  selectElementId,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import Node from "../Nodes/Node";
import BaseNode from "./BaseNode";
// import { ArrowsLayer } from "../ArrowsLayer";

interface NodesLayerProps {
  scale: number;
}

const NodesLayer: React.FC<NodesLayerProps> = ({ scale }) => {
  const nodesIds = useSelector(selectNodeIds, shallowEqual);
  const selectedId = useSelector(selectElementId);

  return (
    <>
      {nodesIds.map((nodeId) => (
        <BaseNode key={`${nodeId}`} scale={scale} id={nodeId as number} />
      ))}
      {/* <ArrowsLayer /> */}
    </>
  );
};

export default memo(NodesLayer);

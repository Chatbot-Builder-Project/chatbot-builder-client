import { selectAllNodes } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import React from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { NodeTypeA } from "../Nodes/NodeA";
import { BaseNode } from "@chatbot-builder/client";

const Canvas: React.FC = () => {
  const nodes = useSelector(selectAllNodes);

  const [, drop] = useDrop(() => ({
    accept: "NODE",
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset) {
        // Handle node drop position updates here
      }
    },
  }));

  const renderNode = (node: BaseNode) => {
    switch (node.type) {
      case "typeA":
        return <NodeTypeA extraPropertyA={""} {...node} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        height: "500px",
        border: "1px dashed gray",
        position: "relative",
      }}
    >
      {nodes.map((node) => (
        <React.Fragment key={node.id}>{renderNode(node)}</React.Fragment>
      ))}
    </div>
  );
};

export default Canvas;

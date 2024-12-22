import { selectAllNodes } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useSelector, shallowEqual } from "react-redux";
import { NodeTypeA } from "../Nodes/NodeA";
import { BaseNode } from "@chatbot-builder/client";

const NodeComponent = React.memo(({ node }: { node: BaseNode }) => {
  switch (node.type) {
    case "typeA":
      return <NodeTypeA extraPropertyA={""} {...node} />;
    default:
      return null;
  }
});

const Canvas: React.FC = () => {
  const [position, setPosition] = useState({ x: 2800, y: 2500 });
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );

  const nodes = useSelector(selectAllNodes, shallowEqual);

  const dropCanvas = useRef<HTMLDivElement | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "NODE",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const dropElementBoundary = dropCanvas.current?.getBoundingClientRect();

      console.log("Dropped:", item, offset, dropElementBoundary);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") setIsCtrlPressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") setIsCtrlPressed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isCtrlPressed) {
        setDragStart({ x: e.clientX, y: e.clientY });
        setIsDragging(true);
      }
    },
    [isCtrlPressed]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && dragStart) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setPosition((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={(node) => {
          drop(node);
          dropCanvas.current = node;
        }}
        onMouseDown={handleMouseDown}
        style={{
          backgroundColor: isOver ? "green" : "white",
          width: "5000px",
          height: "5000px",
          border: "1px dashed gray",
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isCtrlPressed ? "grab" : "default",
          transform: "translate(-50%, -50%)",
        }}
      >
        {nodes.map((node) => (
          <NodeComponent key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;

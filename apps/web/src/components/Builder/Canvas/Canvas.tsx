import {
  selectAllNodes,
  updateNodePosition,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import React, { useRef, useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useSelector, shallowEqual } from "react-redux";
import useCanvasKeyboard from "../../../hooks/builder/useCanvasKeyboard";
import { useDispatch } from "react-redux";
import { BaseNodeData } from "../../../types/nodes";
import useCanvasDrag from "../../../hooks/builder/useCanvasDrag";
import { CANVAS_DIMENSIONS } from "./utils";
import { BaseNode } from "../Nodes/BaseNode/BaseNode";

const WRAPPER_STYLES = {
  width: "100vw",
  height: "100vh",
  position: "relative" as const,
  overflow: "hidden",
};

const Canvas: React.FC = () => {
  const dispatch = useDispatch();
  const dropCanvas = useRef<HTMLDivElement | null>(null);
  const isCtrlPressed = useCanvasKeyboard();
  const { position, handleMouseDown, handleMouseMove, handleMouseUp } =
    useCanvasDrag(isCtrlPressed);
  const nodes = useSelector(selectAllNodes, shallowEqual);

  const calculateDropPosition = useCallback(
    (
      clientOffset: { x: number; y: number },
      item: BaseNodeData & {
        nodeWidth: number;
        nodeHeight: number;
        mouseOffset: { x: number; y: number };
      }
    ) => {
      if (!dropCanvas.current) return { x: 0, y: 0 };

      const canvasBounds = dropCanvas.current.getBoundingClientRect();
      const scale = 1;

      const adjustedX = clientOffset.x - item.mouseOffset.x;
      const adjustedY = clientOffset.y - item.mouseOffset.y;

      const x = (adjustedX - canvasBounds.left) / scale;
      const y = (adjustedY - canvasBounds.top) / scale;

      return {
        x: x - position.x + CANVAS_DIMENSIONS.initialX - item.nodeWidth / 2,
        y: y - position.y + CANVAS_DIMENSIONS.initialY - item.nodeHeight / 2,
      };
    },
    [position]
  );

  const handleNodePositionChange = useCallback(
    (id: string, x: number, y: number) => {
      dispatch(updateNodePosition({ id, x, y }));
    },
    [dispatch]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "NODE",
      drop: (
        item: BaseNodeData & {
          nodeWidth: number;
          nodeHeight: number;
          mouseOffset: { x: number; y: number };
        },
        monitor
      ) => {
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;

        const dropPosition = calculateDropPosition(clientOffset, item);
        return dropPosition;
      },
    }),
    [calculateDropPosition, handleNodePositionChange]
  );

  const canvasStyle = useMemo(
    () => ({
      backgroundColor: "white",
      width: CANVAS_DIMENSIONS.width,
      height: CANVAS_DIMENSIONS.height,
      border: "1px dashed gray",
      position: "absolute" as const,
      left: `${position.x}px`,
      top: `${position.y}px`,
      cursor: isCtrlPressed ? "grab" : "default",
      transform: "translate(-50%, -50%)",
    }),
    [position.x, position.y, isCtrlPressed]
  );

  return (
    <div
      style={WRAPPER_STYLES}
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
          ...canvasStyle,
          backgroundImage: `
        linear-gradient(to right, #f0f0f0 1px, transparent 1px),
        linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
          position: "relative",
        }}
      >
        {nodes.map((node) => (
          <BaseNode
            key={node.id}
            data={node}
            onPositionChange={handleNodePositionChange}
          >
            <>test</>
          </BaseNode>
        ))}
      </div>
    </div>
  );
};

export default Canvas;

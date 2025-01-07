import {
  selectAllNodes,
  updateNodePosition,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import React, { useRef, useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import { BaseNodeData } from "../../../types/nodes";
import { CANVAS_DIMENSIONS } from "./utils";
import { BaseNode } from "../Nodes/BaseNode/BaseNode";
import { clamp } from "lodash";
import { ArrowWrapper } from "../Nodes/ArrowWrapper";
import { useCanvasControls } from "../../../hooks/builder/index";

const WRAPPER_STYLES = {
  width: "100vw",
  height: "100vh",
  position: "relative" as const,
  overflow: "hidden",
};

const Canvas: React.FC = () => {
  const dispatch = useDispatch();
  const dropCanvas = useRef<HTMLDivElement | null>(null);
  const {
    position,
    scale,
    isCtrlPressed,
    isWheelPressed,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useCanvasControls();
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

      const adjustedX = clientOffset.x;
      const adjustedY = clientOffset.y;
      const x = (adjustedX - canvasBounds.left) / scale;
      const y = (adjustedY - canvasBounds.top) / scale;
      return {
        x: clamp(
          x - item.mouseOffset.x,
          0,
          CANVAS_DIMENSIONS.width - item.nodeWidth
        ),
        y: clamp(
          y - item.mouseOffset.y,
          0,
          CANVAS_DIMENSIONS.height - item.nodeHeight
        ),
      };
    },
    [position]
  );

  const handleNodePositionChange = useCallback(
    (id: number, x: number, y: number) => {
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
      left: `50%`,
      top: `50%`,
      cursor: isCtrlPressed || isWheelPressed ? "grab" : "default",
      transform: `translate(-50%, -50%) `,
      zoom: scale,
      transformOrigin: "center",
    }),
    [position.x, position.y, scale, isCtrlPressed, isWheelPressed]
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
        <ArrowWrapper
          connections={[
            {
              start: "welcome-node",
              end: "start-node",
            },
          ]}
        >
          {nodes.map((node) => (
            <BaseNode
              key={node.info.id}
              data={node}
              onPositionChange={handleNodePositionChange}
            >
              <div>{node.info.name}</div>
            </BaseNode>
          ))}
        </ArrowWrapper>
      </div>
    </div>
  );
};

export default Canvas;

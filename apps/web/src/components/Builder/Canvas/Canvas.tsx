import {
  setSelectedNode,
  updateNodePosition,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import React, { useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { BaseNodeData } from "../../../types/nodes";
import { CANVAS_DIMENSIONS, WRAPPER_STYLES } from "./utils";
import { clamp } from "lodash";
import NodesLayer from "./NodesLayer";
import { ArrowWrapper } from "../ArrowWrapper";
import { useCanvas } from "../../../contexts/CanvasContext";

const Canvas: React.FC = () => {
  const dispatch = useDispatch();
  const { canvasRef, handleMouseDown, handleMouseMove, handleMouseUp, scale } =
    useCanvas();

  const calculateDropPosition = useCallback(
    (
      dropPosition: { x: number; y: number },
      item: BaseNodeData & {
        nodeWidth: number;
        nodeHeight: number;
        mouseOffset: { x: number; y: number };
      }
    ) => {
      if (!canvasRef.current) return { x: 0, y: 0 };

      const canvasBounds = canvasRef.current.getBoundingClientRect();
      const { left, top, width, height } = canvasBounds;
      const centerOffset = {
        x: left + width / 2,
        y: top + height / 2,
      };

      const position = {
        x:
          (dropPosition.x - centerOffset.x) / scale +
          CANVAS_DIMENSIONS.width / 2,
        y:
          (dropPosition.y - centerOffset.y) / scale +
          CANVAS_DIMENSIONS.height / 2,
      };

      return {
        x: clamp(
          position.x - item.mouseOffset.x / scale,
          0,
          CANVAS_DIMENSIONS.width - item.nodeWidth / scale
        ),
        y: clamp(
          position.y - item.mouseOffset.y / scale,
          0,
          CANVAS_DIMENSIONS.height - item.nodeHeight / scale
        ),
      };
    },
    [scale, canvasRef]
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
      backgroundColor: "#f3f4f8",
      width: CANVAS_DIMENSIONS.width,
      height: CANVAS_DIMENSIONS.height,
      position: "absolute" as const,
      cursor: "default",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%)`,
      transformOrigin: "center",
    }),
    []
  );

  const handleCanvasClick = useCallback(() => {
    dispatch(setSelectedNode(null));
  }, [dispatch]);

  return (
    <div
      style={WRAPPER_STYLES}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={(node) => {
          drop(node);
          if (node) canvasRef.current = node;
        }}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        style={{
          ...canvasStyle,
          backgroundImage: `
            radial-gradient(circle at center, #d7d8db 2px, transparent 1px)
            `,
          backgroundPosition: `center`,
          backgroundSize: `35px 35px`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            opacity: 0.5,
            transform: "translate(-50%, -50%)",
            fontSize: "48px",
            color: "#d7d8db",
            fontWeight: "bold",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          +
        </div>
        <ArrowWrapper>
          <NodesLayer onPositionChange={handleNodePositionChange} />
        </ArrowWrapper>
      </div>
    </div>
  );
};

export default Canvas;

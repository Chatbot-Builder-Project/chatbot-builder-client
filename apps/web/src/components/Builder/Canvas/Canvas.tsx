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

  const { scale, handleMouseDown, handleMouseMove, handleMouseUp } =
    useCanvasControls(dropCanvas);

  const nodes = useSelector(selectAllNodes, shallowEqual);

  const calculateDropPosition = useCallback(
    (
      dropPosition: { x: number; y: number },
      item: BaseNodeData & {
        nodeWidth: number;
        nodeHeight: number;
        mouseOffset: { x: number; y: number };
      }
    ) => {
      if (!dropCanvas.current) return { x: 0, y: 0 };

      const canvasBounds = dropCanvas.current.getBoundingClientRect();
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
          CANVAS_DIMENSIONS.width - item.nodeWidth
        ),
        y: clamp(
          position.y - item.mouseOffset.y / scale,
          0,
          CANVAS_DIMENSIONS.height - item.nodeHeight
        ),
      };
    },
    [scale]
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
      border: "5px dashed gray",
      position: "absolute" as const,
      cursor: "default",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%)`,
      transformOrigin: "center",
    }),
    []
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
            linear-gradient(to right, rgba(240, 240, 240, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom,rgba(240, 240, 240, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: `${25 * scale}px ${25 * scale}px`,
          position: "relative",
        }}
      >
        <ArrowWrapper>
          {nodes.map((node) => (
            <BaseNode
              key={node.info.id}
              scale={scale}
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

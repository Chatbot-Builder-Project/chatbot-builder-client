// import html2canvas from "html2canvas";
import {
  setPendingFlowLinkSource,
  setSelected,
  updateNodeVisual,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import React, { useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { BaseNodeData } from "../../../types/nodes";
import { WRAPPER_STYLES } from "./utils";
import { clamp } from "lodash";
import { useCanvas } from "../../../contexts/CanvasContext";
import { NodeVisual } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { CanvasProps } from "./types";
import { setSelectedComponent } from "@chatbot-builder/store/slices/Builder/Chat";

const Canvas: React.FC<CanvasProps> = ({ children, dimensions }) => {
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
        x: (dropPosition.x - centerOffset.x) / scale + dimensions.width / 2,
        y: (dropPosition.y - centerOffset.y) / scale + dimensions.height / 2,
      };

      return {
        x: clamp(
          position.x - item.mouseOffset.x / scale,
          0,
          dimensions.width - item.nodeWidth / scale
        ),
        y: clamp(
          position.y - item.mouseOffset.y / scale,
          0,
          dimensions.height - item.nodeHeight / scale
        ),
      };
    },
    [scale, canvasRef, dimensions]
  );

  const handleNodePositionChange = useCallback(
    (id: number, visual: NodeVisual) => {
      dispatch(
        updateNodeVisual({
          id,
          visual: visual,
        })
      );
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
        return calculateDropPosition(clientOffset, item);
      },
    }),
    [calculateDropPosition]
  );

  const canvasStyle = useMemo(
    () => ({
      backgroundColor: "#1d1d1d",
      width: dimensions.width,
      height: dimensions.height,
      position: "absolute" as const,
      cursor: "default",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%)`,
      transformOrigin: "center",
    }),
    [dimensions]
  );

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(setSelected(null));
      dispatch(setPendingFlowLinkSource(null));
      dispatch(setSelectedComponent(null));
    },
    [dispatch]
  );

  React.useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(setSelected(null));
        dispatch(setPendingFlowLinkSource(null));
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [dispatch]);

  return (
    <div
      id="canvas-wrapper"
      style={WRAPPER_STYLES}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={(node) => {
          drop(node);
          if (node) canvasRef.current = node;
        }}
        id="canvas"
        data-canvas="true"
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        style={{
          ...canvasStyle,
          backgroundImage: `
            radial-gradient(circle at center,rgba(67, 67, 67, 0.25) 2px, transparent 1px)
            `,
          backgroundPosition: `center`,
          backgroundSize: `35px 35px`,
          position: "relative",
          overflow: "hidden",
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
            color: "#fff",
            fontWeight: "bold",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          +
        </div>
        {children({ onPositionChange: handleNodePositionChange })}
      </div>
    </div>
  );
};

export default Canvas;
function useUploadComponent(): { uploadAndGetImage: any; isLoading: any } {
  throw new Error("Function not implemented.");
}

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

  // const [isDownloading, setIsDownloading] = React.useState(false);

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

  // const createFileName = (extension: string, name: string) => {
  //   const timestamp = new Date().toISOString().slice(0, 10);
  //   return `${name}_${timestamp}.${extension}`;
  // };

  // const handleDownloadScreenshot = React.useCallback(async () => {
  //   const element = document.getElementById("canvas-wrapper");
  //   if (!element) return;

  //   setIsDownloading(true);
  //   try {
  //     const rect = element.getBoundingClientRect();

  //     const canvas = await html2canvas(element, {
  //       scale: window.devicePixelRatio,
  //       useCORS: true,
  //       allowTaint: true,
  //       logging: true,
  //       backgroundColor: "#1d1d1d",
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //       x: rect.left,
  //       y: rect.top,
  //       scrollX: -window.scrollX,
  //       scrollY: -window.scrollY,
  //       foreignObjectRendering: true,
  //       onclone: (documentClone) => {
  //         const clonedElement = documentClone.getElementById("canvas-wrapper");
  //         if (clonedElement) {
  //           clonedElement.style.backgroundImage = `radial-gradient(circle at center,rgba(67, 67, 67, 0.25) 2px, transparent 1px)`;
  //           clonedElement.style.backgroundSize = `35px 35px`;
  //           clonedElement.style.backgroundPosition = `center`;
  //           clonedElement.style.backgroundRepeat = "repeat";
  //         }
  //       },
  //     });

  //     const imgData = canvas.toDataURL("image/png", 1.0);
  //     const link = document.createElement("a");
  //     link.href = imgData;
  //     link.download = createFileName("png", "canvas_screenshot");
  //     link.click();
  //   } catch (error) {
  //     console.error("Failed to take screenshot:", error);
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // }, [scale]);

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
      {/* <button
        style={{
          position: "absolute",
          top: 100,
          right: 10,
          zIndex: 999,
        }}
        onClick={handleDownloadScreenshot}
        disabled={isDownloading}
      >
        Download Canvas
      </button> */}
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

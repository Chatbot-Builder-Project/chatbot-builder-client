import { useState, useEffect, useCallback } from "react";
import { CANVAS_DIMENSIONS } from "../../components/Builder/Canvas/utils";

export const useCanvasControls = () => {
  const [position, setPosition] = useState({
    x: CANVAS_DIMENSIONS.initialX,
    y: CANVAS_DIMENSIONS.initialY,
  });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isWheelPressed, setIsWheelPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") setIsCtrlPressed(true);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") setIsCtrlPressed(false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault();
        setIsWheelPressed(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 1) setIsWheelPressed(false);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isCtrlPressed) {
        e.preventDefault();
        const delta = e.deltaY * -0.001;
        setScale((prevScale) => Math.min(Math.max(prevScale + delta, 0.1), 4));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isCtrlPressed]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isCtrlPressed || isWheelPressed || e.button === 1) {
        e.preventDefault();
        setDragStart({ x: e.clientX, y: e.clientY });
        setIsDragging(true);
      }
    },
    [isCtrlPressed, isWheelPressed]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && dragStart) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setPosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  return {
    position,
    scale,
    isCtrlPressed,
    isWheelPressed,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

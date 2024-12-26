import { useState, useCallback } from "react";
import { CANVAS_DIMENSIONS } from "../../components/Builder/Canvas";

const useCanvasDrag = (isCtrlPressed: boolean) => {
  const [position, setPosition] = useState({
    x: CANVAS_DIMENSIONS.initialX,
    y: CANVAS_DIMENSIONS.initialY,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );

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

  return { position, handleMouseDown, handleMouseMove, handleMouseUp };
};
export default useCanvasDrag;

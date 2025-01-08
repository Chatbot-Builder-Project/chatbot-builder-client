import { useRef, useEffect, useCallback, useState } from "react";
import { CANVAS_DIMENSIONS } from "../../components/Builder/Canvas";
import { LEFT_SIDEBAR_WIDTH } from "../../components/Builder/LeftSidebar";

export const useCanvasControls = (
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [scale, setScale] = useState(1);
  const ctrlRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const posRef = useRef({ x: 0, y: 0 });

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 2;

  const updateCursor = useCallback(() => {
    if (ref.current) {
      ref.current.style.cursor =
        ctrlRef.current || draggingRef.current ? "grab" : "auto";
    }
  }, [ref]);

  const calculateMaxOffsets = (currentScale: number) => {
    const scaledWidth = CANVAS_DIMENSIONS.width * currentScale;
    const scaledHeight = CANVAS_DIMENSIONS.height * currentScale;
    const maxOffsetX = (scaledWidth - window.innerWidth) / (2 * currentScale);
    const maxOffsetY = (scaledHeight - window.innerHeight) / (2 * currentScale);
    return {
      maxOffsetX: maxOffsetX > 0 ? maxOffsetX : 0,
      maxOffsetY: maxOffsetY > 0 ? maxOffsetY : 0,
    };
  };

  const updatePosition = useCallback(
    (newX: number, newY: number, currentScale: number) => {
      const { maxOffsetX, maxOffsetY } = calculateMaxOffsets(currentScale);

      const constrainedX = Math.max(
        Math.min(newX, maxOffsetX + LEFT_SIDEBAR_WIDTH / scale),
        -maxOffsetX
      );
      const constrainedY = Math.max(Math.min(newY, maxOffsetY), -maxOffsetY);

      posRef.current.x = constrainedX;
      posRef.current.y = constrainedY;

      if (ref.current) {
        ref.current.style.transform = `translate(calc(-50% + ${constrainedX}px), calc(-50% + ${constrainedY}px))`;
      }
    },
    [ref, scale]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.style.zoom = ` ${scale}`;

      updatePosition(posRef.current.x, posRef.current.y, scale);
    }
  }, [ref, scale, updatePosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") ctrlRef.current = true;
      updateCursor();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") ctrlRef.current = false;
      updateCursor();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault();
      }
      updateCursor();
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault();
      }
      updateCursor();
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((prevScale) =>
        Math.min(Math.max(prevScale - e.deltaY * 0.001, MIN_SCALE), MAX_SCALE)
      );
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
  }, [ref, updateCursor]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1 || ctrlRef.current) {
        e.preventDefault();
        draggingRef.current = true;
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        updateCursor();
      }
    },
    [updateCursor]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggingRef.current && dragStartRef.current && ref.current) {
        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;

        const newX = posRef.current.x + deltaX / scale;
        const newY = posRef.current.y + deltaY / scale;

        updatePosition(newX, newY, scale);

        dragStartRef.current = { x: e.clientX, y: e.clientY };
      }
    },
    [ref, scale, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    draggingRef.current = false;
    dragStartRef.current = null;
    updateCursor();
  }, [updateCursor]);

  return {
    scale,
    isCtrlPressed: ctrlRef.current,
    isWheelPressed: draggingRef.current,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

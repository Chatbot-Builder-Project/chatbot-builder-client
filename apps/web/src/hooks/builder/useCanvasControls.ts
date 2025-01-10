import { useRef, useEffect, useCallback, useState } from "react";
import { CANVAS_DIMENSIONS } from "../../components/Builder/Canvas";
import { LEFT_SIDEBAR_WIDTH } from "../../components/Builder/LeftSidebar";

export const useCanvasControls = (ref: React.RefObject<HTMLDivElement>) => {
  const [scale, setScale] = useState(1);
  const ctrlRef = useRef(false);
  const draggingRef = useRef(false);
  const posRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );
  const velocityRef = useRef({ x: 0, y: 0 });

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
        Math.min(newX, maxOffsetX + LEFT_SIDEBAR_WIDTH / currentScale),
        -maxOffsetX
      );
      const constrainedY = Math.max(Math.min(newY, maxOffsetY), -maxOffsetY);

      posRef.current = { x: constrainedX, y: constrainedY };

      if (ref.current) {
        ref.current.style.transform = `translate(calc(-50% + ${constrainedX}px), calc(-50% + ${constrainedY}px))`;
      }
    },
    [ref]
  );
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1 || ctrlRef.current) {
        e.preventDefault();

        velocityRef.current = { x: 0, y: 0 };
        draggingRef.current = true;
        dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };

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
        let deltaTime = Date.now() - dragStartRef.current.time;
        if (deltaTime < 1) deltaTime = 1;
        const newX = posRef.current.x + deltaX / scale;
        const newY = posRef.current.y + deltaY / scale;

        if (Number.isNaN(newX) || Number.isNaN(newY)) return;

        updatePosition(newX, newY, scale);

        velocityRef.current = {
          x: deltaX / deltaTime,
          y: deltaY / deltaTime,
        };

        dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      }
    },
    [ref, scale, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    draggingRef.current = false;
    dragStartRef.current = null;

    const DECELERATION = 0.03;
    const SLIDE_INTERVAL = 5;

    const slide = () => {
      const velocity = velocityRef.current;
      if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
        const newX = posRef.current.x + velocity.x * SLIDE_INTERVAL;
        const newY = posRef.current.y + velocity.y * SLIDE_INTERVAL;

        updatePosition(newX, newY, scale);

        velocityRef.current = {
          x: velocity.x * (1 - DECELERATION),
          y: velocity.y * (1 - DECELERATION),
        };

        requestAnimationFrame(slide);
      } else {
        velocityRef.current = { x: 0, y: 0 };
      }
    };

    slide();
    updateCursor();
  }, [updatePosition, scale, updateCursor]);

  const resetPosition = useCallback(() => {
    if (ref.current) {
      posRef.current = { x: 0, y: 0 };
      ref.current.style.transition = "transform 0.2s ease-out";
      ref.current.style.transform = "translate(-50%, -50%)";
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transition = "";
        }
      }, 300);
    }
  }, [ref]);

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
      if (draggingRef.current) return;
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

  return {
    scale,
    isCtrlPressed: ctrlRef.current,
    isWheelPressed: draggingRef.current,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetPosition,
  };
};

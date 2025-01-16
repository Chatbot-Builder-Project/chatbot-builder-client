import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useCanvas } from "../../../contexts/CanvasContext";

interface Point {
  x: number;
  y: number;
}

interface ControlPoint {
  id: string;
  position: Point;
}

interface ArrowConnectorProps {
  startId: string;
  endId: string;
}

const ArrowConnector: React.FC<ArrowConnectorProps> = ({ startId, endId }) => {
  const { canvasRef } = useCanvas();
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<ControlPoint[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const getElementPosition = (
    elementId: string,
    isOnLeft?: boolean
  ): Point | null => {
    if (!canvasRef.current) return null;
    const element = document.getElementById(elementId);
    if (!element) return null;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    if (isOnLeft) {
      return {
        x: elementRect.left - canvasRect.left,
        y: elementRect.top + elementRect.height / 2 - canvasRect.top,
      };
    }
    return {
      x: elementRect.right - canvasRect.left,
      y: elementRect.top + elementRect.height / 2 - canvasRect.top,
    };
  };

  const buildSinglePath = (
    start: Point,
    points: ControlPoint[],
    end: Point
  ) => {
    if (points.length === 0) {
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      return `M ${start.x},${start.y} S ${midX},${midY} ${end.x},${end.y}`;
    }

    let pathD = `M ${start.x},${start.y}`;
    
    // First smooth curve
    const firstCp = points[0].position;
    pathD += ` C ${firstCp.x},${firstCp.y} ${firstCp.x},${firstCp.y} ${firstCp.x},${firstCp.y}`;
    
    // Subsequent smooth curves
    for (let i = 1; i < points.length; i++) {
      const cp = points[i].position;
      pathD += ` S ${cp.x},${cp.y} ${cp.x},${cp.y}`;
    }
    
    // Final smooth curve to end
    pathD += ` S ${(points[points.length - 1].position.x + end.x) / 2},${(points[points.length - 1].position.y + end.y) / 2} ${end.x},${end.y}`;
    
    return pathD;
  };

  const updatePath = () => {
    const start = getElementPosition(startId);
    const end = getElementPosition(endId, true);
    if (!start || !end) return;

    pathRef.current?.setAttribute("d", buildSinglePath(start, points, end));
  };

  const handleDrag = (e: any, data: any, pointId: string) => {
    const pointIndex = points.findIndex((p) => p.id === pointId);
    if (pointIndex < 0) return;

    const svgRect = svgRef.current?.getBoundingClientRect();
    if (!svgRect) return;

    // Calculate SVG coordinates
    const svgX = data.x;
    const svgY = data.y;

    const updated = [...points];
    updated[pointIndex].position = {
      x: svgX,
      y: svgY,
    };
    setPoints(updated);
    updatePath();
  };

  const handleDragStop = (pointId: string) => {
    const pointIndex = points.findIndex((p) => p.id === pointId);
    if (pointIndex < 0) return;

    const updated = [...points];
    // Example logic to add another control point after dragging stops
    updated.splice(pointIndex + 1, 0, {
      id: `control-${Math.random()}`,
      position: {
        x:
          (updated[pointIndex].position.x +
            updated[Math.min(pointIndex + 1, updated.length - 1)].position.x) /
          2,
        y:
          (updated[pointIndex].position.y +
            updated[Math.min(pointIndex + 1, updated.length - 1)].position.y) /
          2,
      },
    });
    setPoints(updated);
    updatePath();
  };

  useEffect(() => {
    if (points.length === 0) {
      const start = getElementPosition(startId);
      const end = getElementPosition(endId, true);
      if (start && end) {
        setPoints([
          {
            id: "control-1",
            position: {
              x: start.x + (end.x - start.x) / 2,
              y: start.y + (end.y - start.y) / 2,
            },
          },
        ]);
      }
    }
    updatePath();

    const observer = new MutationObserver(() => {
      requestAnimationFrame(updatePath);
    });

    const startEl = document.getElementById(startId);
    const endEl = document.getElementById(endId);

    if (startEl && endEl) {
      observer.observe(startEl, { attributes: true });
      observer.observe(endEl, { attributes: true });
    }

    return () => observer.disconnect();
  }, [startId, endId]); 

  return (
    <svg
      ref={svgRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
        </marker>
      </defs>

      {buildSinglePath(
        getElementPosition(startId)!,
        points,
        getElementPosition(endId, true)!
      ) && (
        <path
          fill="none"
          stroke="#666"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          d={buildSinglePath(
            getElementPosition(startId)!,
            points,
            getElementPosition(endId, true)!
          )}
        />
      )}

      {points.map((point) => {
        return (
          <Draggable
            key={point.id}
            position={{
              x: point.position.x,
              y: point.position.y,
            }}
            onDrag={(e, data) => handleDrag(e, data, point.id)}
            onStop={() => handleDragStop(point.id)}
          >
            <circle
              r={5}
              fill="#007AFF"
              stroke="#fff"
              strokeWidth={2}
              style={{ cursor: "move", pointerEvents: "auto" }}
            />
          </Draggable>
        );
      })}
    </svg>
  );
};

export default ArrowConnector;

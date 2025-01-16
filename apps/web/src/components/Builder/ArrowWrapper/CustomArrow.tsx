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
  const { canvasRef, scale } = useCanvas();
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

    return {
      x:
        ((isOnLeft ? elementRect.left : elementRect.right) - canvasRect.left) /
        scale,
      y: (elementRect.top - canvasRect.top + elementRect.height / 2) / scale,
    };
  };

  const catmullRomToBezier = (
    points: ControlPoint[],
    tension: number = 0.5
  ): string => {
    if (points.length < 2) return "";

    const d: string[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i === 0 ? points[0] : points[i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i === points.length - 2 ? p2 : points[i + 2];

      const cp1x =
        p1.position.x + ((p2.position.x - p0.position.x) * tension) / 6;
      const cp1y =
        p1.position.y + ((p2.position.y - p0.position.y) * tension) / 6;

      const cp2x =
        p2.position.x - ((p3.position.x - p1.position.x) * tension) / 6;
      const cp2y =
        p2.position.y - ((p3.position.y - p1.position.y) * tension) / 6;

      if (i === 0) {
        d.push(`M${p1.position.x},${p1.position.y}`);
      }

      d.push(
        `C${cp1x},${cp1y},${cp2x},${cp2y},${p2.position.x},${p2.position.y}`
      );
    }

    return d.join(" ");
  };

  const buildSinglePath = (points: ControlPoint[]) => {
    if (points.length < 3) return "";
    return catmullRomToBezier(points);
  };

  const updatePath = () => {
    const start = getElementPosition(startId);
    const end = getElementPosition(endId, true);
    if (!start || !end) return;

    const updatedPoints = [...points];
    if (updatedPoints.length >= 2) {
      updatedPoints[0].position = start;
      updatedPoints[updatedPoints.length - 1].position = end;
      setPoints(updatedPoints);
    }

    requestAnimationFrame(() => {
      pathRef.current?.setAttribute("d", buildSinglePath(updatedPoints));
    });
  };

  const handleDrag = (e: any, data: any, pointId: string) => {
    if (!svgRef.current) return;

    const pointIndex = points.findIndex((p) => p.id === pointId);
    if (pointIndex <= 0 || pointIndex >= points.length - 1) return;

    const updated = [...points];
    updated[pointIndex].position = { x: data.x, y: data.y };
    setPoints(updated);
    updatePath();
  };

  const handleDragStop = (pointId: string) => {
    const pointIndex = points.findIndex((p) => p.id === pointId);
    if (pointIndex <= 0 || pointIndex >= points.length - 1) return;

    const updated = [...points];
    const current = updated[pointIndex];
    const prev = updated[pointIndex - 1];
    const next = updated[pointIndex + 1];

    const newPoints = [
      {
        id: `control-${Math.random()}`,
        position: {
          x: prev.position.x + (current.position.x - prev.position.x) * 0.6,
          y: prev.position.y + (current.position.y - prev.position.y) * 0.6,
        },
      },
      {
        id: `control-${Math.random()}`,
        position: {
          x: current.position.x + (next.position.x - current.position.x) * 0.4,
          y: current.position.y + (next.position.y - current.position.y) * 0.4,
        },
      },
    ];

    updated.splice(pointIndex, 0, newPoints[0]);
    updated.splice(pointIndex + 2, 0, newPoints[1]);
    setPoints(updated);
    updatePath();
  };

  useEffect(() => {
    const start = getElementPosition(startId);
    const end = getElementPosition(endId, true);

    if (start && end) {
      setPoints([
        { id: "start-point", position: start },
        {
          id: "control-1",
          position: {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2,
          },
        },
        { id: "end-point", position: end },
      ]);
    }

    const startEl = document.getElementById(startId);
    const endEl = document.getElementById(endId);

    const observer = new MutationObserver(() => updatePath());
    const resizeObserver = new ResizeObserver(() => updatePath());

    if (startEl && endEl) {
      [startEl, endEl].forEach((el) => {
        observer.observe(el, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
        });
        resizeObserver.observe(el);
      });
    }

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [startId, endId, scale]);

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
        transform: `scale(${scale})`,
        transformOrigin: "0 0",
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

      {points.length >= 3 && (
        <path
          ref={pathRef}
          fill="none"
          stroke="#666"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          d={buildSinglePath(points)}
        />
      )}

      {points.map(
        (point, index) =>
          index > 0 &&
          index < points.length - 1 && (
            <Draggable
              key={point.id}
              position={point.position}
              scale={1}
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
          )
      )}
    </svg>
  );
};

export default ArrowConnector;

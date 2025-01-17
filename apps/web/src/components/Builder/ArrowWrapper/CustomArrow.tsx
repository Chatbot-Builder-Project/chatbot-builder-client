import React, { useEffect, useRef, useState } from "react";
import Draggable, { DraggableEvent } from "react-draggable";
import { useCanvas } from "../../../contexts/CanvasContext";
import { cloneDeep } from "lodash";

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
    tension: number = 0.4
  ): string => {
    if (points.length < 2) return "";

    const d: string[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i === 0 ? points[0] : points[i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i === points.length - 2 ? p2 : points[i + 2];

      const b0x = p1.position.x;
      const b0y = p1.position.y;
      const b1x =
        p1.position.x + ((p2.position.x - p0.position.x) * tension) / 6;
      const b1y =
        p1.position.y + ((p2.position.y - p0.position.y) * tension) / 6;
      const b2x =
        p2.position.x - ((p3.position.x - p1.position.x) * tension) / 6;
      const b2y =
        p2.position.y - ((p3.position.y - p1.position.y) * tension) / 6;
      const b3x = p2.position.x;
      const b3y = p2.position.y;

      if (!i) d.push(`M${b0x},${b0y}`);
      d.push(`C${b1x},${b1y},${b2x},${b2y},${b3x},${b3y}`);
    }

    return d.join(" ");
  };

  const buildSinglePath = (points: ControlPoint[]) => {
    if (points.length < 2) return "";
    return catmullRomToBezier(points);
  };

  const updatePath = () => {
    const start = getElementPosition(startId);
    const end = getElementPosition(endId, true);
    if (!start || !end) return;

    const updatedPoints = cloneDeep(points);
    if (updatedPoints.length >= 2) {
      updatedPoints[0].position = start;
      updatedPoints[updatedPoints.length - 1].position = end;
      setPoints(updatedPoints);
    }

    requestAnimationFrame(() => {
      pathRef.current?.setAttribute("d", buildSinglePath(updatedPoints));
    });
  };

  function distanceToSegment(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    // Simple line-segment distance function
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) param = dot / lenSq;
    let xx, yy;
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function findClosestSegmentIndex(
    points: ControlPoint[],
    px: number,
    py: number
  ) {
    let minDist = Infinity;
    let index = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i].position;
      const p2 = points[i + 1].position;
      const dist = distanceToSegment(px, py, p1.x, p1.y, p2.x, p2.y);
      if (dist < minDist) {
        minDist = dist;
        index = i;
      }
    }
    return index;
  }

  const createNewPoint = (e: React.MouseEvent<SVGPathElement>) => {
    if (!svgRef.current || !canvasRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = (e.clientX - svgRect.left) / scale;
    const y = (e.clientY - svgRect.top) / scale;

    setPoints((prev) => {
      const segmentIndex = findClosestSegmentIndex(prev, x, y);
      const newPoints = [...prev];
      newPoints.splice(segmentIndex + 1, 0, {
        id: `point-${Date.now()}`,
        position: { x, y },
      });
      return newPoints;
    });
  };

  const handleDrag = (_: DraggableEvent, data: Point, pointId: string) => {
    if (!svgRef.current) return;

    const pointIndex = points.findIndex((p) => p.id === pointId);
    if (pointIndex < 0) return; // Allow all points to be moved, including first or last

    const updated = [...points];
    updated[pointIndex].position = { x: data.x, y: data.y };
    setPoints(updated);
  };

  useEffect(() => {
    const start = getElementPosition(startId);
    const end = getElementPosition(endId, true);

    if (start && end) {
      setPoints([
        { id: "start-point", position: start },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // Change pointerEvents to "auto" so clicking is enabled
        pointerEvents: "auto",
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

      {points.length >= 2 && (
        <path
          ref={pathRef}
          fill="none"
          stroke="#666"
          strokeWidth="5"
          markerEnd="url(#arrowhead)"
          d={buildSinglePath(points)}
          style={{ cursor: "crosshair	", pointerEvents: "auto" }}
          onMouseDown={createNewPoint}
        />
      )}

      {points.map((point) =>
        point.id === "start-point" || point.id === "end-point" ? null : (
          <Draggable
            key={point.id}
            position={point.position}
            onDrag={(e, data) => handleDrag(e, data, point.id)}
            scale={1}
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

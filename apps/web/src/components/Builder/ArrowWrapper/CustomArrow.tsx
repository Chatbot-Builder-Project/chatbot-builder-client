import React, { useRef, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable, { DraggableEvent } from "react-draggable";
import {
  updateFlowLinkPoints,
  selectFlowLinkById,
  selectNodeById,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";
import { ControlPoint } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { ArrowConnectorProps } from "./types";

const ArrowConnector: React.FC<ArrowConnectorProps> = ({
  startId,
  endId,
  linkId,
  svgRef,
  scale,
}) => {
  const dispatch = useDispatch();
  const pathRef = useRef<SVGPathElement>(null);
  const lastCreatedPointRef = useRef<string | null>(null);

  const flowLink = useSelector((state: RootState) =>
    selectFlowLinkById(state, linkId)
  );
  const sourceNode = useSelector((state: RootState) =>
    selectNodeById(state, parseInt(startId.replace("node-", "")))
  );
  const targetNode = useSelector((state: RootState) =>
    selectNodeById(state, parseInt(endId.replace("node-", "")))
  );
  const points = flowLink?.visual?.points || [];

  const nodePositions = useMemo(() => {
    if (
      !sourceNode?.visual ||
      !targetNode?.visual ||
      !sourceNode.visual.x ||
      !sourceNode.visual.y ||
      !targetNode.visual.y ||
      !targetNode.visual.x
    )
      return null;

    return {
      start: {
        x: sourceNode.visual.x + (sourceNode.visual.width || 0),
        y: sourceNode.visual.y + (sourceNode.visual.height || 0) / 2,
      },
      end: {
        x: targetNode.visual.x,
        y: targetNode.visual.y + (targetNode.visual.height || 0) / 2,
      },
    };
  }, [sourceNode?.visual, targetNode?.visual]);

  const updatePoints = (newPoints: ControlPoint[]) => {
    dispatch(updateFlowLinkPoints({ linkId, points: newPoints }));
  };

  const catmullRomToBezier = (
    points: ControlPoint[],
    tension: number = 1.3
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

  useEffect(() => {
    if (!nodePositions) return;

    if (points.length >= 2) {
      const updatedPoints = points.map((point, index) => {
        if (index === 0) return { ...point, position: nodePositions.start };
        if (index === points.length - 1)
          return { ...point, position: nodePositions.end };
        return point;
      });
      updatePoints(updatedPoints);
    } else {
      updatePoints([
        { id: "start-point", position: nodePositions.start },
        { id: "end-point", position: nodePositions.end },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodePositions]);

  function distanceToSegment(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
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

  const handlePathMouseDown = (e: React.MouseEvent<SVGPathElement>) => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = (e.clientX - svgRect.left) / scale;
    const y = (e.clientY - svgRect.top) / scale;

    const segmentIndex = findClosestSegmentIndex(points, x, y);
    const newPointId = `point-${Date.now()}`;
    const newPoints = [...points];
    newPoints.splice(segmentIndex + 1, 0, {
      id: newPointId,
      position: { x, y },
    });
    lastCreatedPointRef.current = newPointId;
    updatePoints(newPoints);

    setTimeout(() => {
      const pointElement = document.querySelector(
        `[data-point-id="${newPointId}"]`
      );
      if (pointElement) {
        const mouseDownEvent = new MouseEvent("mousedown", {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
        });
        pointElement.dispatchEvent(mouseDownEvent);
      }
    }, 0);
  };

  const handleDrag = (
    _: DraggableEvent,
    data: { x: number; y: number },
    pointId: string
  ) => {
    if (!svgRef.current) return;

    const pointIndex = points.findIndex((p) => p.id === pointId);
    if (pointIndex < 0) return;

    const updated = points.map((p, index) =>
      index === pointIndex ? { ...p, position: { x: data.x, y: data.y } } : p
    );
    updatePoints(updated);
  };
  return (
    <>
      {points.length >= 2 && (
        <path
          ref={pathRef}
          fill="none"
          stroke="#666"
          strokeWidth="5"
          markerEnd="url(#arrowhead)"
          d={buildSinglePath(points)}
          style={{ cursor: "crosshair", pointerEvents: "auto" }}
          onMouseDown={handlePathMouseDown}
          onClick={() => console.log("asdasdasdasd")}
        />
      )}

      {points.map((point) =>
        point.id === "start-point" || point.id === "end-point" ? null : (
          <Draggable
            key={point.id}
            position={point.position}
            onDrag={(e, data) => handleDrag(e, data, point.id)}
            scale={scale}
          >
            <circle
              r={5}
              fill="#007AFF"
              stroke="#fff"
              strokeWidth={2}
              style={{ cursor: "grab", pointerEvents: "auto" }}
              data-point-id={point.id}
            />
          </Draggable>
        )
      )}
    </>
  );
};

export default React.memo(ArrowConnector);

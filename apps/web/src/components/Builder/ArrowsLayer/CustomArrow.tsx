import React, { useRef, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable, { DraggableEvent } from "react-draggable";
import {
  updateFlowLinkPoints,
  selectFlowLinkById,
  selectNodeById,
  setSelected,
  selectElementId,
  removeFlowLink,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";
import { ControlPoint } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { ArrowConnectorProps } from "./types";
import { catmullRomToBezier } from "@chatbot-builder/client/utils";

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
  const mouseDownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);

  const flowLink = useSelector((state: RootState) =>
    selectFlowLinkById(state, linkId)
  );
  const sourceNode = useSelector((state: RootState) =>
    selectNodeById(state, parseInt(startId.replace("node-", "")))
  );
  const targetNode = useSelector((state: RootState) =>
    selectNodeById(state, parseInt(endId.replace("node-", "")))
  );
  const points = flowLink?.visual?.data?.points || [];

  const selectedId = useSelector(selectElementId);
  const isSelected = selectedId === linkId;

  const nodePositions = useMemo(() => {
    if (
      !sourceNode?.visual.data ||
      !targetNode?.visual.data ||
      !sourceNode.visual.data.x ||
      !sourceNode.visual.data.y ||
      !targetNode.visual.data.y ||
      !targetNode.visual.data.x
    )
      return null;

    return {
      start: {
        x: sourceNode.visual.data.x + (sourceNode.visual.data.width || 0),
        y: sourceNode.visual.data.y + (sourceNode.visual.data.height || 0) / 2,
      },
      end: {
        x: targetNode.visual.data.x,
        y: targetNode.visual.data.y + (targetNode.visual.data.height || 0) / 2,
      },
    };
  }, [sourceNode?.visual.data, targetNode?.visual.data]);

  const updatePoints = (newPoints: ControlPoint[]) => {
    dispatch(updateFlowLinkPoints({ linkId, points: newPoints }));
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && isSelected) {
        dispatch(removeFlowLink(linkId));
        dispatch(setSelected(null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, isSelected, linkId]);

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

  const handlePathInteraction = (e: React.MouseEvent<SVGPathElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = (e.clientX - svgRect.left) / scale;
    const y = (e.clientY - svgRect.top) / scale;

    mousePositionRef.current = { x, y };

    mouseDownTimerRef.current = setTimeout(() => {
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
    }, 100);

    const handleMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (mouseDownTimerRef.current) {
        clearTimeout(mouseDownTimerRef.current);

        if (mousePositionRef.current) {
          const dx =
            e.clientX - (svgRect.left + mousePositionRef.current.x * scale);
          const dy =
            e.clientY - (svgRect.top + mousePositionRef.current.y * scale);
          const moved = Math.sqrt(dx * dx + dy * dy) > 5; // Small threshold for movement

          if (!moved) {
            if (isSelected) {
              dispatch(setSelected(null));
            } else {
              dispatch(setSelected(linkId));
            }
          }
        }
      }

      mousePositionRef.current = null;
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mouseup", handleMouseUp);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (mouseDownTimerRef.current) {
        clearTimeout(mouseDownTimerRef.current);
      }
    };
  }, []);

  const handleDrag = (
    e: DraggableEvent,
    data: { x: number; y: number },
    pointId: string
  ) => {
    e.preventDefault();
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
          stroke={isSelected ? "#009bff" : "#fff"}
          strokeWidth="5"
          markerEnd={`url(#${isSelected ? "arrowhead-selected" : "arrowhead"})`}
          d={buildSinglePath(points)}
          style={{ cursor: "pointer", pointerEvents: "auto" }}
          onMouseDown={handlePathInteraction}
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
              fill="#009bff"
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

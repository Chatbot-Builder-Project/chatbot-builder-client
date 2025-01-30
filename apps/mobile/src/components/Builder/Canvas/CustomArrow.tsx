import React, { memo, useRef, useState, useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Path, Circle, G } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { View } from "react-native";
import {
  selectFlowLinkById,
  selectNodeById,
  selectElementId,
  setSelected,
  updateFlowLinkPoints,
  removeFlowLink,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";
import { catmullRomToBezier } from "@chatbot-builder/client/utils";

interface CustomArrowProps {
  linkId: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CustomArrow = memo(
  ({ linkId }: CustomArrowProps) => {
    const dispatch = useDispatch();
    const flowLink = useSelector((state: RootState) =>
      selectFlowLinkById(state, linkId)
    );
    const selectedId = useSelector(selectElementId);
    const isSelected = selectedId === linkId;

    const [newPointId, setNewPointId] = useState<string | null>(null);
    const newPointIdRef = useRef(newPointId);
    const pointsRef = useRef(flowLink?.visual?.points || []);

    useEffect(() => {
      newPointIdRef.current = newPointId;
    }, [newPointId]);

    useEffect(() => {
      pointsRef.current = flowLink?.visual?.points || [];
    }, [flowLink?.visual?.points]);

    const sourceNode = useSelector((state: RootState) =>
      selectNodeById(state, flowLink.sourceNodeId)
    );
    const targetNode = useSelector((state: RootState) =>
      selectNodeById(state, flowLink.targetNodeId)
    );

    const nodePositions = (() => {
      if (!sourceNode?.visual || !targetNode?.visual) return null;

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
    })();

    useEffect(() => {
      if (!nodePositions || !flowLink) return;

      const existingPoints = flowLink.visual?.points || [];
      if (existingPoints.length === 0) {
        const initialPoints = [
          { id: "start-point", position: nodePositions.start },
          { id: "end-point", position: nodePositions.end },
        ];
        dispatch(updateFlowLinkPoints({ linkId, points: initialPoints }));
      } else {
        const needsUpdate = existingPoints.some((point, index) => {
          if (index === 0 && !pointsEqual(point.position, nodePositions.start))
            return true;
          if (
            index === existingPoints.length - 1 &&
            !pointsEqual(point.position, nodePositions.end)
          )
            return true;
          return false;
        });

        if (needsUpdate) {
          const updatedPoints = existingPoints.map((point, index) => {
            if (index === 0) return { ...point, position: nodePositions.start };
            if (index === existingPoints.length - 1)
              return { ...point, position: nodePositions.end };
            return point;
          });
          dispatch(updateFlowLinkPoints({ linkId, points: updatedPoints }));
        }
      }
    }, [dispatch, linkId, nodePositions, flowLink]);

    const points = flowLink?.visual?.points || [];

    const [virtualPoints, setVirtualPoints] = useState([]);

    useEffect(() => {
      if (points.length < 2) {
        setVirtualPoints([]);
        return;
      }

      // const newVirtualPoints = points.slice(0, -1).map((point, i) => {
      //   const p1 = point.position;
      //   const p2 = points[i + 1].position;
      //   return {
      //     id: `virtual-${i}-${point.id}`,
      //     position: {
      //       x: (p1.x + p2.x) / 2 + 2500,
      //       y: (p1.y + p2.y) / 2 + 2500,
      //     },
      //     between: [i, i + 1],
      //   };
      // });

      // setVirtualPoints(newVirtualPoints);
    }, [points]);

    const virtualPanGesture = (vPoint: any) =>
      Gesture.Pan()
        .runOnJS(true)
        .onBegin(() => {
          const newPoint = {
            id: `point-${Date.now()}`,
            position: vPoint.position,
          };
          const currentPoints = pointsRef.current;
          const newPoints = [
            ...currentPoints.slice(0, vPoint.between[1]),
            newPoint,
            ...currentPoints.slice(vPoint.between[1]),
          ];
          dispatch(updateFlowLinkPoints({ linkId, points: newPoints }));
          setNewPointId(newPoint.id);
        })
        .onUpdate((event) => {
          if (newPointIdRef.current) {
            const updatedPoints = pointsRef.current.map((point) =>
              point.id === newPointIdRef.current
                ? {
                    ...point,
                    position: {
                      x: event.absoluteX,
                      y: event.absoluteY,
                    },
                  }
                : point
            );
            dispatch(updateFlowLinkPoints({ linkId, points: updatedPoints }));
          }
        })
        .onEnd(() => {
          setNewPointId(null);
        });

    const pointPanGesture = () => (pointId: string) =>
      Gesture.Pan()
        .runOnJS(true)
        .onUpdate((event) => {
          const updatedPoints = pointsRef.current.map((point) =>
            point.id === pointId
              ? {
                  ...point,
                  position: {
                    x: event.absoluteX + 2500,
                    y: event.absoluteY + 2500,
                  },
                }
              : point
          );
          dispatch(updateFlowLinkPoints({ linkId, points: updatedPoints }));
        });
    const pathData =
      points.length < 2 ? "" : catmullRomToBezier(points, 1.3, 2500);

    const arrowPath = useAnimatedProps(
      () => ({
        d: pathData,
      }),
      [pathData]
    );

    if (!nodePositions || points.length < 2) return null;

    return (
      <>
        <AnimatedPath
          animatedProps={arrowPath}
          fill="none"
          stroke={isSelected ? "#009bff" : "#fff"}
          strokeWidth={5}
          markerEnd={`url(#${isSelected ? "arrowhead-selected" : "arrowhead"})`}
        />

        {virtualPoints.map((vPoint) => (
          <GestureDetector gesture={virtualPanGesture(vPoint)} key={vPoint.id}>
            <G x={vPoint.position.x} y={vPoint.position.y}>
              <Circle
                r={8}
                fill="rgba(0, 155, 255, 0.3)"
                stroke="#fff"
                strokeWidth={2}
              />
            </G>
          </GestureDetector>
        ))}

        {points.map((point) => {
          if (point.id === "start-point" || point.id === "end-point")
            return null;

          return (
            <GestureDetector gesture={pointPanGesture(point.id)} key={point.id}>
              <G x={point.position.x} y={point.position.y}>
                <Circle r={6} fill="#009bff" stroke="#fff" strokeWidth={2} />
              </G>
            </GestureDetector>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.linkId === nextProps.linkId
);

// Helper function to compare points
const pointsEqual = (
  a: { x: number; y: number },
  b: { x: number; y: number }
) => a.x === b.x && a.y === b.y;

export default CustomArrow;

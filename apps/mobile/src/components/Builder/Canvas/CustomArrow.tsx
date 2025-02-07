import React, { memo, useRef, useState, useEffect, useMemo } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Path, Circle, G, Defs, Use } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
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
import {
  ControlPoint as ControlPointType,
  Point,
} from "@chatbot-builder/store/slices/Builder/Nodes/types";

interface CustomArrowProps {
  linkId: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

const AnimatedPathComponent = ({ pathData, isSelected }) => {
  const arrowPath = useAnimatedProps(
    () => ({
      d: pathData,
    }),
    [pathData]
  );
  return (
    <AnimatedPath
      animatedProps={arrowPath}
      fill="none"
      stroke={isSelected ? "#009bff" : "#fff"}
      strokeWidth={5}
      markerEnd={`url(#${isSelected ? "arrowhead-selected" : "arrowhead"})`}
    />
  );
};

interface VirtualPointProps {
  point: {
    id: string;
    position: { x: number; y: number };
    between: [number, number];
  };
  gesture: ReturnType<typeof Gesture.Pan>;
}

const VirtualPoint = memo(
  ({ point, gesture }: VirtualPointProps) => {
    if (!point) return null;
    return (
      <GestureDetector gesture={gesture}>
        <AnimatedG x={point.position.x} y={point.position.y}>
          <Use href="#virtualPointCircle" />
        </AnimatedG>
      </GestureDetector>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.point.position === nextProps.point.position;
  }
);

interface ControlPointProps {
  point: {
    id: string;
    position: { x: number; y: number };
  };
  gesture: ReturnType<typeof Gesture.Pan>;
}

const ControlPoint = memo(
  ({ point, gesture }: ControlPointProps) => {
    if (!point) return null;
    return (
      <GestureDetector gesture={gesture}>
        <AnimatedG x={point.position.x} y={point.position.y}>
          <Use href="#controlPointCircle" />
        </AnimatedG>
      </GestureDetector>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.point.position === nextProps.point.position;
  }
);

interface PointsComponentProps {
  points: Array<{
    id: string;
    position: { x: number; y: number };
  }>;
  virtualPoints: Array<{
    id: string;
    position: { x: number; y: number };
    between: [number, number];
  }>;
  virtualPanGesture: (point: {
    id: string;
    position: { x: number; y: number };
    between: [number, number];
  }) => ReturnType<typeof Gesture.Pan>;
  pointPanGesture: (pointId: string) => ReturnType<typeof Gesture.Pan>;
}

const PointsComponent = memo(
  ({
    points,
    virtualPoints,
    virtualPanGesture,
    pointPanGesture,
  }: PointsComponentProps) => {
    return (
      <>
        {virtualPoints?.map((vPoint) => (
          <VirtualPoint
            key={vPoint.id}
            point={vPoint}
            gesture={virtualPanGesture(vPoint)}
          />
        ))}
        {points.map((point) => {
          if (point.id === "start-point" || point.id === "end-point")
            return null;
          return (
            <ControlPoint
              key={point.id}
              point={point}
              gesture={pointPanGesture(point.id)}
            />
          );
        })}
      </>
    );
  }
);

interface CoreArrowProps {
  flowLink: any;
  isSelected: boolean;
  nodePositions: any;
  virtualPoints: any[];
  virtualPanGesture: any;
  pointPanGesture: any;
  pathData: string;
}

const CoreArrow = memo(
  ({
    flowLink,
    isSelected,
    nodePositions,
    virtualPoints,
    virtualPanGesture,
    pointPanGesture,
    pathData,
  }: CoreArrowProps) => {
    if (
      !nodePositions ||
      !flowLink?.visual?.points ||
      flowLink.visual.points.length < 2
    ) {
      return null;
    }

    return (
      <>
        <Defs>
          <Circle
            id="virtualPointCircle"
            r={2}
            fill="rgba(0, 155, 255, 0.3)"
            stroke="#fff"
            strokeWidth={2}
          />
          <Circle
            id="controlPointCircle"
            r={2}
            fill="#009bff"
            stroke="#fff"
            strokeWidth={2}
          />
        </Defs>
        <AnimatedPathComponent pathData={pathData} isSelected={isSelected} />
        <PointsComponent
          points={flowLink.visual.points}
          virtualPoints={virtualPoints}
          virtualPanGesture={virtualPanGesture}
          pointPanGesture={pointPanGesture}
        />
      </>
    );
  }
);

const withArrowLogic = (
  WrappedComponent: React.ComponentType<CoreArrowProps>
) => {
  return memo(
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

      const sourceNode = useSelector((state: RootState) =>
        selectNodeById(state, flowLink.sourceNodeId)
      );
      const targetNode = useSelector((state: RootState) =>
        selectNodeById(state, flowLink.targetNodeId)
      );

      useEffect(() => {
        newPointIdRef.current = newPointId;
      }, [newPointId]);

      useEffect(() => {
        pointsRef.current = flowLink?.visual?.points || [];
      }, [flowLink?.visual?.points]);

      const nodePositions = useMemo(() => {
        if (!sourceNode || !targetNode) return null;
        return {
          start: {
            x: (sourceNode.visual?.x || 0) + (sourceNode.visual?.width || 0),
            y:
              (sourceNode.visual?.y || 0) +
              (sourceNode.visual?.height || 0) / 2,
          },
          end: {
            x: targetNode.visual?.x || 0,
            y:
              (targetNode.visual?.y || 0) +
              (targetNode.visual?.height || 0) / 2,
          },
        };
      }, [sourceNode, targetNode]);

      useEffect(() => {
        if (!nodePositions || !flowLink) return;

        // Add initialization logic for empty points
        if (!flowLink.visual?.points || flowLink.visual.points.length === 0) {
          const initialPoints = [
            { id: "start-point", position: nodePositions.start },
            { id: "end-point", position: nodePositions.end },
          ];
          dispatch(updateFlowLinkPoints({ linkId, points: initialPoints }));
          return;
        }

        // Continue with existing update logic
        const currentPoints = [...flowLink.visual.points];
        const updatedPoints = currentPoints.map((point, index) => {
          if (index === 0) return { ...point, position: nodePositions.start };
          if (index === currentPoints.length - 1)
            return { ...point, position: nodePositions.end };
          return point;
        });

        const needsUpdate = currentPoints.some((point, index) => {
          if (index === 0 && !pointsEqual(point.position, nodePositions.start))
            return true;
          if (
            index === currentPoints.length - 1 &&
            !pointsEqual(point.position, nodePositions.end)
          )
            return true;
          return false;
        });

        if (needsUpdate) {
          dispatch(updateFlowLinkPoints({ linkId, points: updatedPoints }));
        }
      }, [dispatch, linkId, nodePositions, flowLink?.visual?.points]);

      const [virtualPoints, setVirtualPoints] = useState<any[]>([]);
      useEffect(() => {
        if (!flowLink?.visual?.points || flowLink.visual.points.length < 2) {
          setVirtualPoints([]);
          return;
        }

        const newVirtualPoints = flowLink.visual.points
          .slice(0, -1)
          .map((point, i) => ({
            id: `virtual-${i}-${point.id}`,
            position: {
              x:
                (point.position.x + flowLink.visual.points[i + 1].position.x) /
                  2 +
                2500,
              y:
                (point.position.y + flowLink.visual.points[i + 1].position.y) /
                  2 +
                2500,
            },
            between: [i, i + 1],
          }));

        setVirtualPoints(newVirtualPoints);
      }, [flowLink?.visual?.points]);

      const virtualPanGesture = (vPoint: any) =>
        Gesture.Pan()
          .onBegin((e) => {
            const newPoint = {
              id: `point-${Date.now()}`,
              position: vPoint.position,
            };
            const newPoints = [
              ...flowLink.visual.points.slice(0, vPoint.between[1]),
              newPoint,
              ...flowLink.visual.points.slice(vPoint.between[1]),
            ];
            dispatch(updateFlowLinkPoints({ linkId, points: newPoints }));
            setNewPointId(newPoint.id);
          })
          .onUpdate((e) => {
            if (newPointIdRef.current) {
              const updatedPoints = flowLink.visual.points.map((point) =>
                point.id === newPointIdRef.current
                  ? { ...point, position: { x: e.absoluteX, y: e.absoluteY } }
                  : point
              );
              dispatch(updateFlowLinkPoints({ linkId, points: updatedPoints }));
            }
          })
          .onEnd(() => {
            setNewPointId(null);
          });

      const pointPanGesture = (pointId: string) =>
        Gesture.Pan()
          .runOnJS(true)
          .onUpdate((event) => {
            const updatedPoints = flowLink.visual.points.map((point) =>
              point.id === pointId
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
          });

      const pathData = useMemo(() => {
        if (!flowLink?.visual?.points || flowLink.visual.points.length < 2)
          return "";
        return catmullRomToBezier(flowLink.visual.points, 1.3, 2500);
      }, [flowLink?.visual?.points]);

      return (
        <WrappedComponent
          flowLink={flowLink}
          isSelected={isSelected}
          nodePositions={nodePositions}
          virtualPoints={virtualPoints}
          virtualPanGesture={virtualPanGesture}
          pointPanGesture={pointPanGesture}
          pathData={pathData}
        />
      );
    },
    (prevProps, nextProps) => prevProps.linkId === nextProps.linkId
  );
};

const CustomArrow = withArrowLogic(CoreArrow);

const pointsEqual = (
  a: { x: number; y: number },
  b: { x: number; y: number }
) => a.x === b.x && a.y === b.y;

export default CustomArrow;

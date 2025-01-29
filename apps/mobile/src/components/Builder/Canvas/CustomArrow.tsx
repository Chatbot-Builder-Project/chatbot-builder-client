import React, { memo, useEffect } from "react";
import { Path } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { TouchableWithoutFeedback } from "react-native";
import {
  selectFlowLinkById,
  selectNodeById,
  selectElementId,
  setSelected,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";
import { catmullRomToBezier } from "@chatbot-builder/client/utils";
import { useSharedValue } from "react-native-reanimated";
import Animated, { useAnimatedProps } from "react-native-reanimated";

interface CustomArrowProps {
  linkId: number;
  scale: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CustomArrow = memo(({ linkId, scale }: CustomArrowProps) => {
  const dispatch = useDispatch();
  const flowLink = useSelector((state: RootState) =>
    selectFlowLinkById(state, linkId)
  );
  const selectedId = useSelector(selectElementId);
  const isSelected = selectedId === linkId;

  const sourceNode = useSelector((state: RootState) =>
    selectNodeById(state, flowLink.sourceNodeId)
  );
  const targetNode = useSelector((state: RootState) =>
    selectNodeById(state, flowLink.targetNodeId)
  );
  console.log({
    sourceNode,
    targetNode,
  });
  if (!sourceNode || !targetNode) return null;

  const startX = (sourceNode.visual.x || 0) + (sourceNode.visual.width || 0);
  const startY =
    (sourceNode.visual.y || 0) + (sourceNode.visual.height || 0) / 2;
  const endX = targetNode.visual.x || 0;
  const endY = (targetNode.visual.y || 0) + (targetNode.visual.height || 0) / 2;

  const onPressArrow = () => {
    dispatch(setSelected(linkId));
  };

  const pathPoints = [
    {
      id: "1",
      position: { x: startX + 2500 / scale, y: startY + 2500 / scale },
    },
    { id: "2", position: { x: endX + 2500 / scale, y: endY + 2500 / scale } },
  ];

  const d = useSharedValue(catmullRomToBezier(pathPoints));

  useEffect(() => {
    d.set(catmullRomToBezier(pathPoints));
  }, [startX, startY, endX, endY]);

  const animatedProps = useAnimatedProps(() => ({
    d: d.value,
  }));

  console.log({
    d,
    pathPoints,
  });

  return (
    <TouchableWithoutFeedback onPress={onPressArrow}>
      <AnimatedPath
        animatedProps={animatedProps}
        fill="none"
        stroke={isSelected ? "#009bff" : "#fff"}
        strokeWidth={5}
        markerEnd={`url(#${isSelected ? "arrowhead-selected" : "arrowhead"})`}
      />
    </TouchableWithoutFeedback>
  );
});

export default CustomArrow;

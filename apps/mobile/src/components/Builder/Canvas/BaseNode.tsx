import {
  selectNodeById,
  updateNodeVisual,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";

interface BaseNodeProps {
  scale: number;
  id: number;
}

export default function BaseNode({ scale, id }: BaseNodeProps) {
  const node = useSelector((state: RootState) => selectNodeById(state, id));
  const translateX = useSharedValue(node.visual.x);
  const translateY = useSharedValue(node.visual.y);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onStart(() => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    })
    .onUpdate((evt) => {
      translateX.value = offsetX.value + evt.translationX / scale;
      translateY.value = offsetY.value + evt.translationY / scale;
    })
    .onEnd(() => {
      dispatch(
        updateNodeVisual({
          id,
          visual: { x: translateX.value, y: translateY.value },
        })
      );
    });

  const clickGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => {
      setSelected((prev) => !prev);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ] as const,
    borderWidth: selected ? 2 : 0,
    borderColor: "#009bff",
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 100,
    height: 100,
    backgroundColor: "#f1f1f1",
  }));

  const composedGesture = Gesture.Simultaneous(panGesture, clickGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={animatedStyle}>
        <View>
          <Text>test</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

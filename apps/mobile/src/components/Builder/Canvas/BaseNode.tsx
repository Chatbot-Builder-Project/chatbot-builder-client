import {
  selectNodeById,
  updateNodeVisual,
  selectPendingFlowLinkSourceId,
  setPendingFlowLinkSource,
  createFlowLink,
  setSelected,
  removeNode, // new import
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";
import React, { memo, useState } from "react";
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
  isSelected?: boolean;
}

function BaseNode({ scale, id, isSelected }: BaseNodeProps) {
  const node = useSelector((state: RootState) => selectNodeById(state, id));
  const translateX = useSharedValue(node.visual.x);
  const translateY = useSharedValue(node.visual.y);
  const dispatch = useDispatch();
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const pendingSourceId = useSelector(selectPendingFlowLinkSourceId);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onStart(() => {
      offsetX.set(translateX.get());
      offsetY.set(translateY.get());
    })
    .onUpdate((evt) => {
      translateX.set(offsetX.get() + evt.translationX / scale);
      translateY.set(offsetY.get() + evt.translationY / scale);
    })
    .onEnd(() => {
      dispatch(
        updateNodeVisual({
          id,
          visual: { x: translateX.get(), y: translateY.get() },
        })
      );
    });

  const clickGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => {
      dispatch(setSelected(id));
    });

  const handleNextNode = () => {
    if (!node) return;
    if (pendingSourceId === null) {
      dispatch(setPendingFlowLinkSource(node.info.id));
    } else if (pendingSourceId !== node.info.id) {
      dispatch(createFlowLink(node.info.id));
    }
  };

  const handleDeleteNode = () => {
    dispatch(removeNode(id));
    dispatch(setSelected(null));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.get() },
      { translateY: translateY.get() },
    ] as const,
    borderWidth: isSelected ? 2 : 0,
    borderColor: "#009bff",
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 100,
    height: 100,
    backgroundColor: "#f1f1f1",
  }));

  const trashIconStyle = useAnimatedStyle(() => ({
    opacity: isSelected ? withSpring(1) : withSpring(0),
    transform: [{ translateY: withSpring(isSelected ? -30 : 0) }],
  }));

  const composedGesture = Gesture.Exclusive(panGesture, clickGesture);
  if (!node) return null;

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={animatedStyle}>
        <View>
          <Text>test</Text>
        </View>
        {isSelected && (
          <Animated.View style={trashIconStyle}>
            <Text onPress={handleDeleteNode}>🗑️</Text>
          </Animated.View>
        )}
        {pendingSourceId && pendingSourceId !== node.info.id && (
          <View style={{ position: "absolute", left: -25, top: "50%" }}>
            <Text onPress={handleNextNode}>PrevNode</Text>
          </View>
        )}
        {!pendingSourceId && (
          <View style={{ position: "absolute", right: -25, top: "50%" }}>
            <Text onPress={handleNextNode}>NextNode</Text>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

export default memo(BaseNode, (prevProps, nextProps) => {
  return (
    prevProps.isSelected == nextProps.isSelected && prevProps.id == nextProps.id
  );
});

import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { NodeType } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import styled from "styled-components/native";

interface NodeProps {
  type: NodeType;
  id: string;
  x: number;
  y: number;
  onPositionChange?: (id: string, x: number, y: number) => void;
  onDragEnd?: (type: NodeType, x: number, y: number) => void;
}

type PanGestureContext = {
  startX: number;
  startY: number;
};

const NodeContainer = styled(Animated.View)`
  padding: 10px;
  min-width: 150px;
  background-color: #2d2d2d;
  border-radius: 5px;
  border-width: 2px;
  border-color: #3d3d3d;
  flex-direction: row;
  align-items: center;
`;

const NodeTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  margin-left: 8px;
`;

const Node: React.FC<NodeProps> = ({
  type,
  id,
  x,
  y,
  onPositionChange,
  onDragEnd,
}) => {
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);
  const isDragging = useSharedValue(false);
  const isTemplate = id.startsWith("template-");

  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >({
    onStart: (_, context) => {
      isDragging.value = true;
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      isDragging.value = false;
      if (isTemplate && onDragEnd) {
        onDragEnd(type, translateX.value, translateY.value);
        // Reset template position
        translateX.value = withSpring(x);
        translateY.value = withSpring(y);
      } else if (onPositionChange) {
        onPositionChange(id, translateX.value, translateY.value);
      }
    },
  });

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ] as any,
    opacity: isDragging.value ? 0.7 : 1,
  }));

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <NodeContainer style={[styles.shadow, animatedStyle]}>
        <NodeTitle>{type}</NodeTitle>
      </NodeContainer>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Node;

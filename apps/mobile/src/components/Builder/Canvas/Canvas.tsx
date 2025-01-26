import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import { Button, View, Dimensions, ImageBackground } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDecay,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import GridBackground from "./GridBackground";
import Svg, { Circle, Defs, Pattern, Rect } from "react-native-svg";

const calculateMaxOffsets = (currentScale: number) => {
  const scaledWidth = 5000 * currentScale;
  const scaledHeight = 5000 * currentScale;

  return {
    maxOffsetX: Math.max((scaledWidth - window.width) / (2 * currentScale), 0),
    maxOffsetY: Math.max(
      (scaledHeight - window.height) / (2 * currentScale),
      0
    ),
  };
};

const constrainPosition = (x: number, y: number, currentScale: number) => {
  const { maxOffsetX, maxOffsetY } = calculateMaxOffsets(currentScale);
  return {
    x: Math.min(Math.max(x, -maxOffsetX), maxOffsetX),
    y: Math.min(Math.max(y, -maxOffsetY), maxOffsetY),
  };
};

interface CanvasProps {
  children?: React.ReactNode;
  dimensions?: { width: number; height: number };
}

const FLOW_DIMENSIONS = {
  width: 5000,
  height: 5000,
};

const window = Dimensions.get("window");

const Canvas: React.FC<CanvasProps> = ({
  children,
  dimensions = FLOW_DIMENSIONS,
}) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const width = dimensions.width;
  const height = dimensions.height;

  const ref = useRef<Animated.View>(null);

  useEffect(() => {
    translateX.value = -width / 2 + window.width / 2;
    translateY.value = -height / 2 + window.height / 2;
    savedTranslateX.value = translateX.value;
    savedTranslateY.value = translateY.value;
  }, [translateX, translateY, savedTranslateX, savedTranslateY, width, height]);

  const resetPosition = useCallback(() => {
    translateX.value = withSpring(-width / 2 + window.width / 2, {
      stiffness: 100,
    });
    translateY.value = withSpring(-height / 2 + window.height / 2, {
      stiffness: 100,
    });
    savedTranslateX.value = translateX.value;
    savedTranslateY.value = translateY.value;
  }, [
    scale,
    translateX,
    translateY,
    savedScale,
    savedTranslateX,
    savedTranslateY,
    width,
    window.width,
    height,
    window.height,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value as number },
      { translateY: translateY.value as number },
      { scale: scale.value as number },
    ] as const,
  }));

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      const scaleValue = scale.value || 1;
      const newX = savedTranslateX.value + event.translationX / scaleValue;
      const newY = savedTranslateY.value + event.translationY / scaleValue;
      translateX.value = newX;
      translateY.value = newY;
    })
    .onEnd((event) => {
      const scaleValue = scale.value || 1;
      translateX.value = withDecay({
        deceleration: 0.997,
        velocity: event.velocityX / scaleValue,
      });
      translateY.value = withDecay({
        velocity: event.velocityY / scaleValue,
        deceleration: 0.997,
      });
    });

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      const newScale = savedScale.value * event.scale;
      scale.value = Math.min(Math.max(newScale, 0.8), 2);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  return (
    <View style={styles.root}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View
          ref={ref}
          style={[
            styles.canvas,
            animatedStyle,
            {
              width: Math.max(dimensions.width, window.width),
              height: Math.max(dimensions.height, window.height),
            },
          ]}
        >
          <GridBackground />
          <Animated.Text style={styles.centerMarker}>+</Animated.Text>
          {children}
        </Animated.View>
      </GestureDetector>
      <View style={styles.buttonContainer}>
        <Button title="Reset" onPress={resetPosition} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1d1d1d",
  },
  canvas: {
    backgroundColor: "#1d1d1d",
    position: "relative",
    top: "50%",
    left: "50%",
  },
  gridContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gridPattern: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  centerMarker: {
    position: "absolute",
    left: "50%",
    top: "50%",
    fontSize: 48,
    color: "#fff",
    opacity: 0.5,
    fontWeight: "bold",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default Canvas;

import React, { useCallback, useState } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useDerivedValue,
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import GridBackground from "./GridBackground";
import _ from "lodash";
import ControlBar from "./ControlBar";
import ConfigBar from "./ConfigBar";
import NodesLayer from "./NodesLayer";

const FLOW_DIMENSIONS = {
  width: 5000,
  height: 5000,
};

interface CanvasProps {
  children?: React.ReactNode;
  dimensions?: { width: number; height: number };
}

const window = Dimensions.get("window");

const Canvas: React.FC<CanvasProps> = ({
  children,
  dimensions = FLOW_DIMENSIONS,
}) => {
  const width = dimensions.width;
  const height = dimensions.height;
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const [scaleState, setScaleState] = useState(1);

  useAnimatedReaction(
    () => scale.value,
    (currentScale) => {
      runOnJS(setScaleState)(currentScale);
    }
  );

  const resetPosition = useCallback(() => {
    translateX.set(withSpring(0, { stiffness: 50 }));
    translateY.set(withSpring(0, { stiffness: 50 }));
    savedTranslateX.set(0);
    savedTranslateY.set(0);
  }, [translateX, translateY, savedTranslateX, savedTranslateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: "-50%" },
      { translateY: "-50%" },
      { translateX: translateX.get() },
      { translateY: translateY.get() },
      { scale: scale.get() },
    ] as const,
  }));

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onStart(() => {
      savedTranslateX.set(translateX.get());
      savedTranslateY.set(translateY.get());
    })
    .onUpdate((event) => {
      const scaleValue = Math.min(Math.max(scale.get() || 1, 0.5), 2);
      let newTX = savedTranslateX.get() + event.translationX / scaleValue;
      let newTY = savedTranslateY.get() + event.translationY / scaleValue;

      const scaledWidth = width * scaleValue;
      const viewportWidth = window.width;
      let maxTX = 0;
      let minTX = 0;
      if (scaledWidth > viewportWidth) {
        maxTX = (scaledWidth - viewportWidth) / (2 * scaleValue);
        minTX = -maxTX;
      }

      const scaledHeight = height * scaleValue;
      const viewportHeight = window.height;
      let maxTY = 0;
      let minTY = 0;
      if (scaledHeight > viewportHeight) {
        maxTY = (scaledHeight - viewportHeight) / (2 * scaleValue);
        minTY = -maxTY;
      }

      newTX = Math.min(Math.max(newTX, minTX), maxTX);
      newTY = Math.min(Math.max(newTY, minTY), maxTY);

      translateX.set(newTX);
      translateY.set(newTY);
    });

  const pinchGesture = Gesture.Pinch()
    .runOnJS(true)
    .onBegin(() => {
      savedScale.set(scale.get());
    })
    .onUpdate((event) => {
      const oldScale = scale.get();
      const newScale = savedScale.get() * event.scale;
      const clampedScale = Math.min(Math.max(newScale, 0.5), 2);
      const deltaScale = clampedScale / oldScale;

      const focalX = event.focalX;
      const focalY = event.focalY;

      if (deltaScale !== 1) {
        translateX.set(focalX - (focalX - translateX.get()) * deltaScale);
        translateY.set(focalY - (focalY - translateY.get()) * deltaScale);
      }

      const scaleValue = clampedScale;
      const scaledWidth = width * scaleValue;
      const scaledHeight = height * scaleValue;

      const viewportWidth = window.width;
      let maxTX = 0;
      let minTX = 0;
      if (scaledWidth > viewportWidth) {
        maxTX = (scaledWidth - viewportWidth) / (2 * scaleValue);
        minTX = -maxTX;
      }

      const viewportHeight = window.height;
      let maxTY = 0;
      let minTY = 0;
      if (scaledHeight > viewportHeight) {
        maxTY = (scaledHeight - viewportHeight) / (2 * scaleValue);
        minTY = -maxTY;
      }

      translateX.set(Math.min(Math.max(translateX.get(), minTX), maxTX));
      translateY.set(Math.min(Math.max(translateY.get(), minTY), maxTY));

      scale.set(clampedScale);
    })
    .onEnd(() => {
      savedScale.set(scale.get());
    });

  const composedGesture = Gesture.Exclusive(pinchGesture, panGesture);

  return (
    <View style={styles.root}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View
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
          <NodesLayer scale={scaleState} />
        </Animated.View>
      </GestureDetector>
      <View style={styles.configBar}>
        <ConfigBar resetPosition={resetPosition} />
      </View>

      <View style={styles.buttonContainer}>
        <ControlBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1d1d1d",
  },
  nodesBar: {
    position: "absolute",
    width: "100%",
    height: 100,
    backgroundColor: "#1d1d1d",
    zIndex: 99,
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
  },
  buttonContainer: {
    position: "absolute",
    bottom: 35,
    right: 20,
  },
  configBar: {
    position: "absolute",
    top: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Canvas;

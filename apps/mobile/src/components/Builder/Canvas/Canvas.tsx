import React, { useCallback, useState } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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

  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  const handleNodeSelect = (id: number) => {
    setSelectedNodeId(id);
  };

  const resetPosition = useCallback(() => {
    translateX.value = withSpring(0, { stiffness: 50 });
    translateY.value = withSpring(0, { stiffness: 50 });
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  }, [translateX, translateY, savedTranslateX, savedTranslateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: "-50%" },
      { translateY: "-50%" },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      const scaleValue = Math.min(Math.max(scale.value || 1, 0.5), 2);
      let newTX = savedTranslateX.value + event.translationX / scaleValue;
      let newTY = savedTranslateY.value + event.translationY / scaleValue;

      // Calculate constraints for X axis
      const scaledWidth = width * scaleValue;
      const viewportWidth = window.width;
      let maxTX = 0;
      let minTX = 0;
      if (scaledWidth > viewportWidth) {
        maxTX = (scaledWidth - viewportWidth) / (2 * scaleValue);
        minTX = -maxTX;
      }

      // Calculate constraints for Y axis
      const scaledHeight = height * scaleValue;
      const viewportHeight = window.height;
      let maxTY = 0;
      let minTY = 0;
      if (scaledHeight > viewportHeight) {
        maxTY = (scaledHeight - viewportHeight) / (2 * scaleValue);
        minTY = -maxTY;
      }

      // Apply constraints
      newTX = Math.min(Math.max(newTX, minTX), maxTX);
      newTY = Math.min(Math.max(newTY, minTY), maxTY);

      translateX.value = newTX;
      translateY.value = newTY;
    });

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      const newScale = savedScale.value * event.scale;
      scale.value = Math.min(Math.max(newScale, 0.5), 2);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

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
          <NodesLayer scale={scale.value} />
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

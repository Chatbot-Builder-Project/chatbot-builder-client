import React from "react";
import { Button, View, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useCanvas } from "../../../contexts/CanvasContext";
import { StyleSheet } from "react-native";
import {
  PinchGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";

interface CanvasProps {
  children?: React.ReactNode;
  dimensions?: { width: number; height: number };
}

const FLOW_DIMENSIONS = {
  width: 10000,
  height: 10000,
};

const window = Dimensions.get("window");

const Canvas: React.FC<CanvasProps> = ({
  children,
  dimensions = FLOW_DIMENSIONS,
}) => {
  const { animatedStyle, pinchHandler, panHandler, resetPosition, canvasRef } =
    useCanvas();

  return (
    <View style={styles.root}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={styles.container}>
          <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View
              ref={canvasRef}
              style={[
                styles.canvas,
                animatedStyle,
                {
                  width: dimensions.width,
                  height: dimensions.height,
                },
              ]}
            >
              <View style={styles.gridContainer}>
                {Array.from({ length: Math.ceil(dimensions.height / 35) }).map(
                  (_, rowIndex) =>
                    Array.from({
                      length: Math.ceil(dimensions.width / 35),
                    }).map((_, colIndex) => (
                      <View
                        key={`${rowIndex}-${colIndex}`}
                        style={[
                          styles.gridDot,
                          {
                            left: colIndex * 35,
                            top: rowIndex * 35,
                          },
                        ]}
                      />
                    ))
                )}
              </View>
              <Animated.Text style={styles.centerMarker}>+</Animated.Text>
              {children}
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
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
  container: {
    flex: 1,
  },
  canvas: {
    backgroundColor: "#1d1d1d",
  },
  gridContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gridDot: {
    position: "absolute",
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(67, 67, 67, 0.25)",
  },
  centerMarker: {
    position: "absolute",
    left: "50%",
    top: "50%",
    fontSize: 48,
    color: "#fff",
    opacity: 0.5,
    fontWeight: "bold",
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default Canvas;

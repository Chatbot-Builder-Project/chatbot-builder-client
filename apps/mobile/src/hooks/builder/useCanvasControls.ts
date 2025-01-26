import { useCallback } from "react";
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDecay,
} from "react-native-reanimated";
import {
  PinchGestureHandlerGestureEvent,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Dimensions } from "react-native";

const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

const window = Dimensions.get("window");

export const useCanvasControls = (ref: React.RefObject<any>) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(
    -FLOW_DIMENSIONS.width / 2 + window.width / 2
  );
  const translateY = useSharedValue(
    -FLOW_DIMENSIONS.height / 2 + window.height / 2
  );
  const savedTranslateX = useSharedValue(translateX.value);
  const savedTranslateY = useSharedValue(translateY.value);

  const calculateMaxOffsets = (currentScale: number) => {
    if (!ref.current) return { maxOffsetX: 0, maxOffsetY: 0 };

    const scaledWidth = FLOW_DIMENSIONS.width * currentScale;
    const scaledHeight = FLOW_DIMENSIONS.height * currentScale;
    const maxOffsetX = (scaledWidth - window.width) / (2 * currentScale);
    const maxOffsetY = (scaledHeight - window.height) / (2 * currentScale);

    return {
      maxOffsetX: maxOffsetX > 0 ? maxOffsetX : 0,
      maxOffsetY: maxOffsetY > 0 ? maxOffsetY : 0,
    };
  };

  const constrainPosition = (x: number, y: number, currentScale: number) => {
    const { maxOffsetX, maxOffsetY } = calculateMaxOffsets(currentScale);

    return {
      x: Math.max(Math.min(x, maxOffsetX), -maxOffsetX),
      y: Math.max(Math.min(y, maxOffsetY), -maxOffsetY),
    };
  };

  const resetPosition = useCallback(() => {
    scale.value = withSpring(1);
    translateX.value = withSpring(
      -FLOW_DIMENSIONS.width / 2 + window.width / 2
    );
    translateY.value = withSpring(
      -FLOW_DIMENSIONS.height / 2 + window.height / 2
    );
    savedScale.value = 1;
    savedTranslateX.value = translateX.value;
    savedTranslateY.value = translateY.value;
  }, []);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onStart: () => {
        savedScale.value = scale.value;
      },
      onActive: (event) => {
        const newScale = savedScale.value * event.scale;
        scale.value = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
      },
      onEnd: () => {
        savedScale.value = scale.value;
      },
    });

  const panHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    },
    onActive: (event) => {
      const newX = savedTranslateX.value + event.translationX / scale.value;
      const newY = savedTranslateY.value + event.translationY / scale.value;

      const constrained = constrainPosition(newX, newY, scale.value);
      translateX.value = constrained.x;
      translateY.value = constrained.y;
    },
    onEnd: (event) => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;

      if (Math.abs(event.velocityX) > 0 || Math.abs(event.velocityY) > 0) {
        const velocityX = event.velocityX / scale.value;
        const velocityY = event.velocityY / scale.value;

        const projected = constrainPosition(
          translateX.value + velocityX * 0.2,
          translateY.value + velocityY * 0.2,
          scale.value
        );

        translateX.value = withDecay({
          velocity: velocityX,
          deceleration: 0.997,
          clamp: [-projected.x, projected.x],
        });
        translateY.value = withDecay({
          velocity: velocityY,
          deceleration: 0.997,
          clamp: [-projected.y, projected.y],
        });
      }
    },
  });

  const animatedStyle = useAnimatedStyle<any>(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return {
    scale,
    translateX,
    translateY,
    pinchHandler,
    panHandler,
    animatedStyle,
    resetPosition,
  };
};

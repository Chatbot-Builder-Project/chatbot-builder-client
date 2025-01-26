import { useCallback, useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDecay,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

const window = Dimensions.get("window");

// Removed the useCanvasControls hook as its logic has been moved to Canvas.tsx

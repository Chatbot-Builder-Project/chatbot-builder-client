import React, { createContext, useContext, useRef } from "react";
import { useCanvasControls } from "../hooks/builder/useCanvasControls";
import { SharedValue } from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";

interface CanvasContextType {
  canvasRef: React.RefObject<any>;
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  pinchHandler: (e: PinchGestureHandlerGestureEvent) => void;
  panHandler: (e: PanGestureHandlerGestureEvent) => void;
  animatedStyle: DefaultStyle;
  resetPosition: () => void;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const canvasRef = useRef(null);
  const controls = useCanvasControls(canvasRef);

  return (
    <CanvasContext.Provider value={{ canvasRef, ...controls }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};

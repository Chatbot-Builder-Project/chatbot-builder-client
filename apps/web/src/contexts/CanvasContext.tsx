import React, { createContext, useContext, useRef } from "react";
import { useCanvasControls } from "../hooks/builder";

interface CanvasContextType {
  canvasRef: React.MutableRefObject<HTMLDivElement | null>;
  scale: number;
  isCtrlPressed: boolean;
  isWheelPressed: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  resetPosition: () => void;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
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

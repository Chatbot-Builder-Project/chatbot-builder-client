import React, { createContext, useContext, useRef } from "react";
import { useCanvasControls } from "../hooks/builder";
import html2canvas from "html2canvas";
import { useUploadComponent } from "@chatbot-builder/store/API/imageUploader/useUploadComponent";
interface CanvasContextType {
  canvasRef: React.MutableRefObject<HTMLDivElement | null>;
  scale: number;
  posRef: React.MutableRefObject<{ x: number; y: number }>;
  isCtrlPressed: boolean;
  isDownloading: boolean;
  isWheelPressed: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  resetPosition: () => void;
  handleDownloadScreenshot: () => Promise<string | undefined>;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const controls = useCanvasControls(canvasRef);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const createFileName = (extension: string, name: string) => {
    const timestamp = new Date().toISOString().slice(0, 10);
    return `${name}_${timestamp}.${extension}`;
  };

  const { uploadAndGetImage } = useUploadComponent();

  const handleDownloadScreenshot = React.useCallback(async () => {
    const element = document.getElementById("canvas-wrapper");
    if (!element) return;

    setIsDownloading(true);
    try {
      const rect = element.getBoundingClientRect();

      const canvas = await html2canvas(element, {
        scale: window.devicePixelRatio,
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: "#1d1d1d",
        width: window.innerWidth,
        height: window.innerHeight,
        x: rect.left,
        y: rect.top,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        foreignObjectRendering: true,
        onclone: (documentClone) => {
          const clonedElement = documentClone.getElementById("canvas-wrapper");
          if (clonedElement) {
            clonedElement.style.backgroundImage = `radial-gradient(circle at center,rgba(67, 67, 67, 0.25) 2px, transparent 1px)`;
            clonedElement.style.backgroundSize = `35px 35px`;
            clonedElement.style.backgroundPosition = `center`;
            clonedElement.style.backgroundRepeat = "repeat";
          }
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);

      // Convert base64 to blob
      const response = await fetch(imgData);
      const blob = await response.blob();
      const file = new File(
        [blob],
        createFileName("png", "canvas_screenshot"),
        { type: "image/png" }
      );

      // Upload the image
      const imageDetails = await uploadAndGetImage({
        file,
        isProfilePicture: false,
      });

      if (!imageDetails) {
        console.error("Failed to upload image");
        return undefined;
      }

      return imageDetails.url;
    } catch (error) {
      console.error("Failed to take screenshot:", error);
      return undefined;
    } finally {
      setIsDownloading(false);
    }
  }, [uploadAndGetImage]);

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        handleDownloadScreenshot,
        isDownloading,
        ...controls,
      }}
    >
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

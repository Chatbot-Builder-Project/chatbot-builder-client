import { memo, useRef, useState, useEffect } from "react";
import { selectAllFlowLinks } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { useSelector } from "react-redux";
import ArrowConnector from "./CustomArrow";

const ArrowWrapper = memo(() => {
  const flowLinks = useSelector(selectAllFlowLinks);
  const svgRef = useRef<SVGSVGElement>(null);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const updateScale = () => {
      const canvasElement = document.getElementById("canvas");
      const zoomValue = canvasElement?.style.zoom;
      setScale(zoomValue ? Number(zoomValue) : 1);
    };

    updateScale();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "style") {
          updateScale();
        }
      });
    });

    const canvasElement = document.getElementById("canvas");
    if (canvasElement) {
      observer.observe(canvasElement, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "auto",
        transformOrigin: "0 0",
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="4"
          markerHeight="4"
          refX="3"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 4 2, 0 4" fill="#666" />
        </marker>
      </defs>
      {flowLinks.map((link) => (
        <ArrowConnector
          key={link.info.id}
          linkId={link.info.id}
          endId={`node-${link.targetNodeId}`}
          startId={`node-${link.sourceNodeId}`}
          svgRef={svgRef}
          scale={scale}
        />
      ))}
    </svg>
  );
});

export default ArrowWrapper;

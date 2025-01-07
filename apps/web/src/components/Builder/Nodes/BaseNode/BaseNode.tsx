import { useRef } from "react";
import { useDrag } from "react-dnd";
import { NodeContainer } from "./BaseNode.styles";
import { useXarrow } from "react-xarrows";
import { NodeData } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { BaseNodeProps } from "./types";

export function BaseNode({
  data,
  children,
  isLeftSidebar,
  onPositionChange,
}: BaseNodeProps) {
  const updateXArrow = useXarrow();
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag<
    NodeData & {
      nodeWidth: number;
      nodeHeight: number;
      mouseOffset: { x: number; y: number };
    },
    { x: number; y: number },
    { isDragging: boolean }
  >(() => ({
    type: "NODE",
    item: (monitor) => {
      const nodeElement = nodeRef.current;
      const initialOffset = monitor.getInitialClientOffset();
      const initialSourceClientOffset = monitor.getInitialSourceClientOffset();

      let mouseOffset = { x: 0, y: 0 };
      if (initialOffset && initialSourceClientOffset && nodeElement) {
        const nodeBounds = nodeElement.getBoundingClientRect();
        mouseOffset = {
          x: initialOffset.x - nodeBounds.left,
          y: initialOffset.y - nodeBounds.top,
        };
      }

      return {
        ...data,
        nodeWidth: nodeElement?.offsetWidth ?? 0,
        nodeHeight: nodeElement?.offsetHeight ?? 0,
        mouseOffset,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && onPositionChange) {
        onPositionChange(data.info.id, dropResult.x, dropResult.y);
      }
    },
  }));

  return (
    <NodeContainer
      id={data.info.id.toString()}
      ref={(node) => {
        nodeRef.current = node;
        drag(node);
      }}
      onDrag={updateXArrow}
      $x={data.visual.x}
      $y={data.visual.y}
      $isDragging={isDragging}
      $isLeftSidebar={isLeftSidebar ?? false}
    >
      {children}
    </NodeContainer>
  );
}

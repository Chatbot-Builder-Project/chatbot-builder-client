import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { NodeContainer } from "./BaseNode.styles";
import { BaseNodeData, DragItem } from "../../../../types/nodes";

interface BaseNodeProps<T extends BaseNodeData> {
  data: T;
  isLeftSidebar?: boolean;
  onPositionChange?: (id: string, x: number, y: number) => void;
  children: React.ReactNode;
}

export function BaseNode<T extends BaseNodeData>({
  data,
  children,
  isLeftSidebar,
  onPositionChange,
}: BaseNodeProps<T>) {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem & {
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
          y: initialOffset.y - nodeBounds.top
        };
      }

      return {
        ...data,
        nodeWidth: nodeElement?.offsetWidth ?? 0,
        nodeHeight: nodeElement?.offsetHeight ?? 0,
        mouseOffset
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && onPositionChange) {
        onPositionChange(data.id, dropResult.x, dropResult.y);
      }
    },
  }));

  return (
    <NodeContainer
      ref={(node) => {
        nodeRef.current = node;
        drag(node);
      }}
      $x={data.x}
      $y={data.y}
      $isDragging={isDragging}
      $isLeftSidebar={isLeftSidebar ?? false}
    >
      {children}
    </NodeContainer>
  );
}

import { useRef, memo } from "react";
import { useDrag } from "react-dnd";
import { NodeContainer } from "./BaseNode.styles";
import { useXarrow } from "react-xarrows";
import { NodeData } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { BaseNodeProps } from "./types";
import { useSelector } from "react-redux";
import { selectNodeById } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";

function BaseNode({ id, children, onPositionChange }: BaseNodeProps) {
  const updateXArrow = useXarrow();
  const data = useSelector((state: RootState) => selectNodeById(state, id));
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag<
    NodeData,
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
        ...data!,
        nodeWidth: nodeElement?.offsetWidth ?? 0,
        nodeHeight: nodeElement?.offsetHeight ?? 0,
        mouseOffset,
      } as NodeData;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && onPositionChange && data) {
        onPositionChange(data.info.id, dropResult.x, dropResult.y);
      }
    },
  }));

  return (
    <NodeContainer
      id={id?.toString()}
      ref={(node) => {
        nodeRef.current = node;
        drag(node);
      }}
      // onClick={}
      onDragEnd={updateXArrow}
      $x={data?.visual.x || 0}
      $y={data?.visual.y || 0}
      $isDragging={isDragging}
    >
      {children}
    </NodeContainer>
  );
}

export default memo(BaseNode);

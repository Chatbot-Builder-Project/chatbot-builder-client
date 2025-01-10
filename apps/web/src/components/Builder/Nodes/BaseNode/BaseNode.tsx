import { useRef, memo } from "react";
import { useDrag } from "react-dnd";
import { NodeContainer } from "./BaseNode.styles";
import { useXarrow } from "react-xarrows";
import { NodeData } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { BaseNodeProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNodeById,
  setSelectedNode,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";

function BaseNode({
  id,
  children,
  onPositionChange,
  isSelected,
}: BaseNodeProps) {
  const updateXArrow = useXarrow();
  const data = useSelector((state: RootState) => selectNodeById(state, id));
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

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
      } as NodeData & {
        nodeWidth: number;
        nodeHeight: number;
        mouseOffset: { x: number; y: number };
      };
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

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelectedNode(id));
  };

  return (
    <NodeContainer
      id={id?.toString()}
      ref={(node) => {
        nodeRef.current = node;
        drag(node);
      }}
      $isSelected={isSelected}
      onClick={handleNodeClick}
      onDragEnd={updateXArrow}
      $x={data?.visual.x || 0}
      $y={data?.visual.y || 0}
      $isDragging={isDragging}
    >
      {children}
    </NodeContainer>
  );
}

export default memo(BaseNode, (prevProps, nextProps) => {
  return (
    prevProps.isSelected == nextProps.isSelected && prevProps.id == nextProps.id
  );
});

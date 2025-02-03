import { useRef, memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { BaseNodeContainer } from "./BaseNode.styles";
import { NodeData } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { BaseNodeProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNodeById,
  updateNodeVisual,
  removeNode,
  setSelected,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";

function BaseNode({ id, render, onPositionChange, isSelected }: BaseNodeProps) {
  const node = useSelector((state: RootState) => selectNodeById(state, id));
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
        ...node!,
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
      if (dropResult && onPositionChange && node) {
        onPositionChange(node.info.id, { x: dropResult.x, y: dropResult.y });
      }
    },
  }));

  useEffect(() => {
    if (node && nodeRef && nodeRef.current?.offsetWidth) {
      dispatch(
        updateNodeVisual({
          id: node.info.id,
          visual: {
            width: nodeRef.current?.offsetWidth,
            height: nodeRef.current?.offsetHeight,
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, nodeRef.current]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && isSelected) {
        dispatch(removeNode(id));
        dispatch(setSelected(null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, id, isSelected]);

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelected(id));
  };
  if (!node) return null;

  return (
    <BaseNodeContainer
      id={`node-${id}`}
      ref={(node) => {
        nodeRef.current = node;
        drag(node);
      }}
      $isSelected={isSelected}
      onClick={handleNodeClick}
      $x={node?.visual.data.x || 0}
      $y={node?.visual.data.y || 0}
      $isDragging={isDragging}
    >
      {render && render(node)}
    </BaseNodeContainer>
  );
}

export default memo(BaseNode, (prevProps, nextProps) => {
  return (
    prevProps.isSelected == nextProps.isSelected && prevProps.id == nextProps.id
  );
});

import { useDrag } from "react-dnd";
import { SidebarNodeProps } from "./types";
import { addNode } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { useDispatch } from "react-redux";
import { NodeData } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { useRef } from "react";
import { SidebarNodeContainer } from "./SidebarNode.styles";

const SidebarNode: React.FC<SidebarNodeProps> = ({ nodeType, nodeDetails }) => {
  const dispatch = useDispatch();
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const [, drag] = useDrag<
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
        ...nodeDetails!,
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
      if (dropResult) {
        const newNode: NodeData = {
          ...nodeDetails,
          visual: {
            x: dropResult.x,
            y: dropResult.y,
          },
        };
        dispatch(addNode(newNode));
      }
    },
  }));

  return (
    <SidebarNodeContainer
      ref={(node) => {
        nodeRef.current = node;
        drag(node);
      }}
    >
      {nodeType}
    </SidebarNodeContainer>
  );
};

export default SidebarNode;

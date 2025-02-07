import { IconCircleArrowRight } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import {
  NextNode,
  NodeContainer,
  NodeIcon,
  NodeTitle,
  NodeTypeText,
  PrevNode,
  Wrapper,
} from "./Node.styles";
import { NODES_ICONS } from "@chatbot-builder/client/nodes";
import { NodeProps } from "./types";
import {
  selectPendingFlowLinkSourceId,
  setPendingFlowLinkSource,
  createFlowLink,
  selectFlowLinksBySourceId,
  removeFlowLink,
  selectNodeById,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { RootState } from "@chatbot-builder/store/store";
import { NodeType } from "@chatbot-builder/store/slices/Builder/Nodes/types";

const Node: React.FC<NodeProps> = ({ node }) => {
  const dispatch = useDispatch();
  const pendingSourceId = useSelector(selectPendingFlowLinkSourceId);
  const sourceNode = useSelector((state: RootState) =>
    pendingSourceId ? selectNodeById(state, pendingSourceId) : null
  );

  const existingFlowLinks = useSelector((state: RootState) =>
    selectFlowLinksBySourceId(state, pendingSourceId || -1)
  );

  const handleNextNode = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (pendingSourceId === null) {
      dispatch(setPendingFlowLinkSource(node.info.id));
    } else {
      if (
        sourceNode &&
        sourceNode.type !== NodeType.SmartSwitch &&
        sourceNode.type !== NodeType.Switch
      ) {
        existingFlowLinks.forEach((link) => {
          dispatch(removeFlowLink(link.info.id));
        });
      }
      dispatch(createFlowLink(node.info.id));
    }
  };

  return (
    <NodeContainer>
      <NodeIcon>{NODES_ICONS[node.type]}</NodeIcon>{" "}
      <Wrapper>
        <NodeTitle>{node.info.name}</NodeTitle>
        <NodeTypeText>{node.type}</NodeTypeText>
      </Wrapper>
      {pendingSourceId && (
        <PrevNode onClick={handleNextNode}>
          <IconCircleArrowRight color="#fff" size={12} />
        </PrevNode>
      )}
      {!pendingSourceId && <NextNode onClick={handleNextNode} />}
    </NodeContainer>
  );
};

export default Node;

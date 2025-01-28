import { IconCircleArrowRight, IconPlus } from "@tabler/icons-react";
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
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";

const Node: React.FC<NodeProps> = ({ node }) => {
  const dispatch = useDispatch();
  const pendingSourceId = useSelector(selectPendingFlowLinkSourceId);

  const handleNextNode = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (pendingSourceId === null) {
      dispatch(setPendingFlowLinkSource(node.info.id));
    } else if (pendingSourceId !== node.info.id) {
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
      {pendingSourceId && pendingSourceId !== node.info.id && (
        <PrevNode onClick={handleNextNode}>
          <IconCircleArrowRight color="#fff" size={12} />
        </PrevNode>
      )}
      {!pendingSourceId && (
        <NextNode onClick={handleNextNode}>
          <IconPlus color="#fff" size={12} />
        </NextNode>
      )}
    </NodeContainer>
  );
};

export default Node;

import {
  selectNodeById,
  selectSelectedNodeId,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { Container } from "./ItemConfigSidebar.styles";
import { useSelector } from "react-redux";
import { RootState } from "@chatbot-builder/store/store";

const ItemConfigSidebar = () => {
  const selectedNodeId = useSelector(selectSelectedNodeId);
  const selectedNode = useSelector((state: RootState) =>
    selectedNodeId ? selectNodeById(state, selectedNodeId) : null
  );

  return (
    <>
      <Container $isOpened={!!selectedNodeId}>{selectedNode?.type}</Container>
    </>
  );
};

export default ItemConfigSidebar;

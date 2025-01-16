import { memo } from "react";
import { selectAllFlowLinks } from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import { useSelector } from "react-redux";
import ArrowConnector from "./CustomArrow";

const ArrowWrapper = memo(() => {
  const flowLinks = useSelector(selectAllFlowLinks);

  return (
    <>
      {flowLinks.map((link) => (
        <ArrowConnector
          key={link.info.id}
          endId={`node-${link.targetNodeId}`}
          startId={`node-${link.sourceNodeId}`}
        />
      ))}
    </>
  );
});

export default ArrowWrapper;

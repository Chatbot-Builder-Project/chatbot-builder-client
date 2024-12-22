import { BaseNode } from "../Nodes/BaseNode/BaseNode";
import { LeftSidebarContainer } from "./LeftSidebar.styles";

const LeftSidebar: React.FC = () => {
  return (
    <LeftSidebarContainer>
      <BaseNode id={""} x={0} y={0} label={""} children={undefined} />
    </LeftSidebarContainer>
  );
};

export default LeftSidebar;

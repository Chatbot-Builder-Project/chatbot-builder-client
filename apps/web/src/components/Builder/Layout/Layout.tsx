import { LeftSidebar } from "../LeftSidebar";
import { BuilderLayoutContainer } from "./Layout.styles";

const Layout: React.FC = () => {
  return (
    <BuilderLayoutContainer>
      <LeftSidebar />
    </BuilderLayoutContainer>
  );
};

export default Layout;

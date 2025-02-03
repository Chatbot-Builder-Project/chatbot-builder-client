import { LeftSidebar } from "../LeftSidebar";
import RightSidebar from "../RightSidebar/RightSidebar";
import { LayoutContainer, MainContent } from "./Layout.styles";
import { LayoutProps } from "./types";

const Layout: React.FC<LayoutProps> = ({ children, mode }) => {
  return (
    <LayoutContainer>
      <LeftSidebar mode={mode} />
      <MainContent>{children}</MainContent>
      {mode === "chat" && <RightSidebar />}
    </LayoutContainer>
  );
};

export default Layout;

import { LeftSidebar } from "../LeftSidebar";
import { LayoutContainer, MainContent } from "./Layout.styles";
import { LayoutProps } from "./types";

const Layout: React.FC<LayoutProps> = ({ children, mode }) => {
  return (
    <LayoutContainer>
      <LeftSidebar mode={mode} />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;

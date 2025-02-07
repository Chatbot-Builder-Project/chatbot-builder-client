import { LeftSidebarContainer } from "../../../components/Builder/LeftSidebar/LeftSidebar.styles";
import {
  NavList,
  NavListItem,
  IconWrapper,
  NavListContainer,
} from "./DashboardLayout.styles";
import { IconSettingsFilled, IconUserFilled } from "@tabler/icons-react";

const navItems = [
  { label: "Account", icon: <IconUserFilled size={18} /> },
  { label: "Settings", icon: <IconSettingsFilled size={18} /> },
];

const DashboardSideBar = () => {
  return (
    <LeftSidebarContainer>
      <NavListContainer>
        <NavList>
          {navItems.map((item) => (
            <NavListItem key={item.label}>
              <IconWrapper>{item.icon}</IconWrapper>
              <span>{item.label}</span>
            </NavListItem>
          ))}
        </NavList>
      </NavListContainer>
    </LeftSidebarContainer>
  );
};

export default DashboardSideBar;

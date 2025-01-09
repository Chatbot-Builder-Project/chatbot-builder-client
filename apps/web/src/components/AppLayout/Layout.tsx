import { Outlet } from "react-router-dom";
import { isNil } from "lodash";
import appLogo from "@chatbot-builder/client/public/assets/icons/appLogo.png";
import {
  AppContainer,
  AppLogo,
  AppTitle,
  Navbar,
  NavLinks,
  NavLink,
} from "./Layout.styles";
import { useUser } from "@chatbot-builder/store/slices/User";

type NavigationLink = {
  path: string;
  label: string;
  isLoggedIn?: boolean;
};

const navigationLinks: NavigationLink[] = [
  { path: "/", label: "Home" },
  { path: "/marketplace", label: "Marketplace" },
  { path: "/builder", label: "Builder", isLoggedIn: true },
  { path: "/auth/login", label: "Login", isLoggedIn: false },
];

const AppLayout: React.FC = () => {
  const { user } = useUser();

  const shouldShowLink = ({ isLoggedIn }: NavigationLink) => 
    isNil(isLoggedIn) || 
    (isLoggedIn === user.isAuthenticated);

  return (
    <>
      <Navbar>
        <AppTitle>
          <AppLogo src={appLogo} alt="app-logo" />
          AI Builder
        </AppTitle>
        <NavLinks>
          {navigationLinks
            .filter(shouldShowLink)
            .map(({ path, label }) => (
              <NavLink key={path} to={path}>
                {label}
              </NavLink>
            ))}
        </NavLinks>
      </Navbar>
      <AppContainer>
        <Outlet />
      </AppContainer>
    </>
  );
};

export default AppLayout;

import { Link, Outlet, useLocation } from "react-router-dom";
import { isNil } from "lodash";
import appLogo from "@chatbot-builder/client/public/assets/icons/appLogo.png";
import {
  AppContainer,
  AppLogo,
  AppTitle,
  Navbar,
  NavLinks,
  NavLink,
  ContentsContainer,
  Wrapper,
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
  { path: "/dashboard", label: "Dashboard", isLoggedIn: true },
  { path: "/auth/login", label: "Login", isLoggedIn: false },
];

const AppLayout: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();
  const shouldShowLink = ({ isLoggedIn }: NavigationLink) =>
    isNil(isLoggedIn) || isLoggedIn === user.isAuthenticated;
  console.log(location.pathname);
  return (
    <>
      <Navbar>
        <ContentsContainer>
          <Link to="/">
            <AppTitle>
              <AppLogo src={appLogo} alt="app-logo" />
              AI Builder
            </AppTitle>
          </Link>
          <NavLinks>
            {navigationLinks.filter(shouldShowLink).map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                isActive={location.pathname === path}
              >
                {label}
              </NavLink>
            ))}
          </NavLinks>
        </ContentsContainer>
      </Navbar>
      <Wrapper>
        <AppContainer>
          <Outlet />
        </AppContainer>
      </Wrapper>
    </>
  );
};

export default AppLayout;

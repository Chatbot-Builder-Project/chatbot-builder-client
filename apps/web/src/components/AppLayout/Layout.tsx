import { Link, Outlet, useLocation } from "react-router-dom";
import { isNil } from "lodash";
import { IconUser } from "@tabler/icons-react";
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
  UserSection,
  AuthButton,
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
];

const AppLayout: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();

  const shouldShowLink = ({ isLoggedIn }: NavigationLink) =>
    isNil(isLoggedIn) || isLoggedIn === user.isAuthenticated;

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
          <UserSection>
            {user.isAuthenticated ? (
              <Link to="/profile">
                <IconUser size={24} color="white" />
              </Link>
            ) : (
              <>
                <AuthButton to="/auth/login">Login</AuthButton>
                <AuthButton to="/auth/signup">Sign up</AuthButton>
              </>
            )}
          </UserSection>
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

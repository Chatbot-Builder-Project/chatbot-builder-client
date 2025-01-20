import { useLazyFetchUserInfoQuery } from "@chatbot-builder/store/API/userInfo";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, ComponentType } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomLinearProgress } from "../CustomLinearProgress";

type RouteInfo = {
  pathname: string;
  isUnprotected: boolean;
  isHomePage: boolean;
};

const withProtectedPage = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const [fetchUserInfo, { isLoading, isUninitialized }] =
      useLazyFetchUserInfoQuery();
    const navigate = useNavigate();
    const location = useLocation();

    const getRouteInfo = (): RouteInfo => ({
      pathname: location.pathname,
      isUnprotected: ["/auth"].some((path) => location.pathname.startsWith(path)),
      isHomePage: location.pathname === "/"
    });

    const handleAuthNavigation = (routeInfo: RouteInfo, hasToken: boolean) => {
      if (!hasToken && !routeInfo.isUnprotected && !routeInfo.isHomePage) {
        navigate("/auth/login", { state: { from: routeInfo.pathname } });
      }
    };

    const handleAuthError = async () => {
      const routeInfo = getRouteInfo();
      const result = await fetchUserInfo();
      const error = result.error as FetchBaseQueryError;

      if (error?.status === 401) {
        localStorage.removeItem("token");
        handleAuthNavigation(routeInfo, false);
      }
    };

    useEffect(() => {
      const token = localStorage.getItem("token");
      const routeInfo = getRouteInfo();

      if (token) {
        handleAuthError();
        if (routeInfo.isUnprotected) {
          navigate("/");
        }
      } else {
        handleAuthNavigation(routeInfo, false);
      }
    }, [fetchUserInfo, navigate, location.pathname]);

    if ((isLoading || isUninitialized) && getRouteInfo().isUnprotected && localStorage.getItem("token")) {
      return <CustomLinearProgress />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withProtectedPage;

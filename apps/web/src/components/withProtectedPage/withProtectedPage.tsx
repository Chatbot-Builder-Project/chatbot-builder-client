import { useLazyFetchUserInfoQuery } from "@chatbot-builder/store/API/userInfo";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, ComponentType, FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomLinearProgress } from "../CustomLinearProgress";

interface RouteInfo {
  pathname: string;
  isUnprotected: boolean;
  isHomePage: boolean;
}

const UNPROTECTED_PATHS = ["/auth", "/discover"] as const;

const withProtectedPage = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P> => {
  const WithAuthComponent: FC<P> = (props) => {
    const [fetchUserInfo, { isLoading, isUninitialized }] =
      useLazyFetchUserInfoQuery();
    const navigate = useNavigate();
    const location = useLocation();

    const getRouteInfo = (): RouteInfo => ({
      pathname: location.pathname,
      isUnprotected: UNPROTECTED_PATHS.some((path) =>
        location.pathname.startsWith(path)
      ),
      isHomePage: location.pathname === "/",
    });

    const handleAuthNavigation = (
      { pathname, isUnprotected, isHomePage }: RouteInfo,
      hasToken: boolean
    ): void => {
      if (!hasToken && !isUnprotected && !isHomePage) {
        navigate("/auth/login", { state: { from: pathname } });
      }
    };

    const handleAuthError = async (): Promise<void> => {
      const routeInfo = getRouteInfo();
      const result = await fetchUserInfo();

      if ("error" in result) {
        const error = result.error as FetchBaseQueryError;
        if (error?.status === 401) {
          localStorage.removeItem("token");
          handleAuthNavigation(routeInfo, false);
        }
      }
    };

    useEffect(() => {
      const token = localStorage.getItem("token");
      const routeInfo = getRouteInfo();

      if (token) {
        handleAuthError();
        if (
          routeInfo.isUnprotected &&
          !location.pathname.startsWith("/discover")
        ) {
          navigate("/");
        }
      } else {
        handleAuthNavigation(routeInfo, false);
      }
    }, [fetchUserInfo, navigate, location.pathname]);

    if (
      (isLoading || isUninitialized) &&
      getRouteInfo().isUnprotected &&
      localStorage.getItem("token")
    ) {
      return <CustomLinearProgress />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withProtectedPage;

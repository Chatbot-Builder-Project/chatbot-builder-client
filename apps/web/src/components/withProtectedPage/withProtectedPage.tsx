import { useLazyFetchUserInfoQuery } from "@chatbot-builder/store/API/userInfo";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, ComponentType } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomLinearProgress } from "../CustomLinearProgress";

const withProtectedPage = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const [fetchUserInfo, { isLoading, isUninitialized }] =
      useLazyFetchUserInfoQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthPage = ["/auth/login", "/auth/signup"].includes(
      location.pathname
    );
    const token = localStorage.getItem("token");

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetchUserInfo();
        const error = result.error as FetchBaseQueryError;
        if (error?.status === 401) {
          localStorage.removeItem("token");
          navigate("/auth/login", { state: { from: location.pathname } });
        }
      };

      if (token) {
        fetchData();
        if (isAuthPage) {
          navigate("/");
        }
      } else {
        if (!isAuthPage) {
          navigate("/auth/login", { state: { from: location.pathname } });
        }
      }
    }, [fetchUserInfo, navigate, location.pathname]);

    if ((isLoading || isUninitialized) && isAuthPage && token) {
      return <CustomLinearProgress />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withProtectedPage;

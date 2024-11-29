import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { login, logout } from "./slice";
import { LoginPayload } from "./types";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  const handleLogin = (payload: LoginPayload) => {
    dispatch(login(payload));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    token,
    handleLogin,
    handleLogout,
  };
};
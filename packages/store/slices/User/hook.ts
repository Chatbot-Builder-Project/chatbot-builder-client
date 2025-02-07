import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { removeUser } from "./slice";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const logout = () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
  };

  return { logout, user };
};

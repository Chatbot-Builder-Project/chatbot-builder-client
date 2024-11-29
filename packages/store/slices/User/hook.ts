import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { SetUser } from "./types";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const setUser = (user: SetUser) => {
    dispatch(setUser(user));
  };

  return { setUser, user };
};

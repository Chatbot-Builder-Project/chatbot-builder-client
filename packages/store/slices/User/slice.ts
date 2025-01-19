import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

export const initialState: User = {
  email: null,
  name: null,
  id: null,
  isEmailConfirmed: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, { payload }: PayloadAction<User>) => ({
      // TODO: Remove this hardcoded values
      ...payload,
      isAuthenticated: true,
      name: "amjad",
      id: "123123",
    }),
    removeUser: () => initialState,
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

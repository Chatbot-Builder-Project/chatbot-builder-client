import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

const initialState: User = {
  email: null,
  name: null,
  id: null,
  isEmailConfirmed: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, { payload }: PayloadAction<Required<User>>) => ({
      // TODO: Remove this hardcoded values
      ...payload,
      name: "amjad",
      id: "123123",
    }),
    removeUser: () => initialState,
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

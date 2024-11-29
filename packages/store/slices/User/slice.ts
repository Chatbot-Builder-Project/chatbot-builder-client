import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import { SetUser } from "./types";

const initialState: User = {
  name: null,
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUser>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.name = null;
      state.email = null;
      state.id = null;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

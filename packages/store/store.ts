import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer, builderReducer } from "./slices";
import { authApi } from "./API/Auth";
import { userInfoApi } from "./API/userInfo";

const store = configureStore({
  reducer: {
    user: userReducer,
    builder: builderReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userInfoApi.reducerPath]: userInfoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userInfoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

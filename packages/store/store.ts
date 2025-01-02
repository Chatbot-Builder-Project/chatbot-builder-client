import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer, userReducer, nodesReducer } from "./slices";
import { authApi } from "./API/Auth";
import { userInfoApi } from "./API/userInfo";

const builderReducer = combineReducers({
  nodes: nodesReducer,
});

const store = configureStore({
  reducer: {
    auth: authReducer,
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

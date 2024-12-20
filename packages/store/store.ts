import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer, userReducer, nodesReducer } from "./slices";
import { authApi } from "./API/Auth";

const builderReducer = combineReducers({
  nodes: nodesReducer,
});

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    builder: builderReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

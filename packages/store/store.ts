import { configureStore } from "@reduxjs/toolkit";
import { userReducer, builderReducer } from "./slices";
import { authApi } from "./API/Auth";
import { userInfoApi } from "./API/userInfo";
import { workflowsApi } from "./API/workflows/workflows";
import { imageUploaderApi } from "./API/imageUploader/imageUploader";
import { builderApi } from "./API/builder/builder";

const store = configureStore({
  reducer: {
    user: userReducer,
    builder: builderReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userInfoApi.reducerPath]: userInfoApi.reducer,
    [workflowsApi.reducerPath]: workflowsApi.reducer,
    [imageUploaderApi.reducerPath]: imageUploaderApi.reducer,
    [builderApi.reducerPath]: builderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userInfoApi.middleware,
      workflowsApi.middleware,
      imageUploaderApi.middleware,
      builderApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

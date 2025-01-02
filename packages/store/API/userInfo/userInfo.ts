import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWithAuthHandling } from "../baseQuery";
import { setUser, removeUser } from "../../slices/User/slice";
import { User } from "../../slices/types";

export const userInfoApi = createApi({
  reducerPath: "userInfoApi",
  baseQuery: fetchBaseQueryWithAuthHandling,
  endpoints: (builder) => ({
    fetchUserInfo: builder.query<User, void>({
      query: () => ({
        url: "/users/manage/info",
        method: "GET",
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          dispatch(removeUser());
        }
      },
    }),
  }),
});

export const { useLazyFetchUserInfoQuery } = userInfoApi;

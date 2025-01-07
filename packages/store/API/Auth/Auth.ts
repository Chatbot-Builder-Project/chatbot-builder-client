import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthCredentials, AuthResponse } from "./types";
import { fetchBaseQueryWithAuthHandling } from "../baseQuery";
// import { login, logout } from "../../slices/Auth/slice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQueryWithAuthHandling,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: "/users/identity/login",
        method: "POST",
        body: credentials,
      }),
      // onQueryStarted: async (_credentials, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(login({ token: data.accessToken }));
      //   } catch (error) {
      //     dispatch(logout());
      //   }
      // },
    }),
    register: builder.mutation<AuthResponse, AuthCredentials>({
      query: (userDetails) => ({
        url: "/users/identity/register",
        method: "POST",
        body: userDetails,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

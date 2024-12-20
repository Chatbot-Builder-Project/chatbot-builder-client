import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthCredentials, AuthResponse } from "./types";
import { baseQuery } from "../baseQuery";
import { login, logout } from "../../slices/Auth/slice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(login({ token: data.accessToken }));
        } catch {
          dispatch(logout());
        }
      },
    }),
    register: builder.mutation<AuthResponse, AuthCredentials>({
      query: (userDetails) => ({
        url: "/users/register",
        method: "POST",
        body: userDetails,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

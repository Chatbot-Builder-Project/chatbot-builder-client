import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

const baseUrl = import.meta.env.VITE_API_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers: Headers): Headers => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithAuthHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  Record<string, unknown>,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && "status" in result.error) {
    if (result.error.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  return result;
};
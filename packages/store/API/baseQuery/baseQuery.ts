import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { QueryError } from "./types";

const baseUrl = "http://localhost:8080/api/v1";

export const fetchBaseQueryWithAuthHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  QueryError | FetchBaseQueryError,
  Record<string, unknown>,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    timeout: 100000,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return Promise.resolve(baseQuery(args, api, extraOptions))
    .then((result) => {
      if (!result.error) return result;

      const error = result.error as FetchBaseQueryError;

      if (error.data && typeof error.data === "object") {
        const errorData = error.data as QueryError;
        return {
          ...result,
          error: {
            ...error,
            detail: errorData.detail ?? "An error occurred",
            title: errorData.title ?? "Error",
            type: errorData.type ?? "Unknown Error",
            status: error.status ?? 500,
          } as QueryError,
        };
      }

      return result;
    })
    .catch(() => ({
      error: {
        status: 500,
        data: {
          detail: "Network or server error occurred",
          title: "Error",
          type: "UnhandledError",
        } as QueryError,
      },
    }));
};

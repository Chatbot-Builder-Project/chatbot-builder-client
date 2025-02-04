import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWithAuthHandling } from "../baseQuery";

export const saveBuilderApi = createApi({
  reducerPath: "saveBuilderApi",
  baseQuery: fetchBaseQueryWithAuthHandling,
  endpoints: (builder) => ({
    saveWorkflow: builder.mutation<void, any>({
      query: (body) => ({
        url: "/workflows",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
  }),
});

export const { useSaveWorkflowMutation } = saveBuilderApi;

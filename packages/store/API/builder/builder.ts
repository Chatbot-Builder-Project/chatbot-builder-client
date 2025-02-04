import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWithAuthHandling } from "../baseQuery";
import type { WorkflowResponse } from "./types";

export const builderApi = createApi({
  reducerPath: "builderApi",
  baseQuery: fetchBaseQueryWithAuthHandling,
  endpoints: (builder) => ({
    createWorkflow: builder.mutation<{ id: string }, any>({
      query: (body) => ({
        url: "/workflows",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    updateWorkflow: builder.mutation<void, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/workflows/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    deleteWorkflow: builder.mutation<void, string>({
      query: (id) => ({
        url: `/workflows/${id}`,
        method: "DELETE",
      }),
    }),
    getWorkflow: builder.query<WorkflowResponse, string | undefined>({
      query: (id) => ({
        url: `/workflows/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateWorkflowMutation,
  useUpdateWorkflowMutation,
  useDeleteWorkflowMutation,
  useGetWorkflowQuery,
} = builderApi;

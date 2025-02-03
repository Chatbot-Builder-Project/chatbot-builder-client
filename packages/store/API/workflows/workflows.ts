import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWithAuthHandling } from "../baseQuery";
import { ChatbotsPage } from "./types";

interface FetchWorkflowsArgs {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  includeOnlyPersonal?: boolean;
  includeOnlyLatest?: boolean;
  workflowId?: string;
}

export const workflowsApi = createApi({
  reducerPath: "workflowsApi",
  baseQuery: fetchBaseQueryWithAuthHandling,
  endpoints: (builder) => ({
    fetchWorkflows: builder.query<ChatbotsPage, FetchWorkflowsArgs>({
      query: (args) => {
        const params = new URLSearchParams();
        params.set("PageParams.PageNumber", (args.pageNumber || 1).toString());
        params.set("PageParams.PageSize", (args.pageSize || 10).toString());
        if (args.search) params.set("Search", args.search);
        if (args.includeOnlyPersonal !== undefined) {
          params.set("IncludeOnlyPersonal", String(args.includeOnlyPersonal));
          }
        if (args.includeOnlyLatest !== undefined) {
          params.set("IncludeOnlyLatest", String(args.includeOnlyLatest));
        }
        if (args.workflowId) params.set("WorkflowId", args.workflowId);
        return {
          url: `/chatbots${params ? "?" + params.toString() : ""}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLazyFetchWorkflowsQuery, useFetchWorkflowsQuery } =
  workflowsApi;

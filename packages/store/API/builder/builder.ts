import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWithAuthHandling } from "../baseQuery";
import type { 
  WorkflowResponse, 
  CreateChatbotRequest, 
  CreateChatbotResponse,
  CreateConversationRequest,
  CreateConversationResponse,
  SendMessageResponse
} from "./types";

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
    createChatbot: builder.mutation<CreateChatbotResponse, CreateChatbotRequest>({
      query: (body) => ({
        url: "/chatbots",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    createConversation: builder.mutation<CreateConversationResponse, CreateConversationRequest>({
      query: (body) => ({
        url: "/conversations",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    getConversation: builder.query<any, string>({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation<SendMessageResponse, { conversationId: string; body: SendMessageRequest }>({
      query: ({ conversationId, body }) => ({
        url: `/conversations/${conversationId}/messages`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
  }),
});

export const {
  useCreateWorkflowMutation,
  useUpdateWorkflowMutation,
  useDeleteWorkflowMutation,
  useGetWorkflowQuery,
  useCreateChatbotMutation,
  useCreateConversationMutation,
  useGetConversationQuery,
  useSendMessageMutation,
} = builderApi;

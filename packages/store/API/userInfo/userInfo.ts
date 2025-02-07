import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWithAuthHandling } from "../baseQuery";
import { setUser, removeUser } from "../../slices/User/slice";
import { User } from "../../slices/types";

interface ChatbotResponse {
  items: Chatbot[];
  totalCount: number;
}

interface Chatbot {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  ownerId: string;
  updatedAt: string;
  isPublic: boolean;
  avatarImage: string | null;
  visual: {
    data: {
      imageUrl: string;
      ui: any;
      content: {
        headerText: string;
        botMessageText: string;
        senderMessageText: string;
        inputPlaceholder: string;
      };
    };
  };
}

export const userInfoApi = createApi({
  reducerPath: "userInfoApi",
  baseQuery: fetchBaseQueryWithAuthHandling,
  endpoints: (builder) => ({
    fetchUserInfo: builder.query<User, void>({
      query: () => ({
        url: "/users/identity/manage/info",
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
    fetchChatbots: builder.query<ChatbotResponse, void>({
      query: () => ({
        url: "/chatbots?PageParams.PageNumber=1&PageParams.PageSize=20&IncludeOnlyLatest=true",
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyFetchUserInfoQuery, useFetchChatbotsQuery } = userInfoApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWithAuthHandling } from "../baseQuery";

interface ImageUploadResponse {
  id: string;
}

export interface ImageDetails {
  id: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  name: string;
  contentType: string;
  isProfilePicture: boolean;
}

interface PageParams {
  PageNumber: number;
  PageSize: number;
}

interface GetImagesParams {
  PageParams: PageParams;
  IncludeOnlyProfilePictures?: boolean;
  Search?: string;
}

interface PaginatedResponse<T> {
  page: {
    items: T[];
    totalCount: number;
  };
}

export const imageUploaderApi = createApi({
  reducerPath: "imageUploaderApi",
  baseQuery: fetchBaseQueryWithAuthHandling,
  endpoints: (builder) => ({
    uploadImage: builder.mutation<ImageUploadResponse, FormData>({
      query: (imageData) => ({
        url: "/images",
        method: "POST",
        body: imageData,
        headers: {
          Accept: "text/plain",
        },
      }),
    }),
    getImage: builder.query<ImageDetails, string>({
      query: (id) => `/images/${id}`,
    }),
    getImages: builder.query<PaginatedResponse<ImageDetails>, GetImagesParams>({
      query: (params) => ({
        url: "/images",
        params: {
          "PageParams.PageNumber": params.PageParams.PageNumber,
          "PageParams.PageSize": params.PageParams.PageSize,
          IncludeOnlyProfilePictures: params.IncludeOnlyProfilePictures,
          Search: params.Search,
        },
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
  useGetImageQuery,
  useLazyGetImageQuery,
  useLazyGetImagesQuery,
  useGetImagesQuery,
} = imageUploaderApi;

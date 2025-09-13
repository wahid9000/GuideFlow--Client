import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITour } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createTourType: builder.mutation({
        query: (tourTypeData) => ({
          url: "/tour/create-tour-type",
          method: "POST",
          data: tourTypeData,
        }),
        invalidatesTags: ["TOUR_TYPE"],
      }),
      createTour: builder.mutation({
        query: (tourData) => ({
          url: "/tour/create",
          method: "POST",
          data: tourData,
        }),
        invalidatesTags: ["TOUR"],
      }),
      getTourTypes: builder.query({
        query: () => ({
          url: "/tour/tour-types",
          method: "GET",
        }),
        providesTags: ["TOUR_TYPE"],
        transformResponse: (response) => response.data,
      }),
      getTours: builder.query<ITour[], unknown>({
        query: () => ({
          url: "/tour",
          method: "GET",
        }),
        providesTags: ["TOUR"],
        transformResponse: (response: IResponse<ITour[]>) => response.data,
      }),
      getSingleTour: builder.query<ITour[], unknown>({
        query: (slug) => ({
          url: `/tour/${slug}`,
          method: "GET",
        }),
        transformResponse: (response: IResponse<ITour[]>) => response.data,
      }),
      deleteTourType: builder.mutation({
        query: (tourTypeId) => ({
          url: `/tour/tour-types/${tourTypeId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TOUR_TYPE"],
      }),
      deleteTour: builder.mutation({
        query: (tourId) => ({
          url: `/tour/${tourId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TOUR"],
      }),
    };
  },
});

export const {
  useGetTourTypesQuery,
  useGetSingleTourQuery,
  useGetToursQuery,
  useCreateTourTypeMutation,
  useCreateTourMutation,
  useDeleteTourTypeMutation,
  useDeleteTourMutation,
} = tourApi;

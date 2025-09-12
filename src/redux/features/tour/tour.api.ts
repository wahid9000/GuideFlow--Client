import { baseApi } from "@/redux/baseApi";

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
      getTours: builder.query({
        query: () => ({
          url: "/tour",
          method: "GET",
        }),
        providesTags: ["TOUR"],
        transformResponse: (response) => response.data,
      }),
      deleteTourType: builder.mutation({
        query: (tourTypeId) => ({
          url: `/tour/tour-types/${tourTypeId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TOUR_TYPE"],
      }),
    };
  },
});

export const {
  useGetTourTypesQuery,
  useCreateTourTypeMutation,
  useCreateTourMutation,
  useDeleteTourTypeMutation,
} = tourApi;

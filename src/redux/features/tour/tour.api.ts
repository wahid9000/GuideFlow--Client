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
        invalidatesTags: ["TOUR"],
      }),
      getTourTypes: builder.query({
        query: () => ({
          url: "/tour/tour-types",
          method: "GET",
        }),
        providesTags: ["TOUR"],
        transformResponse: (response) => response.data,
      }),
    };
  },
});

export const { useGetTourTypesQuery, useCreateTourTypeMutation } = tourApi;

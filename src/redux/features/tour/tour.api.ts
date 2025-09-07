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
      }),
      getTourTypes: builder.query({
        query: () => ({
          url: "/tour/tour-types",
          method: "GET",
        }),
        transformResponse: (response) => response.data,
      }),
    };
  },
});

export const { useGetTourTypesQuery, useCreateTourTypeMutation } = tourApi;

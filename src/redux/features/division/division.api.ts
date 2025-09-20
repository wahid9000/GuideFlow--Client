import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createDivision: builder.mutation({
        query: (divisionData) => ({
          url: "/division/create",
          method: "POST",
          data: divisionData,
        }),
        invalidatesTags: ["DIVISION"],
      }),
      getDivisions: builder.query({
        query: (params) => ({
          url: "/division",
          method: "GET",
          params: params,
        }),
        providesTags: ["DIVISION"],
        transformResponse: (response) => response.data,
      }),
      deleteDivision: builder.mutation({
        query: (divisionId) => ({
          url: `/division/${divisionId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["DIVISION"],
      }),
    };
  },
});

export const {
  useGetDivisionsQuery,
  useCreateDivisionMutation,
  useDeleteDivisionMutation,
} = divisionApi;

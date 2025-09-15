import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createBooking: builder.mutation({
        query: (bookingData) => ({
          url: "/booking/create",
          method: "POST",
          data: bookingData,
        }),
        invalidatesTags: ["BOOKING"],
      }),

      //   getTourTypes: builder.query({
      //     query: () => ({
      //       url: "/tour/tour-types",
      //       method: "GET",
      //     }),
      //     providesTags: [" "],
      //     transformResponse: (response) => response.data,
      //   }),
    };
  },
});

export const { useCreateBookingMutation } = bookingApi;

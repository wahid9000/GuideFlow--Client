import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createBooking: builder.mutation({
        query: (bookingData) => {
          console.log("🚀 ~ bookingData:", bookingData);
          return {
            url: "/booking/create",
            method: "POST",
            data: bookingData,
          };
        },
        invalidatesTags: ["BOOKING"],
      }),
      getMyBookings: builder.query({
        query: (id) => ({
          url: `/my-bookings/${id}`,
          method: "GET",
        }),
        providesTags: ["BOOKING"],
        transformResponse: (response) => response.data,
      }),
    };
  },
});

export const { useCreateBookingMutation, useGetMyBookingsQuery} = bookingApi;

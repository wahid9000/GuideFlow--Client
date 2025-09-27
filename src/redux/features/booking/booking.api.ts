import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createBooking: builder.mutation({
        query: (bookingData) => {
    console.log("🚀 ~ bookingData:", bookingData)
    return ({
        url: "/booking/create",
        method: "POST",
        data: bookingData,
    });
},
        invalidatesTags: ["BOOKING"],
      }),
    };
  },
});

export const { useCreateBookingMutation } = bookingApi;

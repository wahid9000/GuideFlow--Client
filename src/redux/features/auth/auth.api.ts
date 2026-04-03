import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, ISendOTP, IVerifyOTP } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: (userInfo) => ({
          url: "/user/register",
          method: "POST",
          data: userInfo,
        }),
      }),
      login: builder.mutation<null, ILogin>({
        query: (authInfo) => ({
          url: "/auth/login",
          method: "POST",
          data: authInfo,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
        invalidatesTags: ["USER"],
      }),
      sendOTP: builder.mutation<IResponse<null>, ISendOTP>({
        query: (userInfo) => ({
          url: "/otp/send",
          method: "POST",
          data: userInfo,
        }),
      }),
      verifyOTP: builder.mutation<IResponse<null>, IVerifyOTP>({
        query: (userInfo) => ({
          url: "/otp/verify",
          method: "POST",
          data: userInfo,
        }),
      }),
      userInfo: builder.query({
        query: () => ({
          url: "/user/me",
          method: "GET",
        }),
        providesTags: ["USER"],
      }),
      updateUser: builder.mutation({
        query: ({ id, data }) => ({
          url: `/user/${id}`,
          method: "PATCH",
          data,
        }),
        invalidatesTags: ["USER"],
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useUserInfoQuery,
  useUpdateUserMutation,
} = authApi;

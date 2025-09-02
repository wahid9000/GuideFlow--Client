import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: (userInfo) => ({
          url: "/user/register",
          method: "POST",
          body: userInfo,
        }),
      }),
      login: builder.mutation({
        query: (authInfo) => ({
          url: "/auth/login",
          method: "POST",
          body: authInfo,
        }),
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation } = authApi;

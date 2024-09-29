import { IGenericResponse } from "./types";

import {
  LoginInput,
  RegisterInput,
  VerificationCodeInput,
} from "@/features/login";
import { ForgotPasswordInput } from "@/features/login/schemas/forgotPasswordSchema";
import { ResetPasswordInput } from "@/features/login/schemas/resetPasswordSchema";
import {
  deleteTokensFromSecureStore,
  saveTokensToSecureStore,
} from "@/redux/utilities/authTokens";
import { clearAccessToken, setAccessToken } from "../features/authSlice";
import { setUser } from "../features/userSlice";
import { resetStoreAction } from "../utilities/actions";
import { baseApi } from "./baseApi";

const injectedAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, RegisterInput>({
      query(data) {
        return {
          url: "auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<
      { access_token: string; refresh_token: string; status: string },
      LoginInput & { firebaseToken: string }
    >({
      query(data) {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { access_token, refresh_token },
          } = await queryFulfilled;

          dispatch(setAccessToken(access_token));
          saveTokensToSecureStore(access_token, refresh_token);
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      },
      invalidatesTags: ["User"],
    }),
    verifyEmail: builder.mutation<IGenericResponse, VerificationCodeInput>({
      query({ verificationCode }) {
        return {
          url: `auth/verifyEmail/${verificationCode}`,
          method: "GET",
        };
      },
    }),
    resendVerificationCode: builder.mutation<
      IGenericResponse,
      { email: string }
    >({
      query({ email }) {
        return {
          url: `auth/resendVerificationCode`,
          method: "POST",
          body: { email },
        };
      },
    }),
    forgotPassword: builder.mutation<IGenericResponse, ForgotPasswordInput>({
      query({ email }) {
        return {
          url: `auth/forgotPassword`,
          method: "POST",
          body: { email },
        };
      },
    }),
    resetPassword: builder.mutation<
      IGenericResponse,
      ResetPasswordInput & { resetToken: string }
    >({
      query({ resetToken, password, passwordConfirm }) {
        return {
          url: `auth/resetPassword/${resetToken}`,
          method: "PATCH",
          body: { password, passwordConfirm },
        };
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "auth/logout",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          deleteTokensFromSecureStore();
          dispatch(clearAccessToken());
          dispatch(setUser(null));
          dispatch(resetStoreAction());
        } catch (error) {}
      },
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useResendVerificationCodeMutation,
} = injectedAuthApi;

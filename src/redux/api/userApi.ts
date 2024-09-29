import { UpdateUserInput } from "@/features/profile/schemas/editProfileSchema";
import { setUser } from "../features/userSlice";
import { baseApi } from "./baseApi";
import { IUser } from "./types";

const injectedUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IUser, void>({
      query() {
        return {
          url: "users/me",
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<IUser, UpdateUserInput>({
      query({ params: { userId }, body }) {
        return {
          url: `users/${userId}`,
          method: "PATCH",
          body,
        };
      },
      transformResponse: (response: { data: { user: IUser } }) =>
        response.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    getUserById: builder.query<IUser, { userId: string }>({
      query({ userId }) {
        return {
          url: `users/${userId}`,
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery, useUpdateUserMutation, useGetUserByIdQuery } =
  injectedUserApi;

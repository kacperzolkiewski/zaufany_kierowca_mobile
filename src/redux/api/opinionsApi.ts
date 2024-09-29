import { baseApi } from "./baseApi";
import { IGenericResponse, IOpinion } from "./types";

const injectedOpinionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReceivedOpinions: builder.query<IOpinion[], void>({
      query() {
        return {
          url: "opinions/received",
        };
      },
      transformResponse: (result: { data: { opinions: IOpinion[] } }) =>
        result.data.opinions,
    }),
    getReceivedOpinionsByUserId: builder.query<IOpinion[], { userId: string }>({
      query({ userId }) {
        return {
          url: `opinions/received/${userId}`,
        };
      },
      transformResponse: (result: { data: { opinions: IOpinion[] } }) =>
        result.data.opinions,
    }),
    getGivedOpinions: builder.query<IOpinion[], void>({
      query() {
        return {
          url: "opinions/gived",
        };
      },
      transformResponse: (result: { data: { opinions: IOpinion[] } }) =>
        result.data.opinions,
    }),
    createOpinion: builder.mutation<
      IGenericResponse,
      { stars: number; receiverId: string; comment: string }
    >({
      query(data) {
        return {
          url: "opinions",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGivedOpinionsQuery,
  useGetReceivedOpinionsQuery,
  useGetReceivedOpinionsByUserIdQuery,
  useCreateOpinionMutation,
} = injectedOpinionsApi;

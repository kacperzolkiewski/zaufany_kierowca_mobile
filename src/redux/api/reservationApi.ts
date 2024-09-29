import { baseApi } from "./baseApi";
import { IGenericResponse, IReservation } from "./types";

const injectedReservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyReservations: builder.query<IReservation[], void>({
      query() {
        return {
          url: "reservations",
        };
      },
      transformResponse: (result: { data: { reservations: IReservation[] } }) =>
        result.data.reservations,
      providesTags: ["Reservation"],
    }),
    getMyHistoricalReservations: builder.query<IReservation[], void>({
      query() {
        return {
          url: "reservations/history",
        };
      },
      transformResponse: (result: { data: { reservations: IReservation[] } }) =>
        result.data.reservations,
    }),
    getReservationById: builder.query<IReservation, { reservationId: string }>({
      query({ reservationId }) {
        return {
          url: `reservations/${reservationId}`,
        };
      },
      transformResponse: (result: { data: { reservations: IReservation } }) =>
        result.data.reservations,
    }),
    createReservation: builder.mutation<IGenericResponse, { rideId: string }>({
      query(data) {
        return {
          url: "reservations",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Reservation", "Ride"],
    }),
    deleteReservation: builder.mutation<
      IGenericResponse,
      { reservationId: string; reason: string }
    >({
      query({ reservationId, reason }) {
        return {
          url: `reservations/${reservationId}?reason=${reason}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reservation", "Ride"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateReservationMutation,
  useGetMyReservationsQuery,
  useGetReservationByIdQuery,
  useDeleteReservationMutation,
  useGetMyHistoricalReservationsQuery,
} = injectedReservationApi;

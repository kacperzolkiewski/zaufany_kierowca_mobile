import { baseApi } from "./baseApi";
import { IGenericResponse, IRide, IUser, RidesInput } from "./types";

const injecterRideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyRides: builder.query<IRide[], void>({
      query() {
        return {
          url: "rides",
        };
      },
      transformResponse: (result: { data: { rides: IRide[] } }) =>
        result.data.rides,
      providesTags: ["Ride"],
    }),
    getMyHistoricalRides: builder.query<IRide[], void>({
      query() {
        return {
          url: "rides/history",
        };
      },
      transformResponse: (result: { data: { rides: IRide[] } }) =>
        result.data.rides,
    }),
    getRideById: builder.query<IRide, { rideId: string }>({
      query({ rideId }) {
        return {
          url: `rides/${rideId}`,
        };
      },
      transformResponse: (result: { data: { ride: IRide } }) =>
        result.data.ride,
    }),
    getRidePassengers: builder.query<IUser[], { rideId: string }>({
      query({ rideId }) {
        return {
          url: `rides/${rideId}/passengers`,
        };
      },
      transformResponse: (result: { data: { passengers: IUser[] } }) =>
        result.data.passengers,
    }),
    createRide: builder.mutation<IGenericResponse, RidesInput>({
      query(data) {
        return {
          url: "rides",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Ride"],
    }),
    searchRidesByAdress: builder.query<
      IRide[],
      { origin: string; destination: string; startTime: string }
    >({
      query({ origin, destination, startTime }) {
        const encodeStartTime = encodeURIComponent(startTime);
        const encodeOrigin = encodeURIComponent(origin);
        const encodeDestination = encodeURIComponent(destination);

        return {
          url: `rides/search?origin=${encodeOrigin}&destination=${encodeDestination}&startTime=${encodeStartTime}`,
        };
      },
      transformResponse: (result: { data: { rides: IRide[] } }) =>
        result.data.rides,
    }),
    deleteRide: builder.mutation<
      IGenericResponse,
      { rideId: string; reason: string }
    >({
      query({ rideId, reason }) {
        return {
          url: `rides/${rideId}?reason=${reason}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Ride"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyRidesQuery,
  useCreateRideMutation,
  useGetRideByIdQuery,
  useGetMyHistoricalRidesQuery,
  useSearchRidesByAdressQuery,
  useDeleteRideMutation,
  useGetRidePassengersQuery,
} = injecterRideApi;

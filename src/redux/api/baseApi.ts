import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "../utilities/customBaseFetch";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: customFetchBase,
  tagTypes: ["Reservation", "Ride", "Opinion", "User"],
  endpoints: () => ({}),
});

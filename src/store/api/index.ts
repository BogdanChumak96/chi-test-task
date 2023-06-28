import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://myfakeapi.com/api" }),
  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => ({ url: "/cars" }),
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;

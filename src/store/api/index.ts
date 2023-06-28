import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://myfakeapi.com/api/",
});

export const carsApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => ({ url: "cars/" }),
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;

import { ICar } from "../../types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://myfakeapi.com/api/",
});

interface GetCarsResponse {
  cars: ICar[];
}

export const carsApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getCars: builder.query<GetCarsResponse, void>({
      query: () => ({ url: "cars/" }),
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;

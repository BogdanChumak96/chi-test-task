import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzIiwicGFzc3dvcmQiOiIxMjMiLCJ3ZWJzaXRlIjoid3d3Lm15ZmFrZWFwaS5jb20iLCJpYXQiOjE1NzM1NDMzNjcsImV4cCI6MTU3MzU0NTE2N30.95fFJcUIOsTVLrTNxSVdk4loPQnwWx9tBGJIb19o65";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://myfakeapi.com/api/",
   prepareHeaders: (headers) => {
     headers.set("Authorization", `Bearer ${token}`);
     return headers;
   },
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

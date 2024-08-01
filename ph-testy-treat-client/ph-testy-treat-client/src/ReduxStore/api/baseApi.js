import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";

const baseApi = createApi({
  reducerPath: "foodAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASEURL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("ph-test-treat-token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Coin", "Recipe", "Stats", "Like"],
  endpoints: (builder) => ({}),
});

export default baseApi;

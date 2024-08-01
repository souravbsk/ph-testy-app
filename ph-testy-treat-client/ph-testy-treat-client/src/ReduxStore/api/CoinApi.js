import baseApi from "./baseApi";
const CoinApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoin: builder.mutation({
      query: (email) => ({
        url: `/api/coin/${email}`,
        method: "GET",
      }),
      providesTags: ["Coin"],
    }),
    updateCoin: builder.mutation({
      query: ({ updateCoinData, email }) => ({
        url: `/api/coin?email=${email}`,
        method: "PUT",
        body: updateCoinData,
      }),
      invalidatesTags: ["Coin"],
    }),
    // deleteSubCategory: builder.mutation({
    //   query: (categoryId) => ({
    //     url: `/api/product/subcategory/${categoryId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["ProductCategory"],
    // }),

    // getAllSubCategoryById: builder.mutation({
    //   query: (categoryId) => ({
    //     url: `/api/product/subcategory/${categoryId}`,
    //     method: "GET",
    //   }),
    //   invalidatesTags: ["ProductCategory"],
    // }),
  }),
});

export const { useGetAllCoinMutation, useUpdateCoinMutation } = CoinApi;

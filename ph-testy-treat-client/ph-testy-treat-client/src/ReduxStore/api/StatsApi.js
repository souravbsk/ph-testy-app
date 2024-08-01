import baseApi from "./baseApi";
const StatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSate: builder.query({
      query: () => ({
        url: `/api/stats`,
        method: "GET",
      }),
      providesTags: ["Stats", "Recipe"],
    }),
    // updateSubCategory: builder.mutation({
    //   query: ({ updateSubCategoryData, categoryId }) => ({
    //     url: `/api/product/subcategory/${categoryId}`,
    //     method: "PUT",
    //     body: updateSubCategoryData,
    //   }),
    //   invalidatesTags: ["ProductCategory"],
    // }),
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

export const { useGetAllSateQuery } = StatsApi;

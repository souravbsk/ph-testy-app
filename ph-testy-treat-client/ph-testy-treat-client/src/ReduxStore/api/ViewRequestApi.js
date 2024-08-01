import baseApi from "./baseApi";
const ViewRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateRecipe: builder.mutation({
      query: ({ updateRecipeData, recipeId }) => ({
        url: `/api/view-request/${recipeId}`,
        method: "PUT",
        body: updateRecipeData,
      }),
      invalidatesTags: ["Coin", "Recipe"],
    }),
    likeRecipe: builder.mutation({
      query: ({ updateRecipeData, recipeId }) => ({
        url: `/api/recipe-like/${recipeId}`,
        method: "PUT",
        body: updateRecipeData,
      }),
      invalidatesTags: ["Like"],
    }),
    getAllCountryCategory: builder.query({
      query: () => ({
        url: `/api/country`,
        method: "GET",
      }),
      providesTags: ["Recipe"],
    }),
  }),
});

export const {
  useUpdateRecipeMutation,
  useLikeRecipeMutation,
  useGetAllCountryCategoryQuery,
} = ViewRequestApi;

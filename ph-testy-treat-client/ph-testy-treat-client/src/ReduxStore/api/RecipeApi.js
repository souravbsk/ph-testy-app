import baseApi from "./baseApi";
const RecipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewRecipe: builder.mutation({
      query: (recipeData) => ({
        url: `/api/recipe/create`,
        method: "POST",
        body: recipeData,
      }),
      invalidatesTags: ["Recipe", "Coin"],
    }),
    getAllRecipes: builder.query({
      query: () => ({
        url: `/api/recipes`,
        method: "GET",
      }),
      providesTags: ["Recipe", "Like"],
    }),
    getRecipeById: builder.mutation({
      query: (id) => ({
        url: `/api/recipe/${id}`,
        method: "GET",
      }),
      providesTags: ["Recipe", "Like"],
    }),

    getAllRecipeByEmail: builder.mutation({
      query: (email) => ({
        url: `/api/recipes/${email}`,
        method: "GET",
      }),
      invalidatesTags: ["Recipe"],
    }),
    deleteRecipeById: builder.mutation({
      query: (id) => ({
        url: `/api/recipe/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useAddNewRecipeMutation,
  useGetAllRecipesQuery,
  useGetRecipeByIdMutation,
  useGetAllRecipeByEmailMutation,
  useDeleteRecipeByIdMutation,
} = RecipeApi;

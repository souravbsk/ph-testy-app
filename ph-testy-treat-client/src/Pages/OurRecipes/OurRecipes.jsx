import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { ScrollRestoration } from "react-router-dom";
import { useGetAllRecipesQuery } from "../../ReduxStore/api/RecipeApi";
import Button from "../../components/Button/Button";

const OurRecipes = () => {
  const { data, isLoading, isError, error } = useGetAllRecipesQuery();

  console.log(data);
  return (
    <div className="container mt-12 md:mt-20">
      <div className="text-center">
        <h2 className="text-gray-900 text-2xl md:text-4xl font-bold ">
          Our Recipes
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-6 gap-4 mt-8">
        {data?.data?.slice(0, 6)?.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>
        ))}
      </div>
      <div className="text-center">
        <Button to="/recipes" className="mt-12 text-center">
          See More Recipe
        </Button>
      </div>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default OurRecipes;

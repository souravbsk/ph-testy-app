import React, { useState, useEffect, useRef } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import TitleSection from "../../components/TitleSection/TitleSection";
import { useGetAllRecipesQuery } from "../../ReduxStore/api/RecipeApi";
import RecipeFilter from "./RecipeFilter";
import { ScrollRestoration } from "react-router-dom";

const Recipes = () => {
  const { data, isLoading } = useGetAllRecipesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleRecipes, setVisibleRecipes] = useState(5);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 200;
      if (bottom) {
        setVisibleRecipes((prevVisibleRecipes) => prevVisibleRecipes + 3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCountryChange = (e) => setSelectedCountry(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const filteredRecipes = data?.data?.filter((recipe) => {
    return (
      (selectedCountry === "" || recipe.country === selectedCountry) &&
      (selectedCategory === "" || recipe.category === selectedCategory) &&
      (searchTerm === "" ||
        recipe.recipe_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
    );
  });

  const visibleRecipesList = filteredRecipes?.slice(0, visibleRecipes);

  return (
    <div className="thingIntro-BG bg-top bg-contain bg-no-repeat ">
      <div className="pt-20 container" ref={containerRef}>
        <div className="text-center">
          <TitleSection>Our Recipes</TitleSection>
        </div>
        <RecipeFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="grid md:grid-cols-3 gap-12 mt-8">
          {visibleRecipesList?.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default Recipes;

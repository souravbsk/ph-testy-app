import React from "react";
import TitleSection from "../../components/TitleSection/TitleSection";
import RecipeList from "./RecipeList";

const MyRecipe = () => {
  return (
    <div className="container">
      <div className="mt-20">
        <TitleSection className="text-center">My Recipe List</TitleSection>
      </div>
      <div>
        <RecipeList></RecipeList>
      </div>
    </div>
  );
};

export default MyRecipe;

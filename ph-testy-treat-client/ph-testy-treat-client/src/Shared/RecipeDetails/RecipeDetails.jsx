import React, { useContext, useEffect } from "react";
import RecipeVideo from "./RecipeVideo";
import TitleSection from "../../components/TitleSection/TitleSection";
import { ScrollRestoration, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useGetRecipeByIdMutation } from "../../ReduxStore/api/RecipeApi";
import Loading from "../../components/Loading/Loading";
import { FaEye } from "react-icons/fa";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeLike from "../../components/RecipeLike/RecipeLike";
import RecipeSuggestion from "./RecipeSuggestion";

const RecipeDetails = () => {
  let { id } = useParams();

  const [getRecipeData, { data, isLoading, isError, error }] =
    useGetRecipeByIdMutation();
  const { user, loader } = useContext(AuthContext);

  useEffect(() => {
    getRecipeData(id);
  }, [id, user, getRecipeData]);
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="hingIntro-BG bg-top bg-contain bg-no-repeat">
      <div className="container pt-20">
        <div className="card !items-start lg:card-side bg-base-100 shadow-xl">
          <figure className="flex-1">
            <img 
            className="h-full"
              src={
                data?.data?.recipe?.imageCloud === false
                  ? `${import.meta.env.VITE_BASEURL}/${data?.data?.recipe?.recipe_image}`
                  : data?.data?.recipe?.recipe_image
              }
              alt={data?.data?.recipe?.recipe_name}
            />
          </figure>
          <div className="card-body flex-1">
            <h2 className="card-title">{data?.data?.recipe?.recipe_name}</h2>
            <div>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {data?.data?.recipe?.category}
              </p>
              <p>
                <span className="font-semibold">purchase:</span>{" "}
                {data?.data?.recipe?.purChased_by?.length}
              </p>
              <p>
                <span className="font-semibold">Country:</span>{" "}
                {data?.data?.recipe?.country}
              </p>
            </div>
            <p>{data?.data?.recipe?.recipe_details}</p>
            <div className="card-actions h-full mt-auto justify-end">
              <div className="flex items-center gap-3 justify-between">
                <p>
                  <small className="font-semibold">Author:</small>{" "}
                  <small>{data?.data?.recipe?.creator_Email}</small>
                </p>
                <p className="flex  items-center justify-end gap-1">
                  <span className="font-semibold items-center">
                    <FaEye />
                  </span>{" "}
                  <small> {data?.data?.recipe?.watchCount}</small>
                </p>
                <RecipeLike
                  user={user}
                  liked_by={data?.data?.recipe?.liked_by}
                  id={data?.data?.recipe?._id}
                ></RecipeLike>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <TitleSection className="text-center mb-8">
            {" "}
            Recipes Video
          </TitleSection>
          <RecipeVideo
            youtubeCode={data?.data?.recipe?.embedded_code}
          ></RecipeVideo>
        </div>
      </div>
      <div className=" container mt-12">
        {data?.data?.suggestions?.length > 0 && (
          <TitleSection className="mb-6 text-center">
            Suggest Recipes
          </TitleSection>
        )}

        <RecipeSuggestion suggestRecipe={data?.data?.suggestions}></RecipeSuggestion>
      </div>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default RecipeDetails;

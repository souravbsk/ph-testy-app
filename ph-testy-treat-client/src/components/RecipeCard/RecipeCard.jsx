import React, { useContext } from "react";
import Button from "../Button/Button";
import moment from "moment";
import { FaEye, FaUser } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useUpdateRecipeMutation } from "../../ReduxStore/api/ViewRequestApi";
import RecipeLike from "../RecipeLike/RecipeLike";
import { setReFetch } from "../../ReduxStore/slices/coinSlice";

const RecipeCard = ({ recipe, isSuggestion }) => {
  const { user, loader } = useContext(AuthContext);
  const navigate = useNavigate();
  const [updateRecipe, { data, isLoading, isError, error }] =
    useUpdateRecipeMutation();
  const dispatch = useDispatch();

  const { coin, isCoinRefetch } = useSelector((state) => state.coin);

  const existUser = recipe?.purChased_by?.includes(user?.email);

  console.log(coin);
  const handleViewRecipe = async () => {
    if (!user) {
      toast.warn("Please Login First", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else if (user.email === recipe.creator_Email) {
      navigate(`/recipe/${recipe._id}`); // Redirect to the recipe detail page
    } else if (coin < 10) {
      Swal.fire({
        title: "You don't have enough coins.",
        text: "Please purchase more coins.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, purchase coin!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/parches-coin");
        }
      });
    } else if (existUser) {
      navigate(`/recipe/${recipe._id}`); // Redirect to the recipe detail page
    } else if (user && user?.email !== recipe?.creator_Email && coin >= 10) {
      Swal.fire({
        title: "Are you sure?",
        text: "Spending 10 coins for View Details",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F97316",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, View it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const userData = {
            email: user?.email,
            creator_Email: recipe?.creator_Email,
          };

          updateRecipe({
            updateRecipeData: userData,
            recipeId: recipe._id,
          }).then((res) => {
            console.log(res);
            if (res?.data?.isAlreadyPurchased) {
              dispatch(setReFetch(!isCoinRefetch));

              navigate(`/recipe/${recipe._id}`); // Redirect to the recipe detail page
            } else if (res?.data?.success && res?.data?.isNewPurchased) {
              dispatch(setReFetch(!isCoinRefetch));

              navigate(`/recipe/${recipe._id}`); // Redirect to the recipe detail page
            }
          });
        }
      });
    }
  };

  console.log(recipe);
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={recipe?.recipe_image}
          alt={recipe?.recipe_name}
          className="rounded-xl md:h-52 w-full object-cover"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-lg">{recipe?.recipe_name}</h2>
        <p>
          <span className="font-semibold">Category:</span> {recipe?.category}
        </p>
        {isSuggestion || (
          <>
            <p>
              <span className="font-semibold">total purchase:</span>{" "}
              {recipe?.purChased_by?.length}
            </p>
          </>
        )}
        <p>
          <span className="font-semibold">Country:</span> {recipe?.country}
        </p>
        <div className="card-actions mt-3">
          <button
            onClick={handleViewRecipe}
            className={`btn primary-btn duration-500 hover:text-[#111827]`}
          >
            View The Recipe
          </button>
        </div>
        <div className="flex items-center gap-3 justify-between">
          <p className="flex  items-center gap-1">
            <span className="font-semibold items-center">
              <FaUser />
            </span>
            <small>{recipe?.creator_Email?.split("@")[0]}</small>
          </p>
          <p className="flex  items-center justify-end gap-1">
            <span className="font-semibold items-center">
              <FaEye />
            </span>{" "}
            <small> {recipe?.watchCount}</small>
          </p>
          <RecipeLike
            liked_by={recipe?.liked_by}
            user={user}
            id={recipe?._id}
          ></RecipeLike>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

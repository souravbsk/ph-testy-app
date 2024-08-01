import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useLikeRecipeMutation } from "../../ReduxStore/api/ViewRequestApi";
import { Bounce, toast } from "react-toastify";

const RecipeLike = ({ user, id, liked_by }) => {
  const [isLike, setIsLike] = useState(false);
  const [addLike, { data, isLoading, isError, error }] =
    useLikeRecipeMutation();

  useEffect(() => {
    const existUser = liked_by?.includes(user?.email);
    if (existUser) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [user, id, liked_by]);

  const handleRecipeLike = async () => {
    if (user) {
      const recipeData = {
        email: user?.email,
      };
      addLike({ updateRecipeData: recipeData, recipeId: id }).then((res) => {
        console.log(res);
        if (res?.data?.isLiked) {
          setIsLike(true)
          toast(`👍 ${res?.data?.message} `, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        } else if (res?.data?.isUnLiked) {
          setIsLike(false)

          toast(`👎🏻 ${res?.data?.message} `, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      });
    } else {
      
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
    }
  };
  return (
    <button className="flex items-center gap-1" onClick={handleRecipeLike}>
      {isLike ? <AiFillLike /> : <AiOutlineLike />}
      <span>{liked_by?.length}</span>
    </button>
  );
};

export default RecipeLike;

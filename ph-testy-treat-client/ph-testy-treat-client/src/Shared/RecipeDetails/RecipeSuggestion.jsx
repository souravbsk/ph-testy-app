import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
const RecipeSuggestion = ({ suggestRecipe }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      className="mySwiper"
    >
      {suggestRecipe?.map((recipe) => (
        <SwiperSlide>
          <RecipeCard
            isSuggestion={true}
            recipe={recipe}
            key={recipe?._id}
          ></RecipeCard>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecipeSuggestion;

import React from "react";

const RecipeVideo = ({ youtubeCode }) => {
  return (
    <iframe
      className=" card md:h-96 h-60 w-full lg:w-8/12 mx-auto"
      src={`https://www.youtube.com/embed/${youtubeCode}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default RecipeVideo;

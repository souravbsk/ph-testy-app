import React from "react";

const Loading = () => {
  return (
    <div className="h-96 mt-12 md:mt-32 flex items-center justify-center">
      <h1 className="flex text-5xl md:text-8xl items-end gap-2">
        L
        <div className="rounded-full border-8 border-dashed animate-spin border-orange-500 h-8 md:h-12 w-8 md:w-12 "></div>
        ading
      </h1>
    </div>
  );
};

export default Loading;

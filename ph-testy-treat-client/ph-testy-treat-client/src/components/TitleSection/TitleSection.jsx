import React from "react";

const TitleSection = ({ children, className }) => {
  return (
    <h2
      className={`text-[#111827] text-2xl md:text-4xl font-bold ${className}`}
    >
      {children}
    </h2>
  );
};

export default TitleSection;

import React from "react";
import CountUp from "react-countup";

const CountUpIconBox = ({ end, icon, className }) => {
  return (
    <div
      className={`text-center glass border  py-10 px-3   rounded-md duration-500 hover:shadow-xl ${className}`}
    >
      <CountUp
        className="text-6xl  font-bold  text-[#111827]"
        duration={2.75}
        end={end}
      />
      <div className="mt-2">
        <button className="text-[#F97316] text-6xl">{icon}</button>
      </div>
    </div>
  );
};

export default CountUpIconBox;

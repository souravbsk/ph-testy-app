import React from "react";
import { FaEye, FaUsers } from "react-icons/fa";
import CountUpIconBox from "../../../components/CountUpIconBox/CountUpIconBox";
import { useGetAllSateQuery } from "../../../ReduxStore/api/StatsApi";
import { FaBowlFood } from "react-icons/fa6";
const CountUpSection = () => {
  const { data, isLoading, isError, error } = useGetAllSateQuery();
  return (
    <div className="">
      <div className="container grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-12 gap-6 my-28 ">
        <CountUpIconBox
          className="thingIntro-BG bg-contain bg-no-repeat py-12"
          icon={<FaUsers />}
          end={data?.success ? data?.data?.userCount : 0}
        ></CountUpIconBox>
        <CountUpIconBox
          className="thingIntro-BG bg-contain bg-no-repeat py-12"
          icon={<FaBowlFood />}
          end={data?.success ? data?.data?.recipeCount : 0}
        ></CountUpIconBox>
        <CountUpIconBox
          className="thingIntro-BG bg-contain bg-no-repeat py-12"
          icon={<FaEye />}
          end={data?.success ? data?.data?.totalWatchCount : 0}
        ></CountUpIconBox>
      </div>
    </div>
  );
};

export default CountUpSection;

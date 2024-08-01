import React from "react";
import TitleSection from "../../components/TitleSection/TitleSection";
import { FaCoins } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import Button from "../../components/Button/Button";
import { BsCoin } from "react-icons/bs";
import CoinCard from "../../components/CoinCard/CoinCard";
import { ScrollRestoration } from "react-router-dom";

const ParchesCoin = () => {
  return (
    <div className="thingIntro-BG bg-no-repeat bg-top bg-cover">
      <div className="pt-20 container">
        <div>
          <TitleSection className="text-center mb-12">ParchesCoin</TitleSection>
        </div>
        <div className=" container grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 lg:gap-14 gap-8 ">
          <CoinCard coin={100} dollar={1}></CoinCard>
          <CoinCard coin={500} dollar={5}></CoinCard>
          <CoinCard coin={1000} dollar={10}></CoinCard>
        </div>
      </div>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default ParchesCoin;

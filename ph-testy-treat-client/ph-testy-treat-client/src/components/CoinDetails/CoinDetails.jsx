import React, { useEffect, useState } from "react";
import { BsCoin } from "react-icons/bs";
import { useGetAllCoinMutation } from "../../ReduxStore/api/CoinApi";
import { useDispatch, useSelector } from "react-redux";
import { setCoin } from "../../ReduxStore/slices/coinSlice";

const CoinDetails = ({ user }) => {
  const [getCoin, { data, isLoading, isError, error }] =
    useGetAllCoinMutation();
  const dispatch = useDispatch();
  const { isCoinRefetch } = useSelector((state) => state.coin);

  useEffect(() => {
    if (user) {
      const handleGetCoin = async () => {
        await getCoin(user?.email);
      };
      handleGetCoin();
    }
  }, [user, getCoin, isCoinRefetch]);
  useEffect(() => {
    if (data?.success) {
      dispatch(setCoin(data?.coin));
    }
  }, [data, user]);
  return (
    <li>
      <div className="bg-gray-300 flex items-center gap-4 px-1 py-1 rounded-full">
        <button className="text-2xl text-[#F97316]">
          <BsCoin />
        </button>
        <span className="px-2 font-bold text-xl">
          {data?.success ? data?.coin : 0}
        </span>
      </div>
    </li>
  );
};

export default CoinDetails;

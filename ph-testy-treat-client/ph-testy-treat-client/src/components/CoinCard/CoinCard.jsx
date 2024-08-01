import React, { useContext } from "react";
import { BsCoin } from "react-icons/bs";
import Button from "../Button/Button";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useUpdateCoinMutation } from "../../ReduxStore/api/CoinApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReFetch } from "../../ReduxStore/slices/coinSlice";

const CoinCard = ({ coin, dollar }) => {
  const { user, loader } = useContext(AuthContext);
  const [parchesCoin, { data, isLoading, isError, error }] =
    useUpdateCoinMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const dispatch = useDispatch();

  const { isCoinRefetch } = useSelector((state) => state.coin);

  const handleParchesCoin = async () => {
    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: `Buying ${coin} coins by  spending ${dollar} dollar`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#111827",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const coinData = {
            coin,
            dollar,
          };
          parchesCoin({ updateCoinData: coinData, email: user?.email }).then(
            (res) => {
              if (res?.data?.data?.modifiedCount > 0) {
                dispatch(setReFetch(!isCoinRefetch));

                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `Successfully Parches ${coin} Coin`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from, { replace: true });
              }
            }
          );
        }
      });
    }
  };
  return (
    <div className="card border-2 border-[#111827] bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <button className="text-5xl flex items-center justify-center text-[#F97316]">
          <BsCoin />
        </button>
        <h2 className="card-title font-bold text-[#111827]">
          <span className=" text-3xl text-[#F97316]">{coin}</span>{" "}
          <small>/coins</small>
        </h2>
        <p className="font-semibold">Spending {dollar} dollar</p>
        <div className="card-actions">
          <Button onClick={handleParchesCoin}>Parches Now</Button>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;

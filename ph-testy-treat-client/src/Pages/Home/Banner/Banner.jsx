import React, { useContext } from "react";
import Button from "../../../components/Button/Button";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReFetch } from "../../../ReduxStore/slices/coinSlice";

const Banner = () => {
  const { user, GoogleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isCoinRefetch } = useSelector((state) => state.coin);
  const handleWithGoogleSignIn = async () => {
    try {
      const res = await GoogleSignIn();
      const currentUser = res.user;

      const response = await axios.post(
        "http://localhost:3000/api/user",
        currentUser
      );

      console.log(response);
      if (response?.data?.success) {
        navigate("/add-recipe");
        dispatch(setReFetch(!isCoinRefetch));

        toast.success(
          `Hey, ${currentUser.displayName}, welcome to Testy Food!`
        );
      }
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.");
      console.error("Google Sign In Error:", error.message);
    }
  };
  return (
    <div className="banner-img md:h-screen flex items-center bg-cover py-14 md:pt-20 w-full bg-center bg-no-repeat">
      <div className="container flex flex-col md:flex-row">
        <div className="flex-1 space-y-6">
          <h1 className="text-white text-3xl md:text-7xl font-extrabold">
            EnJoy Cooking
          </h1>
          <p className="text-white">
            Discover the delicious and diverse flavors of Bengali cuisine at our
            restaurant! With an emphasis on seafood, rice, and vegetables,
            Bengali food is a fusion of flavors and spices that create unique
            and unforgettable dishes. From spicy fish curries to sweet desserts
            like rasgulla, our menu has something for everyone.
          </p>
          <div className="flex items-center gap-3">
            <Button
              to="/recipes"
              className="btn primary-btn hover:text-[#111827]"
            >
              See recipes
            </Button>
            {user ? (
              <Button
                to="/add-recipe"
                className="btn primary-btn hover:text-[#111827]"
              >
                Add recipes
              </Button>
            ) : (
              <Button
                onClick={handleWithGoogleSignIn}
                className="btn primary-btn hover:text-[#111827]"
              >
                Add recipes
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Banner;

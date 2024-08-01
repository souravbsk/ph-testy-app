import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setReFetch } from "../../ReduxStore/slices/coinSlice";

const SocialLogin = () => {
  const { GoogleSignIn } = useContext(AuthContext);
  const dispatch = useDispatch();

  const { isCoinRefetch } = useSelector((state) => state.coin);
  const handleWithGoogleSignIn = async () => {
    try {
      const res = await GoogleSignIn();
      const currentUser = res.user;

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/user`,
        currentUser
      );

      if (response?.data?.success) {
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
    <button
      onClick={handleWithGoogleSignIn}
      className="  border-2 p-2 rounded-full"
    >
      <FcGoogle className="text-xl"></FcGoogle>
    </button>
  );
};

export default SocialLogin;

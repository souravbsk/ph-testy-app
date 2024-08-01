/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Utils/firebase.init";
import axios from "axios";
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  //getUser
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser && currentUser?.email){
        axios.post(`${import.meta.env.VITE_BASEURL}/jwt`,{email: currentUser?.email})
        .then((data) => {
          const token = data.data.token;
          localStorage.setItem("ph-test-treat-token", token);
          setLoader(false);
        });
      }
      else{
        localStorage.removeItem("ph-test-treat-token");
        setLoader(false);
      }
    });
    return () => unSubscribe();
  }, []);

  //sign in with google
  const GoogleSignIn = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  // sign in with github

  //signOut
  const logOutUser = () => {
    return signOut(auth);
  };
  const authInfo = {
    user,
    logOutUser,
    GoogleSignIn,
    loader,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Header/Footer/Footer";
import Loading from "../components/Loading/Loading";

const Main = () => {
  const navigation = useNavigation();
  return (
    <div>
      <Header></Header>
      {navigation.state === "loading" ? <Loading></Loading> : <Outlet></Outlet>}
      <Footer></Footer>
    </div>
  );
};

export default Main;

import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { BsCoin } from "react-icons/bs";
import { toast } from "react-toastify";
import HeaderAvatar from "../../components/HeaderAvatar/HeaderAvatar";
import CoinDetails from "../../components/CoinDetails/CoinDetails";
const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const displayName = user?.displayName;
  const [isOpen, setOpen] = useState(false);
  const handleLogout = () => {
    toast.success("log out success");
    logOutUser();
  };

  return (
    <div className="bg-gray-900  right-0 left-0 top-0">
      <nav className=" container flex flex-col md:flex-row py-4 md:items-center justify-between">
        <div className="flex items-center justify-between">
          <Link>
            <h2 className="md:text-3xl text-2xl lg:text-4xl font-extrabold text-white font-mono">
              Testy Re<span className="text-orange-500">ci</span>pe
            </h2>
          </Link>
          <div className="flex items-center gap-2 md:hidden">
            {user && (
              <HeaderAvatar
                displayName={displayName}
                user={user}
              ></HeaderAvatar>
            )}
            <button
              onClick={() => setOpen(!isOpen)}
              className="text-orange-500 border-2 "
            >
              <Hamburger></Hamburger>
            </button>
          </div>
        </div>
        <ul
          className={`flex flex-col z-50 md:flex-row absolute md:static items-center gap-4 md:h-auto h-screen md:bg-transparent bg-gray-900 duration-300 top-20 px-11 ${
            isOpen ? "left-0" : "-left-60"
          }`}
        >
          <li className="lg:px-3 lg:py-3 md:px-1 p-2">
            <NavLink
              to="/"
              className="lg:text-xl md:text-lg text-base text-white font-medium"
            >
              Home
            </NavLink>
          </li>
          <li className="lg:px-3 lg:py-3 md:px-1 p-2">
            <NavLink
              to="/recipes"
              className="lg:text-xl md:text-lg text-base text-white font-medium"
            >
              Recipes
            </NavLink>
          </li>

          {user && (
            <>
              <li className="lg:px-3 md:flex-shrink-0 lg:py-3 md:px-1 p-2">
                <NavLink
                  to="/add-recipe"
                  className="lg:text-xl md:text-lg text-base text-white font-medium"
                >
                  Add recipe
                </NavLink>
              </li>
              <CoinDetails user={user}></CoinDetails>
              <li className="hidden md:block">
                <HeaderAvatar
                  displayName={displayName}
                  user={user}
                ></HeaderAvatar>
              </li>
            </>
          )}

          <li className="lg:px-3 md:flex-shrink-0 lg:py-3 md:px-1 p-2">
            {user ? (
              <button onClick={handleLogout} className="btn primary-btn">
                Log Out
              </button>
            ) : (
              <SocialLogin />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

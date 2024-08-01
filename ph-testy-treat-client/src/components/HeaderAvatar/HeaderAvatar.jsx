import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeaderAvatar = ({ user, displayName }) => {
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user) {
      setAvatar(user?.photoURL);
    }
  }, [user]);
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          {user?.photoURL ? (
            <img
              title={displayName}
              className="w-12 h-12 rounded-full"
              src={avatar}
              alt=""
            />
          ) : (
            <span className="text-white">{displayName}</span>
          )}
        </div>
      </div>
      {user && (
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to="/my-recipes" className="justify-between">
              My Recipe
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HeaderAvatar;

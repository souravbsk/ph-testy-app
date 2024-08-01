import React from "react";
import { FaSadCry } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="text-center space-y-2">
        <h2>Not Found</h2>
        <button>
          <FaSadCry></FaSadCry>
        </button>
        <Link className="btn primary-btn hover:text-[#111827]" to="/">
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

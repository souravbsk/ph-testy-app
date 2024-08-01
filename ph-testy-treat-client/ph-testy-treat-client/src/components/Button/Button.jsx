import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, children, className, onClick }) => {
  const button = (
    <button
      onClick={onClick}
      className={`btn primary-btn duration-500 hover:text-[#111827] ${className}`}
    >
      {children}
    </button>
  );

  return to ? <Link to={to}>{button}</Link> : button;
};

export default Button;

import React from "react";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaMailBulk,
  FaMapMarkedAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" pt-12 md:pt-20 bg-gray-900 mt-12 md:mt-20">
      <div className="container pb-8 gap-8 flex-col lg:flex-row flex justify-between">
        <div>
          <h2 className="text-white mb-5 font-bold text-5xl">Testy Recipe</h2>
          <ul className="text-white space-y-2">
            <li className="flex items-center gap-2">
              <FaMailBulk></FaMailBulk>
              <Link to="mailto:souravbsk01@gmail.com">
                souravbsk01@gmail.com
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone></FaPhone>
              <Link to="tel:+8801629351823">+8801629351823</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkedAlt></FaMapMarkedAlt>
              <Link to="#">32, new polly kishoreganj, Dhaka</Link>
            </li>
          </ul>
        </div>
        <div className="text-white">
          <h2 className="text-xl font-semibold mb-5">Nav Links</h2>
          <ul className="space-y-3">
            <li>
              <NavLink className="font-medium" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="font-medium" to="/about">
                Recipes
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="text-white">
          <h2 className="text-xl font-semibold mb-5">Opening Hours</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center gap-3">
              <div className="me-auto">
                <h3 className="text-right">Saturday</h3>
              </div>{" "}
              <span>9:00 - 6:00</span>
            </li>
            <li className="flex justify-between items-center gap-3">
              <div className="me-auto">
                <h3 className="text-right">Sunday</h3>
              </div>{" "}
              <span>9:00 - 6:00</span>
            </li>
            <li className="flex justify-between items-center gap-3">
              <div className="me-auto">
                <h3 className="text-right">Monday</h3>
              </div>{" "}
              <span>9:00 - 6:00</span>
            </li>
            <li className="flex justify-between items-center gap-3">
              <div className="me-auto">
                <h3 className="text-right">Tuesday</h3>
              </div>{" "}
              <span>9:00 - 6:00</span>
            </li>
            <li className="flex justify-between items-center gap-3">
              <div className="me-auto">
                <h3 className="text-right">Wednesday</h3>
              </div>{" "}
              <span>9:00 - 6:00</span>
            </li>
            <li className="flex justify-between items-center gap-3">
              <div className="me-auto">
                <h3 className="text-right">Thursday</h3>
              </div>{" "}
              <span>9:00 - 6:00</span>
            </li>
            <li className="flex justify-between items-center gap-3">
              <div className="me-auto">
                <h3 className="text-right">Friday</h3>
              </div>{" "}
              <span>Closed</span>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <div>
            <h2 className="text-xl text-white font-semibold mb-5">
              Subscribe Us
            </h2>

            <div className="form-control max-w-full w-80">
              <div className="relative">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered w-full pr-16"
                />
                <button className="btn primary-btn absolute top-0 right-0 rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
            <ul className="flex items-center gap-5 mt-8">
              <li>
                <Link
                  to="https://www.facebook.com/souravbsk"
                  target="_blank"
                  className="text-2xl hover:text-orange-500 duration-300 text-white"
                >
                  <FaFacebook></FaFacebook>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.instagram.com/souravbsk01/"
                  target="_blank"
                  className="text-2xl hover:text-orange-500 duration-300 text-white"
                >
                  <FaInstagram></FaInstagram>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.linkedin.com/in/souravbsk/"
                  target="_blank"
                  className="text-2xl hover:text-orange-500 duration-300 text-white"
                >
                  <FaLinkedin></FaLinkedin>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-2xl hover:text-orange-500 duration-300 text-white"
                >
                  <FaTwitter></FaTwitter>
                </Link>
              </li>
              <li>
                <Link
                  to="https://souravbasak.com"
                  target="_blank"
                  className="text-2xl hover:text-orange-500 duration-300 text-white"
                >
                  <FaGlobe></FaGlobe>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex container  text-center sm:items-center pb-5 sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link to="https://flowbite.com/" className="hover:underline">
            Testy Food
          </Link>{" "}
          . All Rights Reserved.
        </span>
        <p className="text-white">
          <small>
            Created By <Link to="https://github.com/souravbsk">Sourav bsk</Link>
          </small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

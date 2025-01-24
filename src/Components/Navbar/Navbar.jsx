import React from "react";
import Logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div>
        <nav className="bg-slate-400 fixed inset-x-0 top-0 border-gray-200">
          <div className="flex flex-wrap justify-center lg:justify-between items-center mx-auto max-w-screen-2xl p-4">
            <div className="flex items-center gap-5 ">
              <NavLink
                to=""
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={Logo} className="h-8" alt="FreshCart-Logo" />
              </NavLink>
              <ul className="flex gap-3 text-slate-600">
                <li>
                  {" "}
                  <NavLink to="">Home</NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to="cart">Cart</NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to="products">Proucts</NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to="categories">Categories</NavLink>{" "}
                </li>
                <li className="me-3">
                  {" "}
                  <NavLink to="brands">Brands</NavLink>{" "}
                </li>
              </ul>
            </div>

            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <ul className="flex gap-3">
                <li><i className="fab fa-facebook"></i></li>
                <li><i className="fab fa-twitter"></i></li>
                <li><i className="fab fa-linkedin"></i></li>
                <li><i className="fab fa-tiktok"></i></li>
                <li><i className="fab fa-youtube"></i></li>
              </ul>
              <ul className="flex gap-3">
                <li>
                <Link to="login">Login</Link>
                </li>
                <li>
                <Link to="register">Register</Link>
                </li>
                <li>
                <Link to="">Signout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

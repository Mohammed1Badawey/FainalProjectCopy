import React, { useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import NavbarCss from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import HumburgerBotton from "../../assets/NavBar/burger-menu.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [MenuOpenClass, setMenuOpenClass] = useState(
    "p-0.5 border bg-slate-500 rounded text-gray-600 border-gray-400 hover:text-gray-800 border-gray-600",
  );
  const [MenuCloseClass, setMenuCloseClass] = useState(
    "p-0.5 border rounded text-gray-600 border-gray-400 hover:text-gray-800 hover:border-gray-600",
  );

  return (
    <>
      <div>
        <nav className="mainNavbar fixed inset-x-0 top-0 z-[9999] min-h-18 border-gray-200 bg-slate-400">
          <div className="container mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between p-4">
            {/* Logo */}
            <div className="flex items-center gap-5">
              <NavLink
                to=""
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={Logo} className="h-8" alt="FreshCart-Logo" />
              </NavLink>

              {/* pages for lg Screen and higher */}

              <ul className="hidden gap-3 text-slate-800 lg:flex">
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
                  <NavLink to="products">Products</NavLink>{" "}
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

            {/* SocialMedia and Login for large Screens */}
            <div className="hidden items-center space-x-6 lg:flex rtl:space-x-reverse">
              <ul className="flex gap-3">
                <li>
                  <i className="fab fa-facebook"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-linkedin"></i>
                </li>
                <li>
                  <i className="fab fa-tiktok"></i>
                </li>
                <li>
                  <i className="fab fa-youtube"></i>
                </li>
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

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={isMenuOpen ? MenuOpenClass : MenuCloseClass}
              >
                <figure>
                  <img src={HumburgerBotton} alt="MenuHumburgerBotton" />
                </figure>
              </button>
            </div>
          </div>

          <div>
            {isMenuOpen && (
              <div className="mobileNavbar bg-slate-400 lg:hidden">
                <ul className="flex flex-col items-center space-y-3">
                  <li className="">
                    <NavLink to="" onClick={() => setIsMenuOpen(false)}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="cart" onClick={() => setIsMenuOpen(false)}>
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="products" onClick={() => setIsMenuOpen(false)}>
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="brands" onClick={() => setIsMenuOpen(false)}>
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <Link to="login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="register" onClick={() => setIsMenuOpen(false)}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={() => setIsMenuOpen(false)}>
                      Signout
                    </Link>
                  </li>
                </ul>

                <div className="socialMobileNavbar mx-auto mt-2 min-h-18 bg-slate-500">
                  <ul className="flex min-h-18 items-center justify-center gap-3">
                    <li>
                      <i className="fab fa-facebook"></i>
                    </li>
                    <li>
                      <i className="fab fa-twitter"></i>
                    </li>
                    <li>
                      <i className="fab fa-linkedin"></i>
                    </li>
                    <li>
                      <i className="fab fa-tiktok"></i>
                    </li>
                    <li>
                      <i className="fab fa-youtube"></i>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

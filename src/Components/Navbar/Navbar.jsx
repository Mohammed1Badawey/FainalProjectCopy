import React, { useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import NavbarCss from "./Navbar.module.css"
import { Link, NavLink } from "react-router-dom";
import HumburgerBotton from "../../assets/NavBar/burger-menu.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div>
        <nav className="bg-slate-400 z-[9999] fixed inset-x-0 top-0 border-gray-200 min-h-18 mainNavbar">

          <div className="flex flex-wrap justify-between items-center max-w-screen-2xl p-4 mx-auto container">
            
            {/* Logo */}
            <div className="flex items-center gap-5">
              <NavLink
                to=""
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={Logo} className="h-8" alt="FreshCart-Logo" />
              </NavLink>

              {/* pages for lg Screen and higher */}

              <ul className="gap-3 text-slate-800 hidden lg:flex">
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
            <div className=" items-center space-x-6 rtl:space-x-reverse hidden lg:flex">

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
              className="p-0.5 border rounded text-gray-600 border-gray-400 hover:text-gray-800 hover:border-gray-600">
              <figure>
                <img src={HumburgerBotton} alt="MenuHumburgerBotton" />
              </figure>
            </button>
            </div>

          </div>

          <div>
            {isMenuOpen && (
                <div className="lg:hidden bg-slate-400 mobileNavbar">




                <ul className="flex flex-col  items-center space-y-3 ">
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
                  <NavLink to="categories" onClick={() => setIsMenuOpen(false)}>
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

              <div className="socialMobileNavbar mx-auto py-3 bg-slate-500 mt-2">               
              
              <ul className="flex justify-center gap-3">
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

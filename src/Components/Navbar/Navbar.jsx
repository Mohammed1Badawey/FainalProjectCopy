import React, { useContext, useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import NavbarCss from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HumburgerBotton from "../../assets/NavBar/burger-menu.svg";
import classNames from "classnames";
import { authContext } from "./../../Context/AuthContext";
import { MdLogout, MdOutlineLogin } from "react-icons/md";
import { HiMiniUserPlus } from "react-icons/hi2";
import { VscSignIn } from "react-icons/vsc";
import { CartContext } from "../../Context/CartContext";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { WishListContext } from "../../Context/WishListContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userToken, setuserToken } = useContext(authContext);
  const { numCart } = useContext(CartContext);
  const { numWishList } = useContext(WishListContext);
  const navigate = useNavigate();

  const menuClass = classNames(
    "p-0.5",
    "border",
    "rounded",
    "text-gray-600",
    "border-gray-500",
    "hover:text-gray-800",
    "hover:bg-slate-400/80",
    { "bg-slate-400": isMenuOpen },
  );

  const navLinks = [
    { name: "Home", path: "" },
    { name: "Products", path: "products" },
    { name: "Categories", path: "categories" },
    { name: "Brands", path: "brands" },
    { name: "Cart", path: "cart" },
  ];

  const authLinks = [
    { name: "Login", path: "login" },
    { name: "Register", path: "register" },
  ];

  const iconClass = "text-xl text-gray-900 hover:text-gray-950";

  const socialIcons = {
    facebook: <FaFacebook className={iconClass} />,
    twitter: <FaTwitter className={iconClass} />,
    linkedin: <FaLinkedin className={iconClass} />,
    tiktok: <FaTiktok className={iconClass} />,
    youtube: <FaYoutube className={iconClass} />,
  };

  const socialLinks = ["facebook", "twitter", "linkedin", "tiktok", "youtube"];

  function hundelLogout() {
    localStorage.removeItem("userToken");
    setuserToken(null);
    navigate("/login");
    setIsMenuOpen(false);
  }

  return (
    <>
      <div>
        <nav className="mainNavbar fixed inset-x-0 top-0 z-[9999] min-h-18 border-gray-100 bg-slate-300 font-[EncodeSans]">
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

              {userToken && (
                <ul className="hidden gap-3 text-slate-800 lg:flex">
                  <li>
                    <NavLink to="/"> Home </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products"> Products </NavLink>
                  </li>
                  <li>
                    <NavLink to="/categories"> Categories </NavLink>
                  </li>
                  <li>
                    <NavLink to="/brands"> Brands </NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart" className="relative">
                      Cart
                      {numCart > 0 && (
                        <div className="absolute -top-4 -right-4 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                          {numCart}
                        </div>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist" className="relative">
                      Wishlist
                      {numWishList > 0 && (
                        <div className="absolute -top-4 -right-4 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                          {numWishList}
                        </div>
                      )}
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>

            {/* SocialMedia and Login for large Screens */}
            <div className="hidden items-center space-x-6 lg:flex rtl:space-x-reverse">
              <ul className="flex gap-3">
                {socialLinks.map((platform) => (
                  <li key={platform}>{socialIcons[platform]}</li>
                ))}
              </ul>

              <ul className="hidden gap-1 lg:flex">
                {userToken ? (
                  <li>
                    <span
                      className="cursor-pointer"
                      onClick={hundelLogout}
                      to=""
                    >
                      Logout
                    </span>
                  </li>
                ) : (
                  <>
                    <li className="underline underline-offset-2">
                      <Link to="/login"> Login </Link>
                    </li>
                    <span className="font-semibold">/</span>
                    <li className="underline underline-offset-2">
                      <Link to="/register"> Register </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={menuClass}
              >
                <figure>
                  <img src={HumburgerBotton} alt="MenuHumburgerBotton" />
                </figure>
              </button>
            </div>
          </div>

          <div>
            {isMenuOpen && (
              <div className="mobileNavbar bg-slate-300 lg:hidden">
                <ul className="flex flex-col items-start space-y-5 px-4">
                  {userToken &&
                    navLinks.map((link) => (
                      <li key={link.name}>
                        <NavLink
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </NavLink>
                      </li>
                    ))}
                  <div className="w-full border-t py-2">
                    {userToken && (
                      <div
                        className="group flex w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full border-1 border-red-400 px-2 py-1.5 transition-all duration-300 hover:bg-red-400"
                        onClick={hundelLogout}
                        to=""
                      >
                        <span
                          className="font-normal"
                          onClick={hundelLogout}
                          to=""
                        >
                          Logout
                        </span>
                        <VscSignIn className="" />
                      </div>
                    )}
                  </div>
                </ul>

                <ul className="flex flex-col justify-center gap-3 px-4 font-semibold">
                  {!userToken && (
                    <>
                      <li
                        onClick={() => setIsMenuOpen(false)}
                        className="flex w-[120px] cursor-pointer items-center justify-center gap-1 rounded-full border border-emerald-600 p-2 hover:bg-emerald-600"
                      >
                        <Link to="/login">Login</Link>
                        <MdOutlineLogin />
                      </li>
                      <li
                        onClick={() => setIsMenuOpen(false)}
                        className="mb-2 flex w-[120px] cursor-pointer items-center justify-center gap-1 rounded-full border border-emerald-600 p-2 transition-all duration-300 hover:bg-emerald-600"
                      >
                        <Link to="/register">Register</Link>
                        <HiMiniUserPlus />
                      </li>
                    </>
                  )}
                </ul>

                <div className="socialMobileNavbar mx-auto min-h-18 bg-slate-400">
                  <ul className="flex min-h-18 items-center justify-center gap-3">
                    {socialLinks.map((platform) => (
                      <li key={platform} onClick={() => setIsMenuOpen(false)}>
                        {socialIcons[platform]}
                      </li>
                    ))}
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

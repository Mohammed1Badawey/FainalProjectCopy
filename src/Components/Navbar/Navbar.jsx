import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HumburgerBotton from "../../assets/NavBar/burger-menu.svg";
import classNames from "classnames";
import { authContext } from "./../../Context/AuthContext";
import { MdOutlineLogin } from "react-icons/md";
import { HiMiniUserPlus } from "react-icons/hi2";
import { VscSignIn } from "react-icons/vsc";
import useGetUserWishList from "../../Hooks/WishListHooks/useGetUserWishList";
import useGetUserCart from "../../Hooks/CartHooks/useGetUserCart";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartNumber,setCartNumber ] = useState(0);
  const [wishlistNumber,setWishlistNumber ] = useState(0);
  const { data: cartData } = useGetUserCart();
  const { data: wishlistData } = useGetUserWishList();
  const { userToken, setUserToken } = useContext(authContext);
  const [accountBtn, setAccountBtn] = useState(false);
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
  const accountClass = classNames(
    "inline-flex",
    "items-center",
    "rounded-lg",
    "px-5",
    "py-2.5",
    "text-center",
    "text-sm",
    "font-medium",
    "text-black",
    "cursor-pointer",
  );
  function handelLogout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
    setIsMenuOpen(false);
  }
  useEffect(() => {
    setWishlistNumber(wishlistData?.count || 0);
    setCartNumber(cartData?.numOfCartItems || 0);
  }, [cartData,wishlistData]);

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
                      {cartNumber > 0 && (
                        <div className="absolute -top-4 -right-4 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                          {cartData?.numOfCartItems}
                        </div>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist" className="relative">
                      Wishlist
                      {wishlistNumber > 0 && (
                        <div className="absolute -top-4 -right-4 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                          {wishlistNumber}
                        </div>
                      )}
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>

            <div className="hidden items-center space-x-6 lg:flex rtl:space-x-reverse">
              {userToken ? (
                <div className="relative flex flex-col items-center justify-center pe-10">
                  <button
                    onClick={() => setAccountBtn(!accountBtn)}
                    className={accountClass}
                    type="button"
                  >
                    My Account
                    <i className="fa-solid fa-angle-down ps-2"></i>
                  </button>
                  {accountBtn && (
                    <div
                      id="dropdownInformation"
                      className="absolute top-12 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm"
                    >
                      <div className="px-4 py-3 text-center text-sm text-gray-900">
                        <span>Account</span>
                      </div>
                      <ul
                        onClick={() => setAccountBtn(!accountBtn)}
                        className="p-4 text-start"
                      >
                        <li className="p-1">
                          <NavLink to="/myprofile">MyProfile</NavLink>
                        </li>
                        <li className="p-1">
                          <span
                            className="cursor-pointer"
                            onClick={handelLogout}
                            to=""
                          >
                            Logout
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <ul className="flex gap-1">
                  <li className="underline underline-offset-2">
                    <Link to="/login"> Login </Link>
                  </li>
                  <span className="font-semibold">/</span>
                  <li className="underline underline-offset-2">
                    <Link to="/register"> Register </Link>
                  </li>
                </ul>
              )}
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
                <ul
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-start space-y-5 px-4"
                >
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
                      {cartNumber > 0 && (
                        <div className="absolute -top-1 -right-6 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                          {cartNumber}
                        </div>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist" className="relative">
                      Wishlist
                      {wishlistNumber > 0 && (
                        <div className="absolute -top-1 -right-6 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                          {wishlistNumber}
                        </div>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/myprofile">My Profile</NavLink>
                  </li>
                  <div className="w-full border-t py-4">
                    {userToken && (
                      <div>
                        <li>
                          <div
                            className="group flex w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full border-1 border-red-400 px-2 py-1.5 transition-all duration-300 hover:bg-red-400"
                            onClick={handelLogout}
                            to=""
                          >
                            <span
                              className="font-normal"
                              onClick={handelLogout}
                              to=""
                            >
                              Logout
                            </span>
                            <VscSignIn className="" />
                          </div>
                        </li>
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
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

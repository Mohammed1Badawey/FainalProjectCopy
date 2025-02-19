import React, { useContext } from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import { authContext } from "../../Context/AuthContext";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
                      <ScrollToTop />
      <Navbar />
      <main className="container mx-auto flex-grow px-8 py-26 md:py-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
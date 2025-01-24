import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto my-10 py-15 lg:py-10 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
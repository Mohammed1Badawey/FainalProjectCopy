import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col"> 
      <Navbar />
      <main className="container h-[2000px] mx-auto py-26 md:py-24 flex-grow"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// export default function Layout() {
//   return (
//     <>
//       <Navbar />
//       <main className="container h-[2000px] mx-auto py-26 md:py-24 ">
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   );
// }

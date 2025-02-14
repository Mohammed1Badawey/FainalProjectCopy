import React from "react";
import { Link } from "react-router-dom";

export default function MyProfile() {

  return (
    <div className="p-6">
      <h2 className="mb-6 text-center text-3xl font-bold text-emerald-700">
        My Profile 🖤
      </h2>

      <div className="mx-auto grid cursor-pointer grid-cols-1 justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
        <Link
          to={"/allorders"}
          className="rounded-lg border border-gray-200 p-8 text-center shadow-md transition-transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">
            Your Orders
          </h3>
        </Link>

        <Link
          to={"/accountdetails"}
          className="rounded-lg border border-gray-200 p-8 text-center shadow-md transition-transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">
            Login & Security
          </h3>
        </Link>

        <Link
          to={"/adresses"}
          className="rounded-lg border border-gray-200 p-8 text-center shadow-md transition-transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">
            Your Adresses
          </h3>
        </Link>
      </div>
    </div>
  );
}

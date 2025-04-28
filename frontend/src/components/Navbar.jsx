import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M27 0C12.06 0 0 12.06 0 27c0 14.95 12.06 27 27 27 14.95 0 27-12.06 27-27 0-14.95-12.06-27-27-27zm0 45.32c-11.13 0-20.32-9.19-20.32-20.32 0-11.13 9.19-20.32 20.32-20.32 11.13 0 20.32 9.19 20.32 20.32 0 11.13-9.19 20.32-20.32 20.32z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          Rasteplassen
        </span>
      </div>
      <div className="flex items-center w-auto">
        <Link
          to="/"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4"
        >
          Home
        </Link>
        <Link
          to="/register"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4"
        >
          Login
        </Link>
        <Link
          to="/admin"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4"
        >
          Admin
        </Link>
        <Link
          to="/store"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300"
        >
          Store
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

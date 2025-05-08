import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-navbar-gray">
      <div className="container mx-auto flex justify-between">
        <nav className="flex">
          <NavLink
            to="/"
            className="inflex-flex items-center py-6 px-3 mr-4 text-white text-4xl tracking-widest hover:drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]"
          >
            Rasteplass.eu
          </NavLink>

          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive
                ? "inflex-flex items-center py-3 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                : "inflex-flex items-center py-3 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
            }
          >
            Hjem
          </NavLink>

          <NavLink
            to="/login"
            className={(navData) =>
              navData.isActive
                ? "inflex-flex items-center py-3 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                : "inflex-flex items-center py-3 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
            }
          >
            Logg inn
          </NavLink>

          <NavLink
            to="/admin"
            className={(navData) =>
              navData.isActive
                ? "inflex-flex items-center py-3 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                : "inflex-flex items-center py-3 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
            }
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

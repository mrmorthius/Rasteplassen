import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ isAuthenticated }) {
  return (
    <header className="bg-navbar-gray">
      <div className="container mx-auto flex justify-between">
        <nav className="flex">
          <div>
            <NavLink
              to="/"
              className="inline-flex-flex items-center py-6 px-3 mr-4 text-white text-3xl tracking-widest hover:drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]"
            >
              Rasteplass.eu
            </NavLink>

            <NavLink
              to="/"
              className={(navData) =>
                navData.isActive
                  ? "inline-flex-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                  : "inline-flex-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
              }
            >
              Hjem
            </NavLink>
            <NavLink
              to="/rasteplass"
              className={(navData) =>
                navData.isActive
                  ? "inline-flex-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                  : "inline-flex-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
              }
            >
              Rasteplasser
            </NavLink>

            <NavLink
              to="/about"
              className={(navData) =>
                navData.isActive
                  ? "inline-flex-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                  : "inline-flex-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
              }
            >
              Om oss
            </NavLink>

            <NavLink
              to="/new"
              className={(navData) =>
                navData.isActive
                  ? "inline-flex-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                  : "inline-flex-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
              }
            >
              Forslag
            </NavLink>

            {!isAuthenticated && (
              <NavLink
                to="/login"
                className={(navData) =>
                  navData.isActive
                    ? "inline-flex-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                    : "inline-flex-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
                }
              >
                Logg inn
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink
                to="/admin"
                className={(navData) =>
                  navData.isActive
                    ? "inline-flex-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                    : "inline-flex-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
                }
              >
                Admin
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

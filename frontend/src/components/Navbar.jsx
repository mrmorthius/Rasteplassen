import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ isAuthenticated, logout }) {
  return (
    <header className="bg-navbar-gray">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="inline-flex items-center py-6 px-3 mr-4 text-white text-3xl tracking-widest hover:drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]"
            >
              Rasteplass.eu
            </NavLink>
            <div className="flex">
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive
                    ? "inline-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                    : "inline-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
                }
              >
                Hjem
              </NavLink>
              <NavLink
                to="/rasteplass"
                className={(navData) =>
                  navData.isActive
                    ? "inline-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                    : "inline-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
                }
              >
                Rasteplasser
              </NavLink>

              <NavLink
                to="/new"
                className={(navData) =>
                  navData.isActive
                    ? "inline-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                    : "inline-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
                }
              >
                Forslag
              </NavLink>

              <NavLink
                to="/about"
                className={(navData) =>
                  navData.isActive
                    ? "inline-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                    : "inline-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
                }
              >
                Om oss
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  to="/admin"
                  className={(navData) =>
                    navData.isActive
                      ? "inline-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                      : "inline-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
                  }
                >
                  Admin
                </NavLink>
              )}
            </div>
          </div>
          <div>
            {isAuthenticated && (
              <button
                className="inline-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1] cursor-pointer"
                onClick={() => logout()}
              >
                Logg ut
              </button>
            )}
            {!isAuthenticated && (
              <NavLink
                to="/login"
                className={(navData) =>
                  navData.isActive
                    ? "inline-flex items-center py-2 px-3 my-6 rounded text-black bg-[#ffbb6c] hover:text-black/30"
                    : "inline-flex items-center py-2 px-3 my-6 rounded text-white hover:text-[#c0b8a1]"
                }
              >
                Logg inn
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

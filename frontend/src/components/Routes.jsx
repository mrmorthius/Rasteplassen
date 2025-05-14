import React, { Component } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Rasteplass from "../pages/Rasteplass";
import RasteplassIndex from "../pages/RasteplassIndex";
import About from "../pages/About";
import New from "../pages/New";
import ForslagRasteplass from "../pages/ForslagRasteplass";

export default function RouterContainer({
  isAuthenticated,
  token,
  logout,
  login,
  mapRef,
  consent,
}) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />
      <main className="flex-grow">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<Home mapRef={mapRef} consent={consent} />}
          />
          <Route
            path="/login"
            exact
            element={<Login login={login} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/admin"
            exact
            element={
              isAuthenticated ? (
                <Admin token={token} logout={logout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/rasteplass/:slug"
            exact
            element={
              isAuthenticated ? (
                <ForslagRasteplass token={token} logout={logout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/about" exact element={<About />} />
          <Route path="/new" exact element={<New />} />
          <Route
            path="/rasteplass"
            exact
            element={<RasteplassIndex isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/rasteplass/:slug"
            exact
            element={<Rasteplass isAuthenticated={isAuthenticated} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

//pages
import Home from "../pages/home/Home";
import Favorites from "../pages/favorites/Favorites";
import Profile from "../pages/pokemon/Profile";

export default function Pages() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/pokemon/:name" element={<Profile />} />
    </Routes>
  );
}

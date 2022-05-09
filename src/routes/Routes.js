import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { FavoriteProvider } from "../contexts/favoritesContext";

//pages
import Home from "../pages/home/Home";
import Favorites from "../pages/favorites/Favorites";
import Profile from "../pages/pokemon/Profile";

export default function Pages() {
  const location = useLocation();
  const [favorites, setFavorites] = useState([]);
  const favoritesKey = "favoritePokemons";

  const updateFavoritePokemons = (name, url) => {
    const updatedFavorites = [...favorites];
    const favIndex = favorites.findIndex((element) => element.name === name);

    if (favIndex >= 0) {
      updatedFavorites.splice(favIndex, 1);
    } else {
      updatedFavorites.push({ name, url });
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const loadFavoritePokemon = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemon();
  }, []);

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/pokemon/:name" element={<Profile />} />
      </Routes>
    </FavoriteProvider>
  );
}

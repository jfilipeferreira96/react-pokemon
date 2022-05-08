import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoritesContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { favoritePokemons } = useContext(FavoriteContext);

  return (
    <nav className="navbar">
      <Link to={"/"}>
        <h1>Pokédex</h1>
      </Link>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to={"/favorites"} className="button is-primary poke-btn">
              <strong>{favoritePokemons.length} Favorites</strong>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

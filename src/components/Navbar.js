import React, {useContext} from "react";
import FavoriteContext from "../contexts/favoritesContext";

export default function Navbar() {
  const {favoritePokemons} = useContext(FavoriteContext)

  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <h1>Pokédex</h1>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a href="/" className="button is-primary">
                <strong>{ favoritePokemons.length } Favorites</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

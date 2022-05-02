import React, {useContext} from "react";
import FavoriteContext from "../contexts/favoritesContext";

export default function Navbar() {
  const {favoritePokemons} = useContext(FavoriteContext)

  return (
    <nav className="navbar">
      <h1>Pokédex</h1>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-primary poke-btn">
                <strong>{ favoritePokemons.length } Favorites</strong>
              </button>
            </div>
          </div>
        </div>
    </nav>
  );
}

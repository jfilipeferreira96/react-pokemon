import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Routes from "./routes/Routes";
import { FavoriteProvider } from "./contexts/favoritesContext";

// page components
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";

//styles
import "./App.css";
import "bulma/css/bulma.min.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favIndex = favorites.indexOf(name);

    if (favIndex >= 0) {
      updatedFavorites.splice(favIndex, 1);
    } else {
      updatedFavorites.push(name);
    }
    setFavorites(updatedFavorites);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Searchbar />
          <Routes />
        </BrowserRouter>
      </div>
    </FavoriteProvider>
  );
}

export default App;

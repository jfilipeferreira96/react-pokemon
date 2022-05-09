import { useEffect, useState } from "react";
import { getPokemonData, searchPokemon } from "../../api";
import Navbar from "../../components/Navbar";

//components
import Pokedex from "../../components/Pokedex";

function Favorites() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const itemsPerPage = 24;

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const promises = favorites.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);

      setPokemonList(results);
      setTotalPages(Math.ceil(favorites.length / itemsPerPage));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFavoritePokemon = () => {
    const pokemons = JSON.parse(window.localStorage.getItem("favoritePokemons")) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemon();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [favorites, page]);

  return (
    <>
      <Navbar />
      {favorites.length > 0 && (
        <div className="section">
          <Pokedex
            pokemons={pokemonList}
            loading={loading}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            notFound={notFound}
          />
        </div>
      )}
      {favorites.length === 0 && (
        <div className="not-found">
          <img src="https://i.kym-cdn.com/photos/images/newsfeed/002/012/821/a64.png" alt="Error Not Found"></img>
          <h1>Your favorites page is empty.</h1>
        </div>
      )}
    </>
  );
}

export default Favorites;

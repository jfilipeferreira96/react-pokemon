import { useEffect, useState } from "react";
import { getPokemonsList, getPokemonData, searchPokemon } from "../../api";
import Navbar from "../../components/Navbar";
import Searchbar from "../../components/Searchbar";

//components
import Pokedex from "../../components/Pokedex";

function App() {
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
      const data = await getPokemonsList(itemsPerPage, itemsPerPage * page);
      //console.log(data);

      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      //console.log(results);

      setPokemonList(results);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      setNotFound(false);
      return fetchPokemons();
    }

    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
    } else {
      setPokemonList([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Searchbar onSearch={onSearchHandler} />
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
    </>
  );
}

export default App;

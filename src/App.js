import { useEffect, useState } from "react";
import { getPokemonsList, getPokemonData, searchPokemon } from "./api";
import {FavoriteProvider} from "./contexts/favoritesContext"

//components
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";

//styles
import "./App.css";
import 'bulma/css/bulma.min.css';


function App() {
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  const [favorites, setFavorites] = useState([])

  const itemsPerPage = 24;

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemonsList(itemsPerPage, itemsPerPage * page)
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises)

      setPokemonList(results)
      setTotalPages(Math.ceil(data.count / itemsPerPage))
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { fetchPokemons() }, [page]);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites]
    const favIndex = favorites.indexOf(name)
    
    if (favIndex >= 0) {
      updatedFavorites.splice(favIndex, 1)
    } else {
      updatedFavorites.push(name)
    }
    setFavorites(updatedFavorites)
  }

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      setNotFound(false)
      return fetchPokemons();
    }

    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result) {
      setNotFound(true)
    } else {
      setPokemonList([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)

  }
  
  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons
      }}
    >
      <div className="section">
        <Navbar />
        <Searchbar onSearch={onSearchHandler} />
        <Pokedex pokemons={pokemonList} loading={loading} page={page} totalPages={totalPages} setPage={setPage} notFound={notFound} />
      </div>
    </FavoriteProvider>
  );
}

export default App;

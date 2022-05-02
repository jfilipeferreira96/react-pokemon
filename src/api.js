//API CALLS

export const searchPokemon = async (pokemon) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
        const response = await fetch(url)
        return await response.json()

    } catch (error) {
        console.log(error);
    }
}

export const getPokemonsList = async (limit = 50, offset = 0) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        const response = await fetch(url)
        return await response.json()

    } catch (error) {
        console.log(error);
    }
}

export const getPokemonData = async (pokeUrl) => {
    try {
        const url = pokeUrl
        const response = await fetch(url)
        return await response.json()

    } catch (error) {
        console.log(error);
    }
}
import React, {useContext} from 'react'
import FavoriteContext from '../contexts/favoritesContext';

export default function Pokemon({ pokemon }) {
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)

    const onHeartClick = () => {
        updateFavoritePokemons(pokemon.name)
    }

    const heart = favoritePokemons.includes(pokemon.name) ? "💗" : "🖤";

    const addZerosToNumber = (number, length) => {
        let num = '' + number;
        while (num.length < length) {
            num = '0' + num;
        }
        return num;
    }

    return (
        /* column is-one-third */
        <div className='column is-12-mobile is-12-tablet is-6-desktop is-4-fullhd '>
            <div className={`pokemon-card bg-${pokemon.types[0].type.name}`}>
                <div className="pokemon-inner-card">
                    <span className='pokemon-number'>#{addZerosToNumber(pokemon.id,3)}</span>
                    <span className="pokemon-name">{pokemon.name}</span>
                
                    <div className="types">
                        {pokemon.types.map((type) => (
                            <div className={`type ${type.type.name}`} key={type.type.name} >
                                <img src={`./img/${type.type.name}.svg`} alt="type" />
                                <span className="pokemon-type-text">
                                    {type.type.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    {/* SVG OF THE POKEBALL */}
                    <svg width="75" height="75" viewBox="0 0 75 75" fill="none"><path d="M37.5 0C56.798 0 72.7167 14.361 75 32.9032H56.6974C54.6135 24.298 46.8091 17.9032 37.5 17.9032C28.1909 17.9032 20.3865 24.298 18.3026 32.9032H0C2.28333 14.361 18.202 0 37.5 0Z" fill="rgb(255 255 255 / 20%)"></path><path d="M56.6974 42.0968H75C72.7167 60.639 56.798 75 37.5 75C18.202 75 2.28333 60.639 0 42.0968H18.3026C20.3865 50.702 28.1909 57.0968 37.5 57.0968C46.8091 57.0968 54.6135 50.702 56.6974 42.0968Z" fill="rgb(255 255 255 / 20%)"></path><path d="M37.5 49.8387C44.3655 49.8387 49.9312 44.3145 49.9312 37.5C49.9312 30.6855 44.3655 25.1613 37.5 25.1613C30.6345 25.1613 25.0688 30.6855 25.0688 37.5C25.0688 44.3145 30.6345 49.8387 37.5 49.8387Z" fill="rgb(255 255 255 / 20%)"></path></svg>
                    <img src={pokemon.sprites.other["official-artwork"].front_default} alt={`Pokemon ${pokemon.name}`} className='pokemon-image' />
                    
                </div>
            </div>
        </div>
    )
}

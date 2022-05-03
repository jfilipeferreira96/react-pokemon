import React from 'react'
import Pagination from './Pagination';
import Pokemon from './Pokemon';

export default function Pokedex({ pokemons, loading, page, totalPages, setPage, notFound }) {
    
    const onLeftClickHandler = () => {
        if (page > 0) {
            setPage(page-1)
        }
    }

    const onRightClickHandler = () => {
        if (page+1 !== totalPages) {
            setPage(page+1)
        }
    }

    return (
        <div>
            {notFound && (
                <div className="not-found">
                    <img src="https://i.kym-cdn.com/photos/images/newsfeed/002/012/821/a64.png" alt="Error Not Found" />
                    <h1>Such Pokémon does not exist.</h1>
                </div>
            )}
            {!notFound && loading ? (<div>Loading...</div>) : ''}

            {!notFound && pokemons && (
                <div>
                    <div className='columns is-multiline'>
                        {pokemons.map((pokemon, index) => {
                            return (
                                <Pokemon key={index} pokemon={pokemon} />
                            )
                        })}
                    </div>    
                </div>
            )}
            {!notFound &&
                <div className='pagination-container'>
                    <Pagination
                        page={page + 1}
                        totalPages={totalPages}
                        onLeftClick={onLeftClickHandler}
                        onRightClick={onRightClickHandler}
                    />
                </div>
            }
        </div>
    )
}

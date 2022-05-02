import React from 'react'
import Pagination from './Pagination';
import Pokemon from './Pokemon';

export default function Pokedex({ pokemons, loading, page, totalPages, setPage }) {
    
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
            <div className='pokedex-header'>
                <Pagination
                    page={page + 1}
                    totalPages={totalPages}
                    onLeftClick={onLeftClickHandler}
                    onRightClick={onRightClickHandler}
                />
            </div>
            {loading ? (<div>Loading...</div>) : ''}

            {pokemons && (
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
        </div>
  )
}

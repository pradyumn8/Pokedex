import React from 'react';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/usePokemonList';

function PokemonList() {
    const [pokemonListState,setPokemonListState] = usePokemonList('https://pokeapi.co/api/v2/pokemon',false)
    return (
        <div className='pokemon-list-wrapper'>
            <div className='pokemon-wrapper'>
                {pokemonListState.isLoading ? (
                    'Loading...'
                ) : (
                    pokemonListState.pokemonList.map((p) => (
                        <Pokemon id={p.id} name={p.name} image={p.image} key={p.id} />
                    ))
                )}
            </div>
            <div className="controls">
                <button disabled={!pokemonListState.prevUrl} onClick={() => setPokemonListState((prevState) => ({
                    ...prevState,
                    pokedexUrl: pokemonListState.prevUrl
                }))}>
                    Prev
                </button>
                <button disabled={!pokemonListState.nextUrl} onClick={() => setPokemonListState((prevState) => ({
                    ...prevState,
                    pokedexUrl: pokemonListState.nextUrl
                }))}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;
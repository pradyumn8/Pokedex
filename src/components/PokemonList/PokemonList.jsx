import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl, setNextUrl] = useState([]);
    const [prevUrl, setPrevUrl] = useState(null);

    async function downloadPokemons() {
        setIsLoading(true);
        try {
            const response = await axios.get(pokedexUrl); // Fetch 20 Pokemon
            const pokemonResults = response.data.results;

            // Fetched data for next and previous URLs
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);

            // Create an array of promises to fetch each Pokémon's details
            const pokemonResultPromises = pokemonResults.map((pokemon) => axios.get(pokemon.url));
            const pokemonData = await axios.all(pokemonResultPromises); // Array of 20 Pokémon detailed data

            // Extract id, name, image, and types from each Pokémon's data
            const pokemonListResult = pokemonData.map((pokemonData) => {
                const pokemon = pokemonData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_shiny,
                    types: pokemon.types.map((typeInfo) => typeInfo.type.name) // Extract types
                };
            });

            setPokemonList(pokemonListResult);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl]);

    return (
        <div className='pokemon-list-wrapper'>
            <div className='pokemon-wrapper'>
                {isLoading ? (
                    'Loading...'
                ) : (
                    pokemonList.map((p) => (
                        <Pokemon id={p.id} name={p.name} image={p.image} key={p.id} />
                    ))
                )}
            </div>
            <div className="controls">
                <button disabled={!prevUrl} onClick={() => setPokedexUrl(prevUrl)}>
                    Prev
                </button>
                <button disabled={!nextUrl} onClick={() => setPokedexUrl(nextUrl)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;

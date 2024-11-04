import axios from 'axios';
import React, { useEffect, useState } from 'react'

function usePokemonList() {
// const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');
    
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    });

    async function downloadPokemons() {
        // setIsLoading(true);

        setPokemonListState((prevState) => ({ ...prevState, isLoading: true })); // Set loading state to true
        try {
            const response = await axios.get(pokemonListState.pokedexUrl); // Fetch 20 Pokémon
            const pokemonResults = response.data.results;

            // Fetched data for next and previous URLs
            const nextUrl = response.data.next;
            const prevUrl = response.data.previous;
            // setNextUrl(response.data.next);
            // setPrevUrl(response.data.previous);

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
                    types: pokemon.types.map((typeInfo) => typeInfo.type.name)
                };
            });

            // setPokemonList(pokemonListResult);
            setPokemonListState((prevState) => ({
                ...prevState,
                pokemonList: pokemonListResult, // Update with the fetched Pokémon data
                nextUrl,
                prevUrl,
                isLoading: false
            }));
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);
    // useEffect(() => {
    //     downloadPokemons();
    // }, [pokedexUrl]);

    return [pokemonListState,setPokemonListState]
}

export default usePokemonList
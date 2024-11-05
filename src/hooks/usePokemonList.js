import axios from 'axios';
import { useEffect, useState } from 'react';

function usePokemonList(url, type) {
    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: '',
        prevUrl: ''
    });

    async function downloadPokemons() {
        // setIsLoading(true);
        setPokemonListState((state) => ({ ...state, isLoading: true })); // Set loading state to true

        const response = await axios.get(pokemonListState.pokedexUrl); // Fetch 20 Pokémon or specific type
        const pokemonResults = response.data.results;
        console.log('response ise',pokemonResults);
        console.log(pokemonListState);

        // Update next and previous URLs in state
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }));

        if(type){
            setPokemonListState((state)=>({
                ...state,
                pokemonList: response.data.pokemon.slice(0,5)
            }))
        }
        // If no type, fetch detailed data for each Pokémon
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        console.log('pokemonResultPromises',pokemonResultPromise)
        const pokemonData = await axios.all(pokemonResultPromise); // Array of detailed Pokémon data
        console.log('pokemonData',pokemonData   )


        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_shiny,
                types: pokemon.types.map((t) => t.type.name)
            };
        });

        // Update state with fetched Pokémon data
        setPokemonListState((state) => ({
            ...state,
            pokemonList: pokeListResult,
            isLoading: false
        }));
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    // useEffect(() => {
    //     downloadPokemons();
    // }, [pokedexUrl]);

    return [pokemonListState, setPokemonListState]; // Return the state and updater function
}

export default usePokemonList;

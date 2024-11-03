import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL); // It help to fetch 20 pokemon

        const pokemonResults = response.data.results; // we get the array of pokemons from results

        console.log(pokemonResults)
        // iterating over the array of pokemons, and using thier url, to create an array of promises
        // that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url)); //

        // passing that promise array to axios.all
        console.log(pokemonResultPromise);
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
        console.log(pokemonData)

        //now iterate on the data of each pokemon, and extract id, name, image, types

        const pokemonListResult = (pokemonData.map((pokemonData) => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemonData.sprites.front_shiny,
                types: pokemonList.types
            }

        }));
        console.log(pokemonResults)
        setPokemonList(pokemonListResult)
        setIsLoading(false);
    }

    useEffect(async () => {
        downloadPokemons()
    }, []);

    return (
        <div className='pokemon-list-wrapper'>
            <div>Pokemon List</div>
            <div className='pokemon-wrapper'>
                {(isLoading) ? 'Loading....' :
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
                }
            </div>
            <div className="controls">
                <button>Prev</button>
                <button>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;

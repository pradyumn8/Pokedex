import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.css';
import usePokemonList from '../hooks/usePokemonList.js';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    
    // Fetch specific Pokémon details
    async function downloadPokemon() {
        
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            console.log(response.data);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name) // Define types array here
            });
 
    }

    // Fetch Pokémon of a specific type, e.g., "fire"
    const [pokemonListState] = usePokemonList('https://pokeapi.co/api/v2/type/fire',true);

    useEffect(() => {
        downloadPokemon();
        console.log('list',pokemonListState)
    }, []); // Include id in the dependency array to refetch if id changes
    
    return (
        <div className='pokemon-details-wrapper'>
            {pokemon.image && <img className='pokemon-details-image' src={pokemon.image} alt={pokemon.name} />}
            <div className='pokemon-details-name'>Name: <span>{pokemon.name}</span></div>
            <div className='pokemon-details-name'>Height: {pokemon.height}</div>
            <div className='pokemon-details-name'>Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
            </div>
            <div>
                More fire type Pokemon:
                <ul>
                    {pokemonListState.pokemonList && pokemonListState.pokemonList.map((p) => (
                        <li key={p.pokemon.url}>{p.pokemon.name}</li>
                    ))}
                </ul>
                
            </div>
        </div>
    );
}

export default PokemonDetails;

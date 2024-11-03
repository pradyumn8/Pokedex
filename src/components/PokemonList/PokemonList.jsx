import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function downloadPokemons(){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonResults = response.data.results;
        const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url))
        console.log(pokemonResultPromise);
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData)
        setPokemonList(pokemonData.map((pokemonData)=>{
            const pokemon = pokemonData.data;
            return { 
                id: pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemonData.sprites.front_shiny,
                types:pokemonList.types}
        }))
        setIsLoading(false);
    }

    useEffect(async() => {
        downloadPokemons()
    }, []);  

    return (
    <div className='pokemon-list-wrapper'>
        <div>Pokemon List</div>
        {(isLoading)?'Loading....':
    pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)
    }
    </div>
    );
}

export default PokemonList;

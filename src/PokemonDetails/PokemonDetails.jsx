import { useParams } from 'react-router-dom';
import './PokemonDetails.css';
import usePokemonDetails from '../hooks/usePokemon.js';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon]= usePokemonDetails(id)
  
    return (
        <div className='pokemon-details-wrapper'>
            {pokemon.image && <img className='pokemon-details-image' src={pokemon.image} alt={pokemon.name} />}
            <div className='pokemon-details-name'>Name: <span>{pokemon.name}</span></div>
            <div className='pokemon-details-name'>Height: {pokemon.height}</div>
            <div className='pokemon-details-name'>Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
            </div>
            {pokemon.types &&
                <div>
                    More {pokemon.types[0]} type Pokemons:
                    <ul>
                        {pokemonListHookResponse && pokemonListHookResponse.pokemonList && pokemonListHookResponse.pokemonList.map((p) => (
                            <li key={p.pokemon.url}>{p.pokemon.name}</li>
                        ))}
                    </ul>

                </div>
            }
        </div>
    );
}

export default PokemonDetails;

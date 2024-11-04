import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Pokedex from '../components/Pokedex/Pokedex'
import PokedexDetails from '.././PokemonDetails/PokemonDetails'
function CustomRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Pokedex/>}/>
        <Route path='/pokemon/:id' element={<PokedexDetails/>}/>
    </Routes>
  )
};

export default CustomRoutes